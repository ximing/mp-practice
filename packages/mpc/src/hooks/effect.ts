import { useInstance } from './useInstance';

export const effect = function (fn: Function, el: any[]) {
  const ins = useInstance();
  if (ins.$effect$) {
    ins.$effect$ = [];
  }
  el.forEach((el) => {
    ins.$effect$.push(el.subscribe(fn));
  });
};
