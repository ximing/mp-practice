import { useInstance } from './useInstance';
import { ensureLC } from '../helper';

function registerLifeCycle(lck: any, fn: Function) {
  const ins = useInstance();
  ensureLC(ins);
  (ins as any).$lc$[lck].push(fn);
}

export const execLifeCycle = function (this: any, lck: string) {
  (this as any).$lc$[lck] &&
    (this as any).$lc$[lck].forEach((fn: Function) => {
      fn.apply(this);
    });
};

export const pageOnLoad = function (
  fn: (query: Record<string, string | undefined>) => void | Promise<void>
) {
  registerLifeCycle('onLoad', fn);
};

export const pageOnShow = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onShow', fn);
};

export const pageOnReady = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onReady', fn);
};

export const pageOnHide = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onHide', fn);
};

export const pageOnUnload = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onUnload', fn);
};

export const pageOnPullDownRefresh = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onPullDownRefresh', fn);
};

export const pageOnReachBottom = function (fn: () => void | Promise<void>) {
  registerLifeCycle('onReachBottom', fn);
};

export const pageOnShareAppMessage = function (
  fn: (
    /** 分享发起来源参数 */
    options: WechatMiniprogram.Page.IShareAppMessageOption
  ) => WechatMiniprogram.Page.ICustomShareContent | void
) {
  registerLifeCycle('onShareAppMessage', fn);
};

export const pageOnShareTimeline = function (
  fn: () => WechatMiniprogram.Page.ICustomTimelineContent | void
) {
  registerLifeCycle('onShareTimeline', fn);
};

export const pageOnAddToFavorites = function (
  fn: (
    options: WechatMiniprogram.Page.IAddToFavoritesOption
  ) => WechatMiniprogram.Page.IAddToFavoritesContent
) {
  registerLifeCycle('onAddToFavorites', fn);
};

export const pageOnPageScroll = function (
  fn: (
    /** 页面滚动参数 */
    options: WechatMiniprogram.Page.IPageScrollOption
  ) => void | Promise<void>
) {
  registerLifeCycle('onPageScroll', fn);
};

export const pageOnResize = function (
  fn: (
    /** 窗口尺寸参数 */
    options: WechatMiniprogram.Page.IResizeOption
  ) => void | Promise<void>
) {
  registerLifeCycle('onResize', fn);
};

export const pageOnTabItemTap = function (
  fn: (
    /** tab 点击参数 */
    options: WechatMiniprogram.Page.ITabItemTapOption
  ) => void | Promise<void>
) {
  registerLifeCycle('onTabItemTap', fn);
};

export const compOnCreated = function (fn: () => void) {
  registerLifeCycle('create', fn);
};
export const compOnAttached = function (fn: () => void) {
  registerLifeCycle('attached', fn);
};
export const compOnReady = function (fn: () => void) {
  registerLifeCycle('ready', fn);
};
export const compOnMoved = function (fn: () => void) {
  registerLifeCycle('moved', fn);
};
export const compOnDetached = function (fn: () => void) {
  registerLifeCycle('detached', fn);
};
export const compOnError = function (fn: () => void) {
  registerLifeCycle('error', fn);
};
