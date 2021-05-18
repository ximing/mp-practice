import { useInstance } from './useInstance';

export const useState = function <T>(
  key: string,
  value: T
): { get: () => T; set: (v: T, cb: Function) => void; subscribe: (fn: (v?: T) => void) => void } {
  const ins = useInstance();
  if (!ins.$state$) {
    ins.$state$ = {};
  }
  ins.$state$[key] = value;
  let subList: Function[] = [];

  function subscribe(fn: (v?: T) => void) {
    subList.push(fn);
    return () => {
      subList = subList.filter((f) => f !== fn);
    };
  }

  function set(this: any, value: any) {
    // TODO deepEqual
    const old = ins.$state$[key];
    ins.$state$[key] = value;
    try {
      subList.forEach((fn) => fn.apply(this, [value, old]));
    } catch (err) {
      console.error(err);
    }
  }

  function get() {
    return ins.$state$[key];
  }

  return { get, set, subscribe };
};
