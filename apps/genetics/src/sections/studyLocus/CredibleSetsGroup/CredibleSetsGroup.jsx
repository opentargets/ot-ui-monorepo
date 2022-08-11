import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

import Slider from '../../../components/Slider';
import CredibleSetWithRegional from '../../../components/CredibleSetWithRegional';

import {
  traitAuthorYear,
  filterPageCredibleSet,
  createCredibleSetsQuery,
  isGreaterThanZero,
  buildCredibleGwasColocalisation,
  buildCredibleQtlColocalisation,
  buildFilteredCredibleGwasColocalisation,
} from '../../../utils';

import CREDIBLE_SETS_GROUP_QUERY from './CredibleSetsGroupQuery.gql';
import GWAS_REGIONAL_QUERY from '../../../queries/GWASRegionalQuery.gql';

import {
  SectionHeading,
  PlotContainer,
  PlotContainerSection,
  significantFigures,
} from '../../../ot-ui-components';

const CredibleSetsGroup = ({ variantId, studyId, start, end, chromosome }) => {
  const PAGE_CREDIBLE_SET_KEY = `gwasCredibleSet__${studyId}__${variantId}`;
  //   TODO: dummy contstants for displaying data, update with real data
  const maxLog2h4h3 = 10.708147088082905;

  let pageCredibleSet;
  let studyInfo;
  let pageCredibleSetAdjusted;
  let qtlColocalisation;
  let gwasColocalisation;

  let [credSet95Value, setCredSet95Value] = useState('all');
  let [log2h4h3SliderValue, setLog2h4h3SliderValue] = useState(1);
  let [h4SliderValue, setH4SliderValue] = useState(0.95);
  let [credibleSetIntersectionKeys, setCredibleSetIntersectionKeys] = useState(
    []
  );

  const handleCredSet95Change = event => {
    setCredSet95Value(event.target.value);
  };
  const handleLog2h4h3SliderChange = (_, value) => {
    setLog2h4h3SliderValue(value);
  };
  const handleH4SliderChange = (_, value) => {
    setH4SliderValue(value);
  };
  const handleCredibleSetIntersectionKeysCheckboxClick = key => event => {
    if (event.target.checked) {
      setCredibleSetIntersectionKeys([key, ...credibleSetIntersectionKeys]);
    } else {
      setCredibleSetIntersectionKeys(
        credibleSetIntersectionKeys.filter(d => d !== key)
      );
    }
  };

  useEffect(
    () => {
      // TODO check component did update / component did mount for more code
      setCredibleSetIntersectionKeys([
        `gwasCredibleSet__${studyId}__${variantId}`,
      ]);
    },
    [studyId, variantId]
  );

  const {
    loading: credibleSetsGroupLoading,
    error: credibleSetsGroupError,
    data: credibleSetsGroupQueryResult,
  } = useQuery(CREDIBLE_SETS_GROUP_QUERY, {
    variables: { studyId, variantId },
  });

  if (credibleSetsGroupQueryResult) {
    ({
      pageCredibleSet,
      studyInfo,
      gwasColocalisation,
      qtlColocalisation,
    } = credibleSetsGroupQueryResult);

    pageCredibleSetAdjusted = filterPageCredibleSet(
      pageCredibleSet,
      credSet95Value
    );
  } else if (credibleSetsGroupLoading) {
    return <Skeleton height="20vh" width="80vw" />;
  }

  const shouldMakeColocalisationCredibleSetQuery =
    isGreaterThanZero(gwasColocalisation.length) ||
    isGreaterThanZero(qtlColocalisation.length);

  const colocalisationCredibleSetQuery = shouldMakeColocalisationCredibleSetQuery
    ? createCredibleSetsQuery({ gwasColocalisation, qtlColocalisation })
    : null;

  console.log(`query fetched-------------`, colocalisationCredibleSetQuery);

  
  // if(colocalisationCredibleSetQuery) {
    // console.log('in here')
    // const [credibleSetSingleQuery, {
    //   loading: credibleSetSingleLoading,
    //   error: credibleSetSingleError,
    //   data: credibleSetSingleQueryResult
    // }] = useLazyQuery(colocalisationCredibleSetQuery);
    // credibleSetSingleQuery({variables: {}});
  // }

  // const {
  //   loading: credibleSetSingleLoading,
  //   error: credibleSetSingleError,
  //   data: credibleSetSingleQueryResult
  // } = useQuery(colocalisationCredibleSetQuery, {
  //   skip: colocalisationCredibleSetQuery === null,
  // });

  
  //   console.log(`👻 ~ file: CredibleSetsGroup.jsx ~ line 123 ~ CredibleSetsGroup ~ credibleSetSingleQueryResult`, credibleSetSingleQueryResult);

  

  // const gwasColocalisationCredibleSetsFiltered = buildFilteredCredibleGwasColocalisation(
  //   gwasColocalisation,
  //   credibleSetSingleQueryResult,
  //   { log2h4h3SliderValue, h4SliderValue, credSet95Value }
  // );
  // console.log(`👻 ------------------------------------------------------------------------------------------------------------------------------------------------👻`);
  // console.log(`👻 ~ file: CredibleSetsGroup.jsx ~ line 131 ~ CredibleSetsGroup ~ gwasColocalisationCredibleSetsFiltered`, JSON.stringify(gwasColocalisationCredibleSetsFiltered));
  // console.log(`👻 ------------------------------------------------------------------------------------------------------------------------------------------------👻`);

  return (
    <>
      <div>
        -----------------------------CredibleSetGroup--------------------------------------
      </div>
      <SectionHeading
        heading={`Credible Set Overlap`}
        subheading={`Which variants at this locus are most likely causal?`}
      />

      <PlotContainer
        center={
          <Typography>
            Showing credible sets for{' '}
            {/* <strong>{traitAuthorYear(studyInfo)}</strong> and GWAS studies/QTLs */}
            in colocalisation. Expand the section to see the underlying regional
            plot.
          </Typography>
        }
      >
        <PlotContainerSection>
          <Grid container alignItems="center">
            <Grid item>
              <div style={{ padding: '0 20px' }}>
                <Typography>Credible set variants</Typography>
                <RadioGroup
                  style={{ padding: '0 16px' }}
                  row
                  aria-label="95% credible set"
                  name="credset95"
                  value={credSet95Value}
                  onChange={handleCredSet95Change}
                >
                  <FormControlLabel
                    value="95"
                    control={<Radio />}
                    label="95%"
                  />
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="PP > 0.1%"
                  />
                </RadioGroup>
              </div>
            </Grid>
            <Grid item>
              <Slider
                label={`log2(H4/H3): ${significantFigures(
                  log2h4h3SliderValue
                )}`}
                min={0}
                max={Math.ceil(maxLog2h4h3)}
                step={Math.ceil(maxLog2h4h3) / 50}
                value={log2h4h3SliderValue}
                onChange={handleLog2h4h3SliderChange}
              />
            </Grid>
            <Grid item>
              <Slider
                label={`H4: ${significantFigures(h4SliderValue)}`}
                min={0}
                max={1}
                step={0.02}
                value={h4SliderValue}
                onChange={handleH4SliderChange}
              />
            </Grid>
          </Grid>
        </PlotContainerSection>
      </PlotContainer>

      <CredibleSetWithRegional
        checkboxProps={{
          checked:
            credibleSetIntersectionKeys.indexOf(PAGE_CREDIBLE_SET_KEY) >= 0,
          onChange: handleCredibleSetIntersectionKeysCheckboxClick(
            PAGE_CREDIBLE_SET_KEY
          ),
          value: PAGE_CREDIBLE_SET_KEY,
        }}
        credibleSetProps={{
          label: traitAuthorYear(studyInfo),
          start,
          end,
          data: pageCredibleSetAdjusted,
        }}
        regionalProps={{
          title: null,
          query: GWAS_REGIONAL_QUERY,
          variables: {
            studyId: studyInfo.studyId,
            chromosome,
            start,
            end,
          },
          start,
          end,
        }}
      />
      <div>
        -----------------------------CredibleSetGroupEND-----------------------------------
      </div>
    </>
  );
};

export default CredibleSetsGroup;
