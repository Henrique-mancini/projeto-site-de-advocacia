import { useState, useEffect, useCallback } from 'react';
import { sanityClient } from '../services/sanity';

const useSanityFetch = (query, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const result = await sanityClient.fetch(query, params);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, ...Object.values(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
};

export { useSanityFetch };
