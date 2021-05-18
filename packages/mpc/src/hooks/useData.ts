import { useInstance } from './useInstance';

export const useData = function <T>(
  key: string,
  value: T
): { get: () => T; set: (v: T, cb?: Function) => void; subscribe: (fn: (v?: T) => void) => void } {
  const ins = useInstance();
  ins.data[key] = value;
  let subList: Function[] = [];

  function subscribe(fn: (v?: T) => void) {
    subList.push(fn);
    return () => {
      subList = subList.filter((f) => f !== fn);
    };
  }

  function set(value: any, cb?: Function) {
    ins.setData(
      {
        [key]: value,
      },
      function (this: any, ...args: any) {
        try {
          subList.forEach((fn) => fn.apply(this, args));
        } catch (err) {
          console.error(err);
        }
        cb && cb.apply(this, args);
      }
    );
  }

  function get() {
    return ins.data[key];
  }

  return { get, set, subscribe };
};
