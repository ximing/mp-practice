Page({
  data: {
    a: 1,
    pc: () => {
      console.log(this);
    },
  },
  onLoad(query: Record<string, string | undefined>): void | Promise<void> {
    this.setData({
      pc: () => {
        console.log('++', this);
      },
    });
  },
});
