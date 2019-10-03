export class Hardpoint {
  constructor(json) {
    this.x = json.x;
    this.y = json.y;
    this.id = json.id;
    this.maxClass = json.maxClass;
    this.acceptTypes = json.acceptTypes;
  }

  static create(json) {
    switch (json.type) {
      case "W":
        return new WeaponHardpoint(json);
      default:
        return new Hardpoint(json);
    }
  }

  get key() {
    return 'h' + this.maxClass;
  }

  accepts(itemClass) {
    return (this.acceptTypes ? this.acceptTypes : this.defaultAccepts).indexOf(itemClass.type) > -1 && itemClass.class <= this.maxClass;
  }

  get defaultAccepts() {
    return ['i'];
  }
}

export class WeaponHardpoint extends Hardpoint {
  constructor(json) {
    super(json);
    this.portX = json.portX;
    this.portY = json.portY;
    this._angle = json.angle;
  }

  get angle() {
    return this._angle ? this._angle : 0;
  }

  get key() {
    return 'w' + this.maxClass;
  }

  get defaultAccepts() {
    return ['w'];
  }
}
