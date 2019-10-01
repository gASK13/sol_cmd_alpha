export class Weapon {
  constructor(key, json) {
    // TODO TBB!
    this.delay = 200;
    this.damage = 2;
    this.velocity = 500;
  }

  fire(hardpoint, bullets, pShip) {
    if (!pShip.timers[hardpoint.id] || pShip.timers[hardpoint.id] < pShip.scene.time.now ) {
      let bullet = bullets.get();
      if (bullet) bullet.spawn(
          pShip.x + hardpoint.portX,
          pShip.y + hardpoint.portY,
          pShip.body.velocity.x + this.getVelocityXModifier(hardpoint.angle) * this.velocity,
          this.velocity * this.getVelocityYModifier(hardpoint.angle) + pShip.body.velocity.y,
          this.damage,
          hardpoint.angle);
      pShip.timers[hardpoint.id] = pShip.scene.time.now + this.delay;
    }
  }

  getVelocityXModifier(angle) {
    return Math.sin(angle);
  }

  getVelocityYModifier(angle) {
    return -Math.cos(angle);
  }
}
