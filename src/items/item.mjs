export class Item {
  constructor(itemClass, configManager) {
    this.itemClass = itemClass;
  }

  get key() {
    return this.itemClass.key;
  }

  get tooltipText() {
    return [this.name, this.itemClass.description]
  }

  get name() {
    return this.itemClass.name;
  }
}
