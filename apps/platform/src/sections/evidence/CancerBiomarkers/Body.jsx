import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Link from '../../../components/Link';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { epmcUrl } from '../../../utils/urls';
import Description from './Description';
import BiomarkersDrawer from './BiomarkersDrawer';
import Summary from './Summary';

import CANCER_BIOMARKERS_EVIDENCE_QUERY from './CancerBiomarkersEvidence.gql';

const columns = [
  {
    id: 'disease.name',
    label: 'Disease',
    renderCell: ({ disease, diseaseFromSource }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                {diseaseFromSource}
              </Typography>
            </>
          }
          showHelpIcon
        >
          <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
        </Tooltip>
      );
    },
  },
  {
    id: 'biomarkerName',
    label: 'Biomarker',
    renderCell: ({ biomarkerName, biomarkers }) => {
      return (
        <BiomarkersDrawer
          biomarkerName={biomarkerName}
          biomarkers={biomarkers}
        />
      );
    },
  },
  {
    id: 'drug',
    label: 'Reported drug',
    renderCell: ({ drug, drugFromSource }) => {
      return drug ? (
        <Link to={`/drug/${drug.id}`}>{drug.name}</Link>
      ) : (
        drugFromSource
      );
    },
    filterValue: ({ drug, drugFromSource }) => {
      return drug ? drug.name : drugFromSource;
    },
  },
  {
    id: 'drugResponse.name',
    label: 'Drug response',
    renderCell: ({ drugResponse }) => {
      return (
        <Link to={`/disease/${drugResponse.id}`}>{drugResponse.name}</Link>
      );
    },
  },
  {
    id: 'confidence',
    label: 'Source',
    renderCell: ({ confidence, urls }) => {
      const entries = urls
        ? urls.map(url => {
            return {
              url: url.url,
              name: url.niceName,
              group: 'Sources',
            };
          })
        : [];
      return <TableDrawer entries={entries} message={confidence} />;
    },
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: ({ literature }) => {
      const entries = literature
        ? literature.map(id => {
            return { name: id, url: epmcUrl(id), group: 'literature' };
          })
        : [];

      return <PublicationsDrawer entries={entries} />;
    },
  },
];

export function Body({ definition, id, label }) {
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.CancerBiomarkersEvidenceFragment
  );
  const count = summaryData.cancerBiomarkersSummary.count;

  if (!count || count < 1) {
    return null;
  }

  return (
    <BodyCore definition={definition} id={id} label={label} count={count} />
  );
}

export function BodyCore({ definition, id, label, count }) {
  const { ensgId, efoId } = id;

  const variables = {
    ensemblId: ensgId,
    efoId,
    size: count,
  };

  const request = useQuery(CANCER_BIOMARKERS_EVIDENCE_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={definition.dataType}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem={`${definition.id}-${ensgId}-${efoId}`}
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={CANCER_BIOMARKERS_EVIDENCE_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}
