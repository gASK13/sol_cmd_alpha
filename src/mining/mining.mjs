import {Ship} from './ship.mjs';

// Mining scene
export class Mining extends Phaser.Scene {

    constructor()
    {
        super({ key: 'mining'});
    };

    create(config)
    {
        // Config
        this.player = config.player;
        this.configManager = config.configManager;

        // Set world bounds
        this.physics.world.setBounds(0,0,800,600);
        this.physics.world.setBoundsCollision(true, true, true, true);

        // CREATE PLAYER
        this.pShip = new Ship(this.player.shipInstance, this, 400, 500);
        this.pShip.setCollideWorldBounds(true);
        this.pShip.body.onWorldBounds = true;
        this.pShip.setMass(1);
        this.pShip.setBounce(1);
        let ps_closure = this.pShip;
        this.physics.world.on('worldbounds', function(body){
            if (body === ps_closure.body) {
                if (body.x <= 0 || body.x >= 750) { body.setVelocity(0, body.velocity.y); }
                if (body.y <= 0 || body.y >= 500) { body.setVelocity(body.velocity.x ,0); }
            }
        },this);

        // BULLETS
        this.pBullets = this.physics.add.group({
            classType: Projectile,
            maxSize: 150,
            runChildUpdate: true
        });

        // ASTEROIDS
        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            maxSize: 150,
            runChildUpdate: true
        });

        // COINS
        this.coins = this.physics.add.group({
            classType: CoinPayout,
            maxSize: 150,
            runChildUpdate: true
        });

        this.physics.add.collider(this.pBullets, this.asteroids, null, this.hitAss, this);
        this.physics.add.collider(this.pShip, this.asteroids, this.hitPlayer, null, this);
        this.physics.add.collider(this.pShip, this.coins, null, this.collect, this);
        this.physics.add.collider(this.asteroids, this.asteroids, null, null, this);

        // CATCH INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Anims
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('coin'),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 0
        });
    }

    hitAss(bullet, ass) {
        ass.applyDamage(bullet, this);
        return false;
    }

    collect(ship, coin) {
        coin.collect(ship, this.player);
        this.scene.get("mining-status").update();
        return false;
    }

    hitPlayer(ship, ass) {
        if (ship.absorbDamage(ass.health)) {
            this.scene.get("mining-status").update();
            ass.applyDamage(null, this);
        } else {
            this.scene.stop("mining-status");
            this.scene.start("menu", { configManager: this.configManager });
        }
    }

    update() {
        this.pShip.update()

        // HANDLE PLAYER MOVEMENT
        this.pShip.setAccelerationY(0);
        this.pShip.setAccelerationX(0);

        if (this.cursors.up.isDown) {
            this.pShip.setAccelerationY(-this.pShip.thrust);
        } else if (this.cursors.down.isDown) {
            this.pShip.setAccelerationY(this.pShip.thrust);
        }
        if (this.cursors.left.isDown) {
            this.pShip.setAccelerationX(-this.pShip.thrust);
        } else if (this.cursors.right.isDown) {
            this.pShip.setAccelerationX(this.pShip.thrust);
        }

        // HANDLE SHOOTING
        if (this.cursors.space.isDown) {
            this.pShip.fire(this.pBullets);
        }

        // SPAWN ASTEROIDS
        if (Phaser.Math.RND.frac() > 0.95) {
        //if (this.cursors.shift.isDown) {
            let nAss = this.asteroids.get();
            if (nAss) nAss.spawn(Phaser.Math.RND.between(-150,950), -100, Phaser.Math.RND.between(-100,100), Phaser.Math.RND.between(10,350), Phaser.Math.RND.between(-150,150), basicAssConfig, Phaser.Math.RND.between(0,2));
        }
    }
};


export class MiningStatus extends Phaser.Scene {

    constructor()
    {
        super({ key: 'mining-status' });
    }

    create(config) {
        this.player = config.player;
        this.configManager = config.configManager;

        this.pShip = this.scene.get("mining").pShip;

        this.add.image(800, 0, 'status_bck').setOrigin(0,0);
        this.healthBar = this.add.image(822, 62, 'health').setOrigin(0,0);
        this.shieldBar = this.add.image(822, 90, 'shield').setOrigin(0,0);

        this.credits = this.add.text(820, 112, 'Credits: ' + this.player.credits).setOrigin(0, 0).setFontSize(12);
    }

    update() {
        this.updateCoins();
        this.updateHealth();
    }

    updateCoins() {
        this.credits.setText("Credits: " + this.player.credits);
    }

