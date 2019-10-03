export class ProjectileInstance extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
      super(scene, 0, 0, 'dummy');
  }

  spawn(x, y, vx, vy, angle, weaponProjectile) {
      this.enableBody(true, x, y, true, true);
      this.body.setVelocity(vx, vy)
      this.body.setSize(1, 21, true);
      this.setRotation(angle);
      this.weaponProjectile = weaponProjectile;

      this.setTexture(weaponProjectile.key);
      if (weaponProjectile.tint) this.setTint(weaponProjectile.tint);

      this.scene.anims.create({
          key: weaponProjectile.key + 'fly',
          frames: this.scene.anims.generateFrameNumbers(weaponProjectile.key),
          frameRate: 30,
          repeat: -1,
          repeatDelay: 0
      });
      this.anims.play(weaponProjectile.key + 'fly');
      this.body.setSize(weaponProjectile.width, weaponProjectile.height, true);
  }

  update(time, delta) {
      if (this.active && (this.x < -100 || this.x > 900 || this.y < 0)) {
          this.disableBody(true, true);
      }
  }

  get damage() {
    return this.weaponProjectile.damage;
  }
}
