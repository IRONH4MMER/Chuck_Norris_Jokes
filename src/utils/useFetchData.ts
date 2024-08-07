import axios from 'axios';
import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T[];
  isLoading: boolean;
  error: Error | null;
};

function useFetchData<T>(url: string, queryParams?: string): FetchState<T> {
  const BASE_URL = queryParams
    ? 'https://api.chucknorris.io/jokes/' + queryParams
    : 'https://api.chucknorris.io/jokes/';

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T[]>(BASE_URL + url);

        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(error) && error.response) {
          setError(new Error('Failed to fetch data'));
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetchData;
