import { useEffect, useState } from 'react';
import client from '../../client';

// Select and parsed data from API response from fixed Target
const getAssociatedDiseasesData = data => {
  if (!data) return [];
  return data.target.associatedDiseases.rows.map(d => {
    const sources = d.datasourceScores.reduce(
      (acc, curr) => ((acc[curr.componentId] = curr.score), acc),
      {}
    );
    return { ...d, ...sources };
  });
};

// Select and parsed data from API response from fixed Disease
const getAssociatedTargetsData = data => {
  if (!data) return [];
  return data.disease.associatedTargets.rows.map(d => {
    const sources = d.datasourceScores.reduce(
      (acc, curr) => ((acc[curr.componentId] = curr.score), acc),
      {}
    );
    return { ...d, ...sources };
  });
};

const getParsedData = (entity, apiResponse) => {
  if (entity === 'target') return getAssociatedDiseasesData(apiResponse);
  if (entity === 'disease') return getAssociatedTargetsData(apiResponse);
};

const getAllDataCount = (entity, apiResponse) => {
  if (entity === 'target') return apiResponse.target.associatedDiseases.count;
  if (entity === 'disease') return apiResponse.disease.associatedTargets.count;
};

function useTargetAssociations({
  query,
  options: {
    id = '',
    index = 0,
    size = 50,
    filter = '',
    sortBy = 'score',
    aggregationFilters = [],
    enableIndirect = false,
    datasources = null,
    entity,
  },
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    client
      .query({
        query,
        variables: {
          id,
          index,
          size,
          filter,
          sortBy,
          enableIndirect,
          datasources,
        },
      })
      .then(({ data: resData, errors }) => {
        if (errors) {
          setError(errors[0]);
          setInitialLoading(false);
          setLoading(false);
          return;
        }
        if (isCurrent) {
          let parsedData = getParsedData(entity, resData);
          let dataCount = getAllDataCount(entity, resData);
          setCount(dataCount);
          setData(parsedData);
          setInitialLoading(false);
          setLoading(false);
        }
      });
    return () => (isCurrent = false);
  }, [id, index, size, filter, sortBy, enableIndirect, datasources]);

  return { loading, error, data, initialLoading, count };
}

export default useTargetAssociations;
