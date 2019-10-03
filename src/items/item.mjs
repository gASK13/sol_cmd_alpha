export class Item {
  constructor(itemClass) {
    this.itemClass = itemClass;
  }

  get key() {
    return this.itemClass.key;
  }
}
