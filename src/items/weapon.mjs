import {Item} from './item.mjs';

export class Weapon extends Item {
  constructor(itemClass, configManager) {
    super(itemClass, configManager);
    this.projectiles = [];
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
            pShip.body.velocity.x + this.getVelocityXModifier(hardpoint.angle) * this.itemClass.velocity,
            pShip.body.velocity.y + this.getVelocityYModifier(hardpoint.angle) * this.itemClass.velocity,
            hardpoint.angle,
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
    return this.weapon.itemClass.damage;
  }
}
