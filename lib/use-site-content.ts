'use client';

import { useEffect, useState } from 'react';

let cache = new Map<string, unknown>();

export function useSiteContent<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(() => (cache.has(key) ? (cache.get(key) as T) : fallback));

  useEffect(() => {
    let cancelled = false;
    if (cache.has(key)) return;

    fetch(`/api/content/${key}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('fetch failed'))))
      .then((payload: T) => {
        cache.set(key, payload);
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        // fallback statis tetap dipakai
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return data;
}
