import { useInstance } from './useInstance';

function observer(ins: any, resVal: any, key: any, value: any, trigger: any) {
  const isArr = Array.isArray(value);
  if (typeof value === 'object') {
    Object.keys(value).forEach((sk) => {
      Object.defineProperty(resVal, sk, {
        enumerable: true,
        configurable: true,
        get() {
          return ins.data[key()][sk];
        },
        set(value) {
          if (value === ins.data[key()][sk]) return;
          if (isArr) {
            ins.setData(
              {
                [`${key()}[${sk}]`]: value,
              },
              trigger
            );
          } else {
            ins.setData(
              {
                [`${key()}.${sk}`]: value,
              },
              trigger
            );
          }
        },
      });
    });
  }
}

export const useData = function <T>(value: T): {
  get: () => T;
  set: (v: T, cb?: Function) => void;
  // $subscribe$: (fn: (v?: T) => void) => void;
  // $setDataKey$: (nk: string) => void;
  // $defaultValue$:T
} & T {
  const ins = useInstance();
  let subList: Function[] = [];
  let key: string = '';

  if (value == null) {
    throw new Error('useData value 必须是有效值，不能为null 或 undefined');
  }

  function subscribe(fn: (v?: T) => void) {
    subList.push(fn);
    return () => {
      subList = subList.filter((f) => f !== fn);
    };
  }

  function trigger(this: any, ...args: any) {
    try {
      subList.forEach((fn) => fn.apply(this, args));
    } catch (err) {
      console.error(err);
    }
  }

  const resVal = {
    get,
    set,
    $subscribe$: subscribe,
    $setDataKey$: setDataKey,
    $defaultValue$: value,
  };

  function set(value: any, cb?: Function) {
    observer(ins, resVal, () => key, value, trigger);
    ins.setData(
      {
        [key]: value,
      },
      function (this: any, ...args: any) {
        trigger.apply(this, args);
        cb && cb.apply(this, args);
      }
    );
  }

  function setDataKey(nk: string) {
    key = nk;
  }

  function get() {
    return key ? (ins as any).data[key] : value;
  }

  observer(ins, resVal, () => key, value, trigger);
  // @ts-ignore
  return resVal;
};
