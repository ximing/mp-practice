import share from './modules/share';

Page({
  onLoad(query: Record<string, string | undefined>): void | Promise<void> {
    share();
    console.log(this)
  },
});
