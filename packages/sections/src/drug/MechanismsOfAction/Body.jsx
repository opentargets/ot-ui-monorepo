import { v1 } from 'uuid';
import { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Link, SectionItem } from 'ui';

import { definition } from '.';
import Description from './Description';
import { DataTable, TableDrawer } from '../../components/Table';

import MECHANISMS_OF_ACTION_QUERY from './MechanismsOfActionQuery.gql';

const columns = [
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of Action',
  },
  {
    id: 'targetName',
    label: 'Target Name',
  },
  {
    id: 'targets',
    label: 'Human targets',
    filterValue: row =>
      row.targets.map(target => target.approvedSymbol).join(' '),
    exportValue: row => row.targets.map(target => target.approvedSymbol).join(),
    renderCell: ({ targets }) => {
      if (!targets) return 'non-human';

      const targetList = targets.map(target => ({
        name: target.approvedSymbol,
        url: `/target/${target.id}`,
        group: 'Human targets',
      }));

      return <TableDrawer entries={targetList} />;
    },
  },
  {
    id: 'references',
    label: 'References',
    filterValue: row =>
      row.references.map(reference => reference.source).join(' '),
    exportValue: row =>
      row.references.map(reference => reference.source).join(),
    renderCell: row =>
      !row.references
        ? 'n/a'
        : row.references.map((r, i) => (
            <Fragment key={v1()}>
              {i > 0 ? ', ' : null}
              {r.urls ? (
                <Link external to={r.urls[0]}>
                  {r.source}
                </Link>
              ) : (
                r.source
              )}
            </Fragment>
          )),
  },
];

function Body({ id: chemblId, label: name }) {
  const variables = { chemblId };
  const request = useQuery(MECHANISMS_OF_ACTION_QUERY, {
    variables,
  });
    
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description
          name={name}
          parentMolecule={request.parentMolecule || []}
          childMolecules={request.childMolecules || []}
        />
      )}
      renderBody={data => {
        const { rows } = data.drug.mechanismsOfAction;

        return (
          <DataTable
            showGlobalFilter
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem={`${chemblId}-mechanisms-of-action`}
            query={MECHANISMS_OF_ACTION_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
