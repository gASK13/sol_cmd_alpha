// IDEAS:
// - display side bar (health / weapons)
// - asteroids fast collisions break asteroids
// - asteroids/player SLOW collisions just "nudge" player
// - player deflector shield
// - score
// - coins
// variable thrust ("FLAMEON")

var basicAssConfig = {
    stages: [
        {
            key: "ass_1",
            health: 1
        },
        {   
            key: "ass_2",
            health: 3
        },
        {
            key: "ass_3",
            health: 6
        }
    ]
};

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
            this.setActive(false);
            this.setVisible(false);
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
    }
    
    switchStage(stage) {
        this.stage = stage;
        this.setTexture(this.config.stages[stage].key);        
        this.body.setSize(this.frame.width, this.frame.height, true);
    }
    
    update(time, delta) {
        if (this.active && (this.y > 700 || this.x > 1000 || this.x < -200 || this.y < -200)) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
    
    applyDamage(bullet) {
        this.health -= bullet.damage;
        bullet.disableBody(true, true);
        if (this.health < 0) {
            this.disableBody(true, true);
        } else if (this.stage > 0 && this.config.stages[this.stage - 1].health > this.health) {
            this.switchStage(this.stage - 1);
        }
    }
};

// Assteroid class

// Mining scene
class Mining extends Phaser.Scene {
    
    constructor()
    {
        super({ key: 'mining'});
    };
    
    
    preload()
    {
        // LOAD PLAYER
        this.load.spritesheet('ships', 'assets/ships.png', {
    	   frameWidth: 66,
    	   frameHeight: 66
        });
        
        // LOAD LSR
        this.load.image('laser', 'assets/lsr.png');
        
        // LOAD AS(S)
        this.load.image('ass', 'assets/ass.png');
        this.load.image('ass_1', 'assets/ass_1.png');
        this.load.image('ass_2', 'assets/ass_2.png');
        this.load.image('ass_3', 'assets/ass_3.png');
    }
    
    create()
    {
        // Set world bounds
        this.physics.world.setBounds(0,0,800,600);
        this.physics.world.setBoundsCollision(true, true, true, true);
        
        // CREATE PLAYER
        this.player = new Ship(this, 400, 500);
        this.player.setCollideWorldBounds(true);        
        
        // BULLETS
        this.pBullets = this.physics.add.group({
            classType: Projectile,
            maxSize: 50,
            runChildUpdate: true
        });
        
        // ASTEROIDS
        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            maxSize: 50,
            runChildUpdate: true
        });
        this.physics.add.collider(this.pBullets, this.asteroids, null, this.hitAss, this);
        this.physics.add.collider(this.player, this.asteroids, this.hitPlayer, null, this);
        this.physics.add.collider(this.asteroids, this.asteroids, null, null, this);
        
        // CATCH INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);             
    }
    
    hitAss(bullet, ass) {
        ass.applyDamage(bullet);
        return false;
    }
    
    hitPlayer(player, ass) {
        if (player.absorbDamage(ass.health)) {
            this.scene.get("mining-status").updateHealth(player.getHealth() / player.getMaxHealth());
            ass.disableBody(true, true);
        } else {
            this.scene.stop("mining-status");
            this.scene.start("menu");
        }
    }
        
    update() {
        // HANDLE PLAYER MOVEMENT
        this.player.setAccelerationY(0);
        this.player.setAccelerationX(0);
        
        if (this.cursors.up.isDown) {
            this.player.setAccelerationY(-this.player.getThrust());
        } else if (this.cursors.down.isDown) {
            this.player.setAccelerationY(this.player.getThrust());
        }    
        if (this.cursors.left.isDown) {
            this.player.setAccelerationX(-this.player.getThrust());
        } else if (this.cursors.right.isDown) {
            this.player.setAccelerationX(this.player.getThrust());
        }
        
        // HANDLE SHOOTING
        if (this.cursors.space.isDown) {
            this.player.fire(this.pBullets, this);
        }
        
        // SPAWN ASTEROIDS
        if (Phaser.Math.RND.frac() > 0.95) {
        //if (this.cursors.shift.isDown) {
            let nAss = this.asteroids.get();
            if (nAss) nAss.spawn(Phaser.Math.RND.between(-150,950), -100, Phaser.Math.RND.between(-100,100), Phaser.Math.RND.between(10,350), Phaser.Math.RND.between(-150,150), basicAssConfig, Phaser.Math.RND.between(0,2));
        }
    }
};


class MiningStatus extends Phaser.Scene {
    
    constructor()
    {
        super({ key: 'mining-status' });
    }
    
    preload() {
        this.load.image('status_bck', 'assets/status.png');
        this.load.image('health', 'assets/health.png');
    }
    
    create() {
        this.add.image(800, 0, 'status_bck').setOrigin(0,0);
        this.healthBar = this.add.image(822, 62, 'health').setOrigin(0,0);
    }
    
    update() {
        
    }
    
    updateHealth(percent) {
        console.log(percent);
                
        this.healthBar.setCrop(0, 0, 156*percent, 16);
    }
    
}
