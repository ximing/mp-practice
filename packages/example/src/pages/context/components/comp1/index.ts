import { usePageService } from '@wxjs/mpx/dist/hooks/useService';

Component({
  data: {
    a: 1,
  },
  properties: {
    p: {
      type: Number,
      value: 2,
    },
    pc: {
      type: null,
    },
  },
  created() {
    this.data.c = 2;
    console.log('==>', this.emptyFunc);
    console.log(this.getPageId());
    this.ready = function () {
      console.log('new ready');
    };
  },
  ready() {
    this.data.pc();
    console.log('origin ready');
    // const s1 = usePageService();
    // s1.sub('c',(newVal)=>{
    //   this.setData({c:newVal})
    // });
  },
  methods: {
    emptyFunc() {
      console.log('share');
    },
  },
});
