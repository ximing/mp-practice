import share from './modules/share';

export function setup() {}

Page({
  onLoad(query: Record<string, string | undefined>): void | Promise<void> {
    share();
  },
});
