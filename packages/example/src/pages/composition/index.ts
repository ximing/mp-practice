import { runSetUp, useData } from '@wxjs/mpc';
export function setup() {}

const config = runSetUp(() => {
  const a = useData('a', { a: 1 });
  function addA() {
    a.set({ a: a.get().a + 1 });
  }
  return {
    data: {
      a: a.get(),
    },
    addA,
  };
});

Page(config);
