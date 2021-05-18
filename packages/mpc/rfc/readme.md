```typescript
import { runSetUp, pageOnUnload, pageOnLoad, effect } from '@wxjs/mpc';

function useAModule(a) {
  const aData = useData({ a });

  pageOnLoad(() => {
    const timmer = setTimeout(() => {
      aData.a += 1;
      //或 aData.set({a:a+1})
    }, 1000);
  });

  pageOnUnload(() => {
    clearTimeout(timmer);
  });

  return aData;
}

function useBModule(aData, setA) {
  const bData = useData({ b: aData.a + 2 });
  const sData = useState({ i: 1 });

  effect(() => {
    console.log(bData, sData);
  }, [bData, sData]);

  function onBtnTab() {
    bData.b += 1;
    console.log(aData.a);
  }

  return [bData, onBtnTab];
}

const config = runSetUp(() => {
  const aData = useAModule(3);
  const bData = useBModule(aData);
  return {
    data: {
      newAData: aData,
    },
    onBtnTab,
  };
});

Page(config);
```
