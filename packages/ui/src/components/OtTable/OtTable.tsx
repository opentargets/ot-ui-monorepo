import { ReactElement, ReactNode, useMemo, useState } from "react";
import { Box, Grid, IconButton, NativeSelect, Skeleton } from "@mui/material";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  flexRender,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import {
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faArrowDown,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OtTableColumnFilter from "./OtTableColumnFilter";
// import { naLabel } from "@ot/constants";
import OtTableSearch from "./OtTableSearch";
import { OtTableProps } from "./types/tableTypes";
import {
  FontAwesomeIconPadded,
  OtTableContainer,
  OtTableHeader,
  OtTH,
  OtTableHeaderText,
  OtTD,
  OtTableCellContainer,
} from "./otTableLayout";
import DataDownloader from "../DataDownloader";
import {
  getCurrentPagePosition,
  getDefaultSortObj,
  getFilterValueFromObject,
  getLoadingRows,
  isNestedColumns,
  mapTableColumnToTanstackColumns,
} from "./utils/tableUtils";
import Tooltip from "../Tooltip";
import OtTableColumnVisibility from "./OtTableColumnVisibility";

declare module "@tanstack/table-core" {
  interface FilterFns {
    searchFilterFn: FilterFn<unknown>;
  }

  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const searchFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  const allRowValuesInString = getFilterValueFromObject(row.original);
  const containsSubstr = new RegExp(value, "i").test(allRowValuesInString);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed || containsSubstr;
};

// missing keys from column data obj
/************
 *  WIDTH *
 * minWidth
 ************/

function OtTable({
  showGlobalFilter = true,
  columns = [],
  rows = [],
  verticalHeaders = false,
  order,
  sortBy,
  dataDownloader,
  dataDownloaderColumns,
  dataDownloaderFileStem,
  query,
  variables,
  showColumnVisibilityControl = true,
  loading,
}: OtTableProps): ReactElement {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const mappedColumns = mapTableColumnToTanstackColumns(columns);
  const loadingRows = getLoadingRows(10);
  const loadingCells = getLoadingCells(mappedColumns);

  const tableData = useMemo(() => (loading ? loadingRows : rows), [loading]);
  const tableColumns = useMemo(() => (loading ? loadingCells : mappedColumns), [loading]);

  function getCellData(cell: Record<string, unknown>): ReactNode {
    return <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>;
  }

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    filterFns: {
      searchFilterFn: searchFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      sorting: getDefaultSortObj(sortBy, order),
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: searchFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      {/* Global Search */}
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item sm={12} md={4}>
          {showGlobalFilter && <OtTableSearch setGlobalSearchTerm={setGlobalFilter} />}
        </Grid>

        <Grid item sm={12} md={8} sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
          {showColumnVisibilityControl && <OtTableColumnVisibility table={table} />}
          {dataDownloader && (
            <DataDownloader
              columns={dataDownloaderColumns || columns}
              rows={rows}
              fileStem={dataDownloaderFileStem}
              query={query}
              variables={variables}
            />
          )}
        </Grid>
      </Grid>
      {/* Table component container */}
      <Box sx={{ w: 1, overflowX: "auto", marginTop: theme => theme.spacing(3) }}>
        {/* Table component */}
        <OtTableContainer>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <OtTH
                      key={header.id}
                      colSpan={header.colSpan}
                      stickyColumn={header.column.columnDef.sticky}
                    >
                      {header.isPlaceholder ? null : (
                        <OtTableHeader
                          canBeSorted={header.column.getCanSort()}
                          numeric={header.column.columnDef.numeric}
                        >
                          <OtTableHeaderText
                            verticalHeader={
                              header.column.columnDef.verticalHeader || verticalHeaders
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <Tooltip
                              style={""}
                              title={header.column.columnDef.tooltip}
                              showHelpIcon={!!header.column.columnDef.tooltip}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </Tooltip>
                            {!header.column.getIsSorted() && header.column.getCanSort() && (
                              <FontAwesomeIcon
                                size="sm"
                                icon={faArrowUp}
                                className="sortableColumn"
                              />
                            )}
                            {{
                              asc: <FontAwesomeIconPadded size="sm" icon={faArrowUp} />,
                              desc: <FontAwesomeIconPadded size="sm" icon={faArrowDown} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </OtTableHeaderText>

                          {header.column.getCanFilter() ? (
                            <OtTableColumnFilter column={header.column} />
                          ) : null}
                        </OtTableHeader>
                      )}
                    </OtTH>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <OtTD key={cell.id} stickyColumn={cell.column.columnDef.sticky}>
                        <OtTableCellContainer numeric={cell.column.columnDef.numeric}>
                          {getCellData(cell)}
                          {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                          {/* TODO: check NA value */}
                          {/* {Boolean(flexRender(cell.column.columnDef.cell, cell.getContext())) ||
                            naLabel} */}
                        </OtTableCellContainer>
                      </OtTD>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </OtTableContainer>
      </Box>

      {/*
       ************************
       * TABLE FOOTER ACTIONS *
       ************************
       */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: theme => `${theme.spacing(2)} 0 `,
        }}
      >
        <div>
          <span>Rows per page:</span>
          <NativeSelect
            disableUnderline
            disabled={loading}
            sx={{ pl: theme => theme.spacing(2) }}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </NativeSelect>
        </div>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme => theme.spacing(3),
            marginLeft: theme => theme.spacing(3),
          }}
        >
          <div>
            <span>
              {getCurrentPagePosition(
                table.getState().pagination.pageIndex,
                table.getState().pagination.pageSize,
                table.getGroupedRowModel().rows.length
              )}
            </span>
          </div>

          <div className="paginationAction">
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <FontAwesomeIcon size="2xs" icon={faBackwardStep} />
            </IconButton>
            <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon size="2xs" icon={faAngleLeft} />
            </IconButton>

            <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <FontAwesomeIcon size="2xs" icon={faAngleRight} />
            </IconButton>
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <FontAwesomeIcon size="2xs" icon={faForwardStep} />
            </IconButton>
          </div>
        </Box>
      </Box>
    </div>
  );
}

function getLoadingCells(columms: Array<Record<string, unknown>>) {
  const arr: Record<string, unknown>[] = [];
  columms.forEach(e => {
    if (isNestedColumns(e)) {
      const headerObj = {
        header: e.header || e.label,
        columns: getLoadingCells(e.columns),
      };
      arr.push(headerObj);
    } else arr.push({ ...e, cell: () => <Skeleton sx={{ minWidth: "50px" }} variant="text" /> });
  });
  return arr;
}

export default OtTable;
