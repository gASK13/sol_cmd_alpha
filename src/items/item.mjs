export class Item {
  constructor(itemClass, configManager) {
    this.itemClass = itemClass;
  }

  get key() {
    return this.itemClass.key;
  }
}
