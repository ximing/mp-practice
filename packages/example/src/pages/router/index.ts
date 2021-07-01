Page({
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
      fail(e) {
        console.log('fail', e);
      },
    });
  },
  subPage() {
    wx.navigateTo({
      url: '/sub1/pages/router/index',
      success() {
        console.log('success subPage');
      },
      fail(e) {
        console.log('fail', e);
      },
    });
  },
});
