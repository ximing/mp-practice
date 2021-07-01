Page({
  onLoad(query: Record<string, string | undefined>): void | Promise<void> {
    console.log('---->');
  },
  onUnload(): void | Promise<void> {
    this.reLaunch();
  },
  reLaunch() {
    wx.reLaunch({
      url: '/pages/main/index',
    });
  },
  404() {
    wx.navigateTo({
      url: '123',
      fail() {
        console.log('fail');
      },
    });
  },
});
