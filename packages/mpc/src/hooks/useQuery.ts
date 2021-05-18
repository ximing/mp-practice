import { pageOnLoad } from './lifeCycle';
import { useState } from './useState';

export const useQuery = function <T>(): T {
  const query = useState({});
  pageOnLoad((q) => {
    query.set(q);
  });
  // @ts-ignore
  return query as T;
};
