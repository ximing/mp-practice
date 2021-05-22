Component({
  data: {
    c: 1,
  },
  properties: {
    p: {
      type: Number,
      value: 2,
    },
  },
  created() {
    this.data.c = 2;
    console.log(this);
    this.ready = function () {
      console.log('new ready');
    }
  },
  ready() {
    console.log('origin ready');
  },
  methods: {
    emptyFunc() {
      console.log('share');
    },
  },
});
