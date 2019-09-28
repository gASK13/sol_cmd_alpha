import 'phaser';

// IDEAS:
// - weapons (yay!)
// - player deflector shield
// - main menu
// - health bar
// - score
// - coins

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

var weapon_dual_laser = {
    firerate: 5,
    lastFired: 0,
    projectiles: [ 
                    { x: -16, y: -5, damage: 1, velocityx: 0, velocityy: 5 }, 
                    { x: 16, y: -5, damage: 1, velocityx: 0, velocityy: 5} 
                ],
    fire : function(bullets, player, game) {
        if (game.time.now > this.lastFired) {
            this.lastFired = game.time.now + (1000 / this.firerate); 
            for (let projectile of this.projectiles) {
                let bullet = bullets.get();
                if (bullet) bullet.spawn(player.x + projectile.x, player.y + projectile.y, projectile.velocityx + player.vel.x, -projectile.velocityy + player.vel.y, projectile.damage);
            }                
        }
    } 
}

// Bullet class
var Projectile = new Phaser.Class({
    Extends: Phaser.Physics.Impact.Sprite,
    
    initialize:
    
    function Projectile(scene) {
        Phaser.Physics.Impact.Sprite.call(this, scene.impact.world, 0, 0, 'laser');
        this.damage;
    },
    
    spawn: function(x, y, vx, vy, damage) {
        //this.setSize(1, 21);
        this.setPosition(x,y);
        this.setActive(true);
        this.setVisible(true);
        //this.setVelocity(vx, vy);              
        this.damage = damage;    
    },
    
    update: function(time, delta) {
        if (this.active && (this.x < 0 || this.x > 800 || this.y < 0)) {
            this.setActive(false);
            this.setVisible(false);
        }
    }        
});

var Asteroid = new Phaser.Class({
    Extends: Phaser.Physics.Impact.Sprite,
    
    initialize:
    
    function Asteroid(scene) {
        Phaser.Physics.Impact.Sprite.call(this, scene.impact.world, 0, 0, 'ass_2');
    },
    
    spawn: function(x, y, vx, vy, rot, config, stage) {
        this.config = config;
        this.switchStage(stage);
        this.setPosition(x,y);
        this.setActive(true);
        this.setVisible(true);
        //this.enableBody(true, x, y, true, true);    
        this.setVelocity(vx/(stage+1), vy/(stage+1));
        this.setRotation(rot/(stage+1));
        this.health = this.config.stages[stage].health;
        this.setTypeB().setCheckAgainstA().setActiveCollision();        
    },
    
    switchStage : function(stage) {
        this.stage = stage;
        this.setTexture(this.config.stages[stage].key);        
        this.setSize(this.frame.width, this.frame.height);
    },
    
    update: function(time, delta) {
        if (this.active && (this.y > 700 || this.x > 1000 || this.x < -200 || this.y < -200)) {
            this.setActive(false);
            this.setVisible(false);
        }
    },
    
    applyDamage: function(bullet) {
        this.health -= bullet.damage;
        bullet.disableBody(true, true);
        if (this.health < 0) {
            this.disableBody(true, true);
        } else if (this.stage > 0 && this.config.stages[this.stage - 1].health > this.health) {
            this.switchStage(this.stage - 1);
        }
    }
});

// Assteroid class

// Mining scene
var Mining = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function Mining ()
    {
        Phaser.Scene.call(this, { key: 'mining' });
    },
    
    
    preload : function ()
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
    },
    
    create : function()
    {
        // CREATE PLAYER
        this.player = this.impact.add.sprite(400, 300, 'ships');
        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('ships', { start: 0, end: 3, first: 0 }),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 0
        });
        this.player.anims.play('burn');    
        //this.player.setDrag(0.95).setDamping(true).setMaxVelocity(1500);
        this.player.setSize(44, 50);
        //this.impact.world.setBoundsCollision(true, true, true, true);
        //this.player.setCollideWorldBounds(true);
        this.player.weapon = weapon_dual_laser;
        this.player.setTypeA().setCheckAgainstB().setActiveCollision();
        
        // BULLETS
        this.pBullets = this.add.group({
            classType: Projectile,
            maxSize: 50,
            runChildUpdate: true
        });
        
        // ASTEROIDS
        this.asteroids = this.add.group({
            classType: Asteroid,
            maxSize: 50,
            runChildUpdate: true
        });
        //this.impact.add.collider(this.pBullets, this.asteroids, null, this.hitAss, this);
        //this.impact.add.collider(this.player, this.asteroids, this.hitPlayer, null, this);
        //this.impact.add.collider(this.asteroids, this.asteroids, null, null, this);
        
        // CATCH INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);             
    },
    
    hitAss : function(bullet, ass) {
        ass.applyDamage(bullet);
        return false;
    },
    
    hitPlayer: function(player, ass) {
        // na dah
    },
        
    update: function() {
        // HANDLE PLAYER MOVEMENT
        this.player.setAccelerationY(0);
        this.player.setAccelerationX(0);
        if (this.cursors.up.isDown) {
            this.player.setAccelerationY(-100);
        } else if (this.cursors.down.isDown) {
            this.player.setAccelerationY(100);
        }    
        if (this.cursors.left.isDown) {
            this.player.setAccelerationX(-100);
        } else if (this.cursors.right.isDown) {
            this.player.setAccelerationX(100);
        }
        
        // HANDLE SHOOTING
        if (this.cursors.space.isDown && this.player.weapon) {
            this.player.weapon.fire(this.pBullets, this.player, this);
        }
        
        // SPAWN ASTEROIDS
        if (Phaser.Math.RND.frac() > 0.95) {
        //if (this.cursors.shift.isDown) {
            let nAss = this.asteroids.get();
            if (nAss) nAss.spawn(Phaser.Math.RND.between(-150,950), -100, Phaser.Math.RND.between(-100,100), Phaser.Math.RND.between(10,350), Phaser.Math.RND.between(-150,150), basicAssConfig, Phaser.Math.RND.between(0,2));
        }
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'impact',
        impact: {
            gravity: false,
            debug: true            
        }
    },
    scene: [Mining]
};

var game = new Phaser.Game(config);