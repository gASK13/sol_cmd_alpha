/*
    Contains SHIP + WEAPON definition

    Will be split soon(ish) - when I figure out how I want to layout the code.

*/
class Weapon {
    constructor(firerate, projectiles) {
        this.firerate = firerate;
        this.projectiles = projectiles;
        this.nextShot = 0;
    }

    fire(bullets, player) {
        if (player.scene.time.now > this.nextShot) {
            this.nextShot = player.scene.time.now + (1000 / this.firerate);
            for (let projectile of this.projectiles) {
                let bullet = bullets.get();
                if (bullet) bullet.spawn(player.x + projectile.x, player.y + projectile.y, projectile.velocityy + player.body.velocity.x, -projectile.velocityx + player.body.velocity.y, projectile.damage);
            }
        }
    }
};

class WeaponDualLaser extends Weapon {
    constructor() {
        super(5, [
                    { x: -16, y: -5, damage: 2, velocityx: 500, velocityy: 0 },
                    { x: 16, y: -5, damage: 2, velocityx: 500, velocityy: 0}
                ]);
    }
};

export class Ship extends Phaser.Physics.Arcade.Sprite {

    constructor(shipClass, scene, x, y) {
        super(scene, x, y, shipClass.getSpriteKey());
        this.shipClass = shipClass;
        scene.physics.add.existing(this);
        scene.add.existing(this);

        scene.anims.create({
            key: shipClass.getSpriteKey() + 'burn',
            frames: scene.anims.generateFrameNumbers(shipClass.getSpriteKey()),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 0
        });

        this.anims.play(shipClass.getSpriteKey() + 'burn');

        this.body.setSize(shipClass.getWidth(), shipClass.getHeight(), true);

        this.health = shipClass.getMaxHealth();

        this.shield = shipClass.getMaxShield();

        this.weapons = [new WeaponDualLaser()];

        this.equipmentChanged();
    }

    absorbDamage(damage) {
        let dmg = damage;

        if (this.shield > 0) {
            dmg -= this.shield;
            this.shield = dmg < 0 ? -dmg : 0;
            this.nextRecharge = this.scene.time.now + (this.shield == 0 ? this.shipClass.getShieldRestart() : this.shipClass.getShieldRecharge());
        }

        if (dmg > 0) {
            this.health -= dmg;
        }

        return this.health > 0;
    }

    equipmentChanged() {
        this.setDrag(this.getDrag()).setDamping(true).setMaxVelocity(this.getMaxSpeed());
    }

    update(time, delta) {
        if (this.scene.time.now > this.nextRecharge && this.shield < this.shipClass.getMaxShield()) {
            this.shield++;
            this.nextRecharge = this.scene.time.now + this.shipClass.getShieldRecharge();
            this.scene.scene.get("mining-status").update();
        }
    }

    getThrust() {
        return this.shipClass.getThrust();
    }

    getMaxSpeed() {
        return this.shipClass.getMaxSpeed();
    }

    getMaxHealth() {
      return this.shipClass.getMaxHealth();
    }

    getMaxShield() {
      return this.shipClass.getMaxShield();
    }

    getDrag () {
        return 0.975;
    }

    fire(bullets) {
        for (let weapon of this.weapons) {
            weapon.fire(bullets, this);
        }
    }
};
