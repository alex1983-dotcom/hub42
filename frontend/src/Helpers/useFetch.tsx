// src/Helpers/useFetch.ts
import { useEffect, useState } from 'react';

export const useFetch = <T,>(url: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url); // true только если url есть
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return; // <-- ничего не делаем

    const customFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const json: T = await res.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    customFetch();
  }, [url]);

  return { data, error, loading };
};