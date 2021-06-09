import { setCurrentVM } from './vmIns';
import { componentLifeCycle } from './helper';
import { execLifeCycle } from './hooks/lifeCycle';

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
  const { create, attached, ready, moved, detached, error, pageLifetimes } = config;
  config.create = function (this: any, ...args: any[]) {
    const originSetData = this.setData;
    function setData(this: any, data: any, fn?: Function) {
      // TODO trigger data change
      originSetData.call(this, data, fn);
    }
    this.setData = setData.bind(this);
    setCurrentVM(this);
    const newConfig = fn.apply(this) || {};
    rewriteData(newConfig);
    Object.keys(newConfig).forEach((key: string) => {
      if (
        [
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
          ...componentLifeCycle,
        ].indexOf(key) < 0
      ) {
        this[key] = newConfig[key];
      }
    });
    setCurrentVM(null);
    create && create.apply(this, args);
    execLifeCycle.call(this, 'create');
  };
  config.attached = function (this: any) {
    attached.apply(this);
    execLifeCycle.call(this, 'attached');
  };
  config.ready = function (this: any) {
    ready.apply(this);
    execLifeCycle.call(this, 'ready');
  };
  config.moved = function (this: any) {
    moved.apply(this);
    execLifeCycle.call(this, 'moved');
  };
  config.detached = function (this: any) {
    detached.apply(this);
    execLifeCycle.call(this, 'detached');
    if (this.$effect$) {
      this.$effect$.forEach((fn: any) => fn());
    }
  };
  config.error = function (this: any) {
    error.apply(this);
    execLifeCycle.call(this, 'error');
  };
  config.pageLifetimes = {
    show(...args: any) {
      pageLifetimes.show.apply(this, args);
      execLifeCycle.call(this, 'onShow');
    },
    hide(...args: any) {
      pageLifetimes.hide.apply(this, args);
      execLifeCycle.call(this, 'onHide');
    },
    resize(...args: any) {
      pageLifetimes.resize.apply(this, args);
      execLifeCycle.call(this, 'onResize');
    },
  };
  setCurrentVM(null);
  return config;
};
