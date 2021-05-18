import { loop } from '@wxjs/mpu';

export const page = function (config) {
  const _onload = config.onload || loop;
  config.onload = function () {};
};
