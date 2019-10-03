import { ItemClass } from './itemClass.mjs';
import { Projectile } from './projectile.mjs';

export class WeaponClass extends ItemClass {
  constructor(json) {
    super(json);
    this.loadProjectiles(this.id, json);
  }

  loadProjectiles(id, json) {
    this.projectiles = [];
    if (json.projectiles) {
      for (var pJson of json.projectiles) {
          this.projectiles.push(new Projectile(id + "." + pJson.id, pJson));
      }
    }
  }

  get type() {
    return 'w';
  }
}
