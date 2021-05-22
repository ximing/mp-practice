import { loop } from '@wxjs/mpu';
import { setCurrentVM } from './vmIns';
import { pagelifeCycle } from './helper';

function lifeCycle(this: any, ...args: any[]) {
  if (this.$lc$) {
    pagelifeCycle.forEach((key) => {
      if (key === 'onLoad') {
        this.$lc$[key].forEach((fn: any) => fn.apply(this, args));
      } else if (key === 'onUnload') {
        const old = this[key] || loop;
        this.onUnload = function () {
          if (this.$effect$) {
            this.$effect$.forEach((fn: any) => fn());
          }
          this.$lc$[key].forEach((fn: any) => fn.apply(this, args));
          old.apply(this, args);
        };
      } else {
        const old = this[key] || loop;
        this[key] = function (this: any, ...args: any[]) {
          this.$lc$[key].forEach((fn: any) => fn.apply(this, args));
          old.apply(this, args);
        };
      }
    });
  }
}

export const runCompSetUp = function (this: any, fn: Function): any {
  if (!fn) {
    throw new Error('fn 不能为空');
  }
  function rewriteData(config: any) {
    if (config.data) {
      const newData: any = {};
      Object.keys(config.data).forEach((key) => {
        config.data[key].$setDataKey$(key);
        newData[key] = config.data[key].$defaultValue$;
      });
      config.data = newData;
    }
  }

  setCurrentVM(undefined);
  const config = fn.apply(undefined) || {};
  rewriteData(config);
  setCurrentVM(null);

  const onLoad = function (this: any, ...args: any[]) {
    const originSetData = this.setData;
    function setData(this: any, data: any, fn?: Function) {
      // TODO trigger data change
      originSetData.call(this, data, fn);
    }

    // 代理新的setData
    this.setData = setData.bind(this);
    setCurrentVM(this);
    const newConfig = fn.apply(this) || {};
    rewriteData(newConfig);
    Object.keys(newConfig).forEach((key: string) => {
      if (
        [
          'properties',
          'setData',
          'data',
          'methods',
          'behaviors',
          'properties',
          'relations',
          'externalClasses',
          'lifetimes',
          'pageLifetimes',
          'definitionFilter',
        ].indexOf(key) < 0
      ) {
        this[key] = newConfig[key];
      }
    });
    lifeCycle.apply(this, args);
    setCurrentVM(null);
    newConfig && newConfig.onLoad && newConfig.onLoad.apply(this, args);
  };

  config.onLoad = onLoad;

  return config;
};
