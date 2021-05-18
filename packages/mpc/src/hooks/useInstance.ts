import { getCurrentVM } from '../vmIns';

export const useInstance = function () {
  return getCurrentVM();
};
