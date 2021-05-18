import { loop } from '@wxjs/mpu';
import { pageOnUnload } from './lifeCycle';

const observer = function (resVal: any, obj: any, get: Function, set: Function) {
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    keys.forEach((sk) => {
      Object.defineProperty(resVal, sk, {
        enumerable: true,
        configurable: true,
        get() {
          return get()[sk];
        },
        set(value) {
          if (value === get()[sk]) return;
          set(Object.assign({}, get(), { [sk]: value }));
        },
      });
    });
    return function () {
      keys.forEach((key) => {
        delete resVal[key];
      });
    };
  }
  return loop;
};

export const useState = function <T>(value: T): {
  get: () => T;
  set: (v: T) => void;
  // $subscribe$: (fn: (v?: T) => void) => void;
} & T {
  if (value == null) {
    throw new Error('useState value 必须是有效值，不能为null 或 undefined');
  }
  let curValue: any = value;
  let subList: Function[] = [];

  function subscribe(fn: (v?: T) => void) {
    subList.push(fn);
    return () => {
      subList = subList.filter((f) => f !== fn);
    };
  }

  const resVal = { get, set, $subscribe$: subscribe };
  let clearFn = loop;

  function set(this: any, value: any) {
    // TODO deepEqual
    if (curValue === value) return;
    const old = curValue;
    curValue = value;
    try {
      subList.forEach((fn) => fn.apply(this, [value, old]));
      clearFn();
      clearFn = observer(resVal, value, get, set);
    } catch (err) {
      console.error(err);
    }
  }

  function get() {
    return curValue;
  }

  pageOnUnload(() => {
    curValue = null;
    subList = [];
    clearFn();
  });

  clearFn = observer(resVal, value, get, set);
  // @ts-ignore
  return resVal;
};
