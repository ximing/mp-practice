import { useInstance } from './useInstance';

export const effect = function (fn: Function, el: any[]) {
  const ins = useInstance() as any;
  if (!ins.$effect$) {
    ins.$effect$ = [];
  }
  el.forEach((el) => {
    if (!el.$subscribe$) {
      throw new Error('effect 第二个参数必须为 useData或useStata返回的对象');
    }
    ins.$effect$.push(el.$subscribe$(fn));
  });
};
