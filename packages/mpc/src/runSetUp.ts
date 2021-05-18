import { setCurrentVM } from './vmIns';
export const runSetUp = function (this: any, fn: Function): any {
  if (!fn) {
    throw new Error('fn 不能为空');
  }
  setCurrentVM(undefined);
  const config = fn.apply(undefined) || {};
  setCurrentVM(null);

  const onLoad = function (this: any, ...args: any[]) {
    const originSetData = this.setData;
    function setData(this: any, data: any, fn?: Function) {
      // TODO trigger data change
      originSetData.call(this, data, fn);
    }
    this.setData = setData.bind(this);
    setCurrentVM(this);
    const newConfig = fn.apply(this) || {};
    Object.keys(newConfig).forEach((key: string) => {
      this[key] = newConfig[key];
    });
    this.onUnload = function () {
      if (this.$effect$) {
        this.$effect$.forEach(fn);
      }
      newConfig && newConfig.onUnload && newConfig.onUnload.apply(this, args);
    };
    setCurrentVM(null);
    newConfig && newConfig.onLoad && newConfig.onLoad.apply(this, args);
  };

  config.onLoad = onLoad;

  return config;
};
