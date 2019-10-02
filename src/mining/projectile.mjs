export class ProjectileInstance extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
      super(scene, 0, 0, 'dummy');
  }

  spawn(x, y, vx, vy, angle, projectile) {
      this.enableBody(true, x, y, true, true);
      this.body.setVelocity(vx, vy)
      this.body.setSize(1, 21, true);
      this.setRotation(angle);
      this.projectile = projectile;

      this.setTexture(projectile.key);

      this.scene.anims.create({
          key: projectile.key + 'fly',
          frames: this.scene.anims.generateFrameNumbers(projectile.key),
          frameRate: 30,
          repeat: -1,
          repeatDelay: 0
      });
      this.anims.play(projectile.key + 'fly');
      this.body.setSize(projectile.width, projectile.height, true);
  }

  update(time, delta) {
      if (this.active && (this.x < -100 || this.x > 900 || this.y < 0)) {
          this.disableBody(true, true);
      }
  }
}
