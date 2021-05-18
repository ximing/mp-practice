import { useInstance } from './useInstance';
import { pagelifeCycle } from '../helper';

function ensure(ins: any) {
  if (!ins.$lc$) {
    pagelifeCycle.forEach((key) => {
      ins.$lc$ = { [key]: [] };
    });
  }
}

function execLifeCycle(lck: any, fn: Function) {
  const ins = useInstance();
  ensure(ins);
  ins.$lc$[lck].push(fn);
}

export const pageOnLoad = function (
  fn: (query: Record<string, string | undefined>) => void | Promise<void>
) {
  execLifeCycle('onLoad', fn);
};

export const pageOnShow = function (fn: () => void | Promise<void>) {
  execLifeCycle('onShow', fn);
};

export const pageOnReady = function (fn: () => void | Promise<void>) {
  execLifeCycle('onReady', fn);
};

export const pageOnHide = function (fn: () => void | Promise<void>) {
  execLifeCycle('onHide', fn);
};

export const pageOnUnload = function (fn: () => void | Promise<void>) {
  execLifeCycle('onUnload', fn);
};

export const pageOnPullDownRefresh = function (fn: () => void | Promise<void>) {
  execLifeCycle('onPullDownRefresh', fn);
};

export const pageOnReachBottom = function (fn: () => void | Promise<void>) {
  execLifeCycle('onReachBottom', fn);
};

export const pageOnShareAppMessage = function (
  fn: (
    /** 分享发起来源参数 */
    options: WechatMiniprogram.Page.IShareAppMessageOption
  ) => WechatMiniprogram.Page.ICustomShareContent | void
) {
  execLifeCycle('onShareAppMessage', fn);
};

export const pageOnShareTimeline = function (
  fn: () => WechatMiniprogram.Page.ICustomTimelineContent | void
) {
  execLifeCycle('onShareTimeline', fn);
};

export const pageOnAddToFavorites = function (
  fn: (
    options: WechatMiniprogram.Page.IAddToFavoritesOption
  ) => WechatMiniprogram.Page.IAddToFavoritesContent
) {
  execLifeCycle('onAddToFavorites', fn);
};

export const pageOnPageScroll = function (
  fn: (
    /** 页面滚动参数 */
    options: WechatMiniprogram.Page.IPageScrollOption
  ) => void | Promise<void>
) {
  execLifeCycle('onPageScroll', fn);
};

export const pageOnResize = function (
  fn: (
    /** 窗口尺寸参数 */
    options: WechatMiniprogram.Page.IResizeOption
  ) => void | Promise<void>
) {
  execLifeCycle('onResize', fn);
};

export const pageOnTabItemTap = function (
  fn: (
    /** tab 点击参数 */
    options: WechatMiniprogram.Page.ITabItemTapOption
  ) => void | Promise<void>
) {
  execLifeCycle('onTabItemTap', fn);
};
