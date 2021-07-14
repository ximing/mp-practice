import { loop } from './utils/loop';

export class PageContainer {
  constructor(serviceIdentifier: any) {
    if (!Array.isArray(serviceIdentifier)) {
      serviceIdentifier = [serviceIdentifier];
    }
    serviceIdentifier.forEach((item) => {});
  }

  assign(options: any) {
    if (!options) {
      options = {};
    }
    const onLoad = options.onLoad || loop;
    options.onLoad = function (...args) {
      onLoad.apply(this, args);
    };
  }
}
