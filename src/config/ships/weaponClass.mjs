import { ItemClass } from './itemClass.mjs';

export class WeaponClass extends ItemClass {
  constructor(json) {
    super(json);
    this._damage = json.damage;
    this._delay = json.delay;
    this._velocity = json.velocity;

    this.loadProjectiles(this.id, json);
  }

  loadProjectiles(id, json) {
    this.projectiles = [];
    if (json.projectiles) {
      for (var pJson of json.projectiles) {
          this.projectiles.push(new WeaponClassProjectile(id + "." + pJson.id, pJson));
      }
    }
  }

  get type() {
    return 'w';
  }

  get damage() {
    return this.convert(this._damage);
  }

  get delay() {
    return this.convert(this._delay);
  }

  get velocity() {
    return this.convert(this._velocity);
  }
}

class WeaponClassProjectile {
  constructor(id, json) {
    this.id = id;
    this.projectileClass = json.projectileClass;
    this.tint = json.tint;
    this._offsetX = json.offsetX;
    this._offsetY = json.offsetY;
    this._angle = json.angle;
  }

  get offsetX() {
    return this._offsetX ? this._offsetX : 0;
  }

  get offsetY() {
    return this._offsetY ? this._offsetY : 0;
  }

  get angle() {
    return this._angle ? this._angle : 0;
  }
}
