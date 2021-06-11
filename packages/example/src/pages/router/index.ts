Page({
  onUnload(): void | Promise<void> {
    this.reLaunch();
  },
  reLaunch() {
    wx.reLaunch({
      url: '/pages/main/index',
    });
  },
});
