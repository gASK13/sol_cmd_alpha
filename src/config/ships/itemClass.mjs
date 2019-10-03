export class ItemClass {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.class = json.class;

    //TODO
    this.sprite = json.sprite;
  }

  get key() {
    return this.id;
  }

  get type() {
    return 'i';
  }
}
