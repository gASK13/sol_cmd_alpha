/*
    Contains SHIP + WEAPON definition

    Will be split soon(ish) - when I figure out how I want to layout the code.

*/
export class Ship extends Phaser.Physics.Arcade.Sprite {

    constructor(shipInstance, scene, x, y) {
        super(scene, x, y, shipInstance.key);
        this.shipInstance = shipInstance;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        scene.anims.create({
            key: shipInstance.key + 'burn',
            frames: scene.anims.generateFrameNumbers(shipInstance.key),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 0
        });
        this.anims.play(shipInstance.key + 'burn');
        this.body.setSize(shipInstance.width, shipInstance.height, true);
        this.health = shipInstance.maxHealth;
        this.shield = shipInstance.maxShield;

        // TODO refactor?
        this.timers = {};
        this.setDrag(0.975).setDamping(true).setMaxVelocity(this.shipInstance.maxSpeed);
    }

    absorbDamage(damage) {
        let dmg = damage;

        if (this.shield > 0) {
            dmg -= this.shield;
            this.shield = dmg < 0 ? -dmg : 0;
            this.nextRecharge = this.scene.time.now + (this.shield == 0 ? this.shipInstance.shieldRestart : this.shipInstance.shieldRecharge);
        }

        if (dmg > 0) {
            this.health -= dmg;
        }

        return this.health > 0;
    }

    update(time, delta) {
        if (this.scene.time.now > this.nextRecharge && this.shield < this.shipInstance.maxShield) {
            this.shield++;
            this.nextRecharge = this.scene.time.now + this.shipInstance.shieldRecharge;
            this.scene.scene.get("mining-status").update();
        }
    }

    get maxHealth() {
      return this.shipInstance.maxHealth;
    }

    get maxShield() {
      return this.shipInstance.maxShield;
    }

    get thrust() {
      return this.shipInstance.thrust;
    }

    fire(bullets) {
      for (let hardpoint of this.shipInstance.shipClass.hardpoints) {
        if (hardpoint.constructor.name == 'WeaponHardpoint' && this.shipInstance.loadout[hardpoint.id]) {
          this.shipInstance.loadout[hardpoint.id].fire(hardpoint, bullets, this);
        }
      }
    }
};
