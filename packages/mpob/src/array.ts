import { def } from '@wxjs/mpu';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

/**
 * Intercept mutating methods and emit events
 */
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  // @ts-ignore
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(this: any) {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    let i = arguments.length;
    const args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});
