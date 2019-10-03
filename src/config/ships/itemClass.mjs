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

  convert(prop) {
    if (prop !== Object(prop)) {
      return prop;
    } else if (prop.rnd) {
      return Phaser.Math.RND.between(prop.rnd.min, prop.rnd.max);
    } else {
      let ret = {};
      for (let innerProp of Object.keys(prop)) {
        ret[innerProp] = this.convert(prop[innerProp]);
      }
      return ret;
    }
  }
}
