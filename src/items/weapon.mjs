import {Item} from './item.mjs';

export class Weapon extends Item {
  constructor(itemClass, configManager) {
    super(itemClass, configManager);
    this.projectiles = [];
    this._damage = itemClass.damage;
    for (let wpc of itemClass.projectiles) {
      this.projectiles.push(new WeaponProjectile(configManager.projectiles[wpc.projectileClass], wpc, this));
    }
  }

  fire(hardpoint, bullets, pShip) {
    if (!pShip.timers[hardpoint.id] || pShip.timers[hardpoint.id] < pShip.scene.time.now ) {
      for (let projectile of this.projectiles) {
        let bullet = bullets.get();
        if (bullet) bullet.spawn(
            pShip.x + hardpoint.portX + projectile.weaponProjectileClass.offsetX,
            pShip.y + hardpoint.portY + projectile.weaponProjectileClass.offsetY,
            pShip.body.velocity.x + this.getVelocityXModifier(hardpoint.angle + projectile.weaponProjectileClass.angle) * this.itemClass.velocity,
            pShip.body.velocity.y + this.getVelocityYModifier(hardpoint.angle + projectile.weaponProjectileClass.angle) * this.itemClass.velocity,
            hardpoint.angle + projectile.weaponProjectileClass.angle,
            projectile);
      }
      pShip.timers[hardpoint.id] = pShip.scene.time.now + this.itemClass.delay;
    }
  }

  getVelocityXModifier(angle) {
    return Math.sin(angle);
  }

  getVelocityYModifier(angle) {
    return -Math.cos(angle);
  }

  get tooltipText() {
    return [this.name, "Damage: " + (this.projectiles.length > 1 ? this.projectiles.length + "x" : "") + this.damageText, "Fire rate: " + Math.round(1000/this.itemClass.delay, 2), this.itemClass.description]
  }

  get damage() {
    if (this._damage.min && this._damage.max) {
      return Phaser.Math.RND.between(this._damage.min, this._damage.max);
    }

    return this._damage;
  }

  get damageText() {
    if (this._damage.min && this._damage.max) {
      return this._damage.min + "-" + this._damage.max;
    }

    return this._damage;
  }
}

class WeaponProjectile {
  constructor(projectileClass, weaponProjectileClass, weapon) {
    this.projectileClass = projectileClass;
    this.weaponProjectileClass = weaponProjectileClass;
    this.weapon = weapon;
  }

  get key() {
    return this.projectileClass.key;
  }

  get height() {
    return this.projectileClass.height;
  }

  get width() {
    return this.projectileClass.width;
  }

  get tint() {
    return this.weaponProjectileClass.tint;
  }

  get damage() {
    return this.weapon.damage;
  }
}
