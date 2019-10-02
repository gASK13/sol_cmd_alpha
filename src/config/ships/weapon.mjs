import { Projectile } from './projectile.mjs';

export class Weapon {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.loadProjectiles(this.id, json);

    //TODO
    this.sprite = json.sprite;
  }

  loadProjectiles(id, json) {
    this.projectiles = [];
    if (json.projectiles) {
      for (var pJson of json.projectiles) {
          this.projectiles.push(new Projectile(id + "." + pJson.id, pJson));
      }
    }
  }

  fire(hardpoint, bullets, pShip) {
    for (let projectile of this.projectiles) {
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

  get key() {
    return this.id;
  }
}
