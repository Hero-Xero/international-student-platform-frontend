/**
 * Custom hook for fetching CMS data with loading and error states
 */

import { useState, useEffect } from 'react';

interface UseCmsDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useCmsData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): UseCmsDataState<T> {
  const [state, setState] = useState<UseCmsDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await fetchFn();
        if (isMounted) {
          setState({
            data: result,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error(String(err));
          setState({
            data: null,
            loading: false,
            error,
          });
          console.error('CMS data fetch error:', error);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}
