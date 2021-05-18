```typescript
import { runSetUp, pageOnUnload, pageOnLoad, effect } from '@wxjs/mpc';

function useAModule(a) {
  const [getA, setA] = useData({ a });

  pageOnLoad(() => {
    const timmer = setTimeout(() => {
      setA(data++);
    }, 1000);
  });

  pageOnUnload(() => {
    clearTimeout(timmer);
  });

  return { getA, setA };
}

function useBModule(aData, setA) {
  const dataA = useData({ b: aData.get() + 2 });
  const stateA = useState({ i: 1 });

  effect(() => {
    console.log(aData, a);
  }, [dataA, stateA]);

  function onBtnTab() {
    a.i += 1;
    console.log(aData.a);
  }

  return [data, onBtnTab];
}

const config = runSetUp(() => {
  const [aData, setA] = useAModule(3);
  const [bData, onBtnTab] = useBModule(aData, setA);
  return {
    data: {
      newAData: aData,
    },
    onBtnTab,
  };
});

Page(config);
```
