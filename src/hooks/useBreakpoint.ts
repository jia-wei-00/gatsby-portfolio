import { useState, useEffect } from 'react';

const queries = {
  xs: '(max-width: 480px)',
  sm: '(max-width: 768px)',
  md: '(max-width: 1024px)',
  l: '(max-width: 1200px)',
  xl: '(max-width: 1500px)',
} as const;

type Breakpoints = { [K in keyof typeof queries]: boolean };

const getValues = (): Breakpoints =>
  Object.fromEntries(
    Object.entries(queries).map(([key, query]) => [
      key,
      window.matchMedia(query).matches,
    ])
  ) as Breakpoints;

export function useBreakpoint(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(getValues);

  useEffect(() => {
    const cleanups = Object.entries(queries).map(([key, query]) => {
      const mql = window.matchMedia(query);
      const handler = () =>
        setBreakpoints(prev => ({ ...prev, [key]: mql.matches }));
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  return breakpoints;
}
