export class Container {
  resolve() {}

  get(...args) {
    return this.resolve.apply(this, args);
  }
}
