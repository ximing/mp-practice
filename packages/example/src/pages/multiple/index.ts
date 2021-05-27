/*
 * 反模式，这种基于实例化Service的方式会导致Service的数据被复用，正确的方式应该是在onLoad生命周期里面来实现
 * */
class Service {
  b: number;

  constructor() {
    this.b = 0;
  }
}

class MultiplePage {
  a: number;
  s: Service;
  s1: Service;
  constructor() {
    this.a = 0;
    this.s = new Service();
  }

  onLoad() {
    this.s1 = new Service();
  }

  onTap() {
    this.a++;
    this.s.b++;
    this.s1.b++;
    // a 正常，b会被复用
    wx.showToast({
      title: `${this.a}/${this.s.b}/${this.s1.b}`,
    });
  }
  open() {
    wx.navigateTo({
      url: '/pages/multiple/index',
    });
  }
}
Page(new MultiplePage());