    updateHealth() {
        if (this.pShip) { //don't update when ship is not there yet
            this.healthBar.setCrop(0, 0, 156*(this.pShip.health / this.pShip.maxHealth), 16);
            this.shieldBar.setCrop(0, 0, 156*(this.pShip.shield / this.pShip.maxShield), 16);
        }
    }
}


/** TEMPORARY CODE TO BE REMOVED **/
var basicAssConfig = {
    stages: [
        {
            key: "ass_1",
            health: 2,
            mass: 0.3,
            payout: [{ type: "coin", min: 1, max: 3}]
        },
        {
            key: "ass_2",
            health: 6,
            mass: 0.8,
            payout: [{ type: "coin", min: 1, max: 2}]
        },
        {
            key: "ass_3",
            health: 12,
            mass: 2,
            payout: [{ type: "coin", min: 1, max: 1}]
        }
    ]
};

class CoinPayout extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, "coin");
        this.anims.play('rotate');
    }

    spawn(x, y) {
        this.anims.setProgress(Phaser.Math.RND.between(0,100) / 100);
        this.anims.setTimeScale(Phaser.Math.RND.between(50,150) / 100);
        this.enableBody(true, x, y, true, true);
        this.body.setVelocity(Phaser.Math.RND.between(-50,50), Phaser.Math.RND.between(-15,85));
        this.setDrag(0.98).setDamping(true)
    }

    collect(ship, player) {
        player.credits += 1;
        this.disableBody(true, true);
    }

    update(time, delta) {
        if (this.body.velocity.x == 0 && this.body.velocity.y < 20 && this.body.velocity.y >= 0) {
            this.setDrag(0);
        }

        if (this.body.velocity.y >= 0 && this.body.velocity.y < 20) {
            this.setAccelerationY(1);
        }

        if (this.body.velocity.y >= 20) {
            this.setAccelerationY(0);
        }
    }
}

// Bullet class
class Projectile extends Phaser.Physics.Arcade.Sprite{

    constructor(scene) {
        super(scene, 0, 0, 'laser');
        this.damage;
    }

    spawn(x, y, vx, vy, damage) {
        this.enableBody(true, x, y, true, true);
        this.body.setVelocity(vx, vy)
        this.body.setSize(1, 21, true);
        this.damage = damage;
    }

    update(time, delta) {
        if (this.active && (this.x < -100 || this.x > 900 || this.y < 0)) {
            this.disableBody(true, true);
        }
    }
};

class Asteroid extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {
        super(scene, 0, 0, 'ass_2');
    }

    spawn(x, y, vx, vy, rot, config, stage) {
        this.config = config;
        this.switchStage(stage);
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx/(stage+1), vy/(stage+1));
        this.setAngularVelocity(rot/(stage+1));
        this.health = this.config.stages[stage].health;
        this.payout = this.config.stages[stage].payout;
        this.setBounce(1);
        this.setMass(this.config.stages[stage].mass);
    }

    switchStage(stage) {
        this.stage = stage;
        this.setTexture(this.config.stages[stage].key);
        this.body.setSize(this.frame.width, this.frame.height, true);
        this.setMass(this.config.stages[stage].mass);
    }

    update(time, delta) {
        if (this.active && (this.y > 700 || this.x > 1000 || this.x < -200 || this.y < -200)) {
            this.disableBody(true, true);
        }
    }

    applyDamage(bullet, scene) {
        if (bullet) {
            this.health -= bullet.damage;
            bullet.disableBody(true, true);
        } else {
            this.health = 0;
        }

        if (this.health <= 0) {
            this.spawnPayout(scene, 0);
            this.disableBody(true, true);
        } else if (this.stage > 0 && this.config.stages[this.stage - 1].health > this.health) {
            for(let i = 0; i < this.stage; i++) {
                if (this.config.stages[i].health > this.health) {
                    this.spawnPayout(scene, i);
                    this.switchStage(i);
                    return;
                }
            }
        }
    }

    spawnPayout(scene, toStage) {
        for (let i = toStage; i <= this.stage; i++) {
            for (let payout of this.config.stages[i].payout) {
                if(payout.type == 'coin') {
                    let amount = Phaser.Math.RND.between(payout.min, payout.max);
                    for (let i = 0; i < amount; i++) {
                        let coin = scene.coins.get();
                        coin.spawn(this.x, this.y);
                    }
                }
            }
        }
    }
};
/** END OF TEMPORARY CODE TO BE REMOVED **/
