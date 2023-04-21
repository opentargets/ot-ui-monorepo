import { useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { TablePagination, Typography } from '@material-ui/core';
import useAotfContext from '../hooks/useAotfContext';
import ColoredCell from './ColoredCell';
import { getLegend, defaulDatasourcesWeigths } from '../utils';

function TableFooter({ table }) {
  const {
    count,
    loading,
    pagination,
    modifiedSourcesWeights,
    setDataSourcesWeights,
    displayedTable,
  } = useAotfContext();
  const isAssociations = displayedTable === 'associations';

  /**
   * LEGEND EFECT
   */
  useEffect(() => {
    const Legend = getLegend(displayedTable === 'associations');
    document.getElementById('legend').innerHTML = '';
    document.getElementById('legend').appendChild(Legend);
  }, [displayedTable]);

  return (
    <div className="table-footer">
      <div style={{ display: 'flex', alignItems: ' flex-start' }}>
        <div id="legend" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '10px',
              marginBottom: '3px',
            }}
          >
            No data
          </span>
          <ColoredCell />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {modifiedSourcesWeights && isAssociations && (
          <Alert severity="info">
            <Typography variant="caption">
              Weights controls modified{' '}
            </Typography>
            <button
              onClick={() => setDataSourcesWeights(defaulDatasourcesWeigths)}
              style={{ fontSize: '0.75rem' }}
            >
              Reset to default
            </button>{' '}
          </Alert>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 200, 500]}
          component="div"
          count={count}
          rowsPerPage={table.getState().pagination.pageSize}
          page={pagination.pageIndex}
          labelRowsPerPage="Associations per page"
          onPageChange={(e, index) => {
            if (!loading) {
              table.setPageIndex(index);
            }
          }}
          onRowsPerPageChange={e => {
            if (!loading) {
              return table.setPageSize(Number(e.target.value));
            }
          }}
        />
      </div>
    </div>
  );
}

export default TableFooter;
