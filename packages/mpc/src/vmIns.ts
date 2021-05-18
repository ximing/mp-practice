let vmInstance: any = null;

export const setCurrentVM = (vm: any) => {
  if (vm === void 0) {
    vmInstance = { setData() {}, data: {} };
  } else {
    vmInstance = vm;
  }
};

export const getCurrentVM = () => {
  if (vmInstance === null) {
    console.error('useXXX and onXXX hooks can only becalled during $setup()');
  }
  return vmInstance;
};
