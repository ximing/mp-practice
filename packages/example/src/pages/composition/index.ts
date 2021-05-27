import { effect, runSetUp, useData, useInstance, useQuery, useState } from '@wxjs/mpc';

function useAModule() {
  const query = useQuery();
  function printQuery() {
    console.log(query);
  }
  return { printQuery };
}

const config = runSetUp(() => {
  const a = useData({ v: 1, c: 2, d: [0, 1, 2] });
  const a1 = useData([0, 1, 2]);
  const s1 = useState({ a: 1 });
  const { printQuery } = useAModule();
  const ins = useInstance();
  function addA() {
    // a.set({ v: a.v + 1 });
    console.log(a);
    ins.selectComponent('#sss');
    a.v += 2;
    a1[0] += 1;
    s1.a += 2;
  }

  effect(() => {
    console.log('s1 a: ', s1.a);
  }, [s1]);

  return {
    data: {
      a,
      a1,
    },
    addA,
    printQuery,
  };
});

Page(config);
