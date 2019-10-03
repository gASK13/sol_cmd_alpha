import { ItemClass } from './itemClass.mjs';

export class WeaponClass extends ItemClass {
  constructor(json) {
    super(json);
    this.damage = json.damage;
    this.delay = json.delay;
    this.velocity = json.velocity;

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
}

class WeaponClassProjectile {
  constructor(id, json) {
    this.id = id;
    this.projectileClass = json.projectileClass;
    this.tint = json.tint;
    this._offsetX = json.offsetX;
    this._offsetY = json.offsetY;
  }

  get offsetX() {
    return this._offsetX ? this._offsetX : 0;
  }

  get offsetY() {
    return this._offsetY ? this._offsetY : 0;
  }
}
