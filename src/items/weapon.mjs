import {Item} from './item.mjs';
export class Weapon extends Item {
  constructor(itemClass) {
    super(itemClass);
  }

  fire(hardpoint, bullets, pShip) {
    for (let projectile of this.itemClass.projectiles) {
      if (!pShip.timers[hardpoint.id + projectile.id] || pShip.timers[hardpoint.id + projectile.id] < pShip.scene.time.now ) {
        let bullet = bullets.get();
        if (bullet) bullet.spawn(
            pShip.x + hardpoint.portX,
            pShip.y + hardpoint.portY,
            pShip.body.velocity.x + this.getVelocityXModifier(hardpoint.angle) * projectile.velocity,
            pShip.body.velocity.y + projectile.velocity * this.getVelocityYModifier(hardpoint.angle),
            hardpoint.angle,
            projectile);
        pShip.timers[hardpoint.id + projectile.id] = pShip.scene.time.now + projectile.delay;
      }
    }
  }

  getVelocityXModifier(angle) {
    return Math.sin(angle);
  }

  getVelocityYModifier(angle) {
    return -Math.cos(angle);
  }
}
