export const pagelifeCycle = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onShareTimeline',
  'onAddToFavorites',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
];

export const componentLifeCycle = ['created', 'attached', 'ready', 'moved', 'detached', 'error'];

export function ensureLC(ins: any) {
  if (!ins.$lc$) {
    ins.$lc$ = {};
    pagelifeCycle.forEach((key) => {
      ins.$lc$[key] = [];
    });
  }
}
