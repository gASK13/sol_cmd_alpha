class Weapon {
    constructor(firerate, projectiles) {
        this.firerate = firerate;
        this.projectiles = projectiles;
        this.nextShot = 0;
    }
    
    fire(bullets, player, game) {
        if (game.time.now > this.nextShot) {
            this.nextShot = game.time.now + (1000 / this.firerate); 
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
                    { x: -16, y: -5, damage: 1, velocityx: 500, velocityy: 0 }, 
                    { x: 16, y: -5, damage: 1, velocityx: 500, velocityy: 0} 
                ]);
    }                     
};

class Ship extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'ships');
        scene.physics.add.existing(this);
        scene.add.existing(this);
        
        scene.anims.create({
            key: 'burn',
            frames: scene.anims.generateFrameNumbers('ships', { start: 0, end: 3, first: 0 }),
            frameRate: 30,
            repeat: -1,
            repeatDelay: 0
        });
        this.anims.play('burn');         

        this.body.setSize(44, 50, true);           
        
        this.health = 100;
        
        this.weapons = [new WeaponDualLaser()];
        
        this.equipmentChanged();
    }        
    
    equipmentChanged() {
        this.setDrag(this.getDrag()).setDamping(true).setMaxVelocity(this.getMaxSpeed());
    }
    
    update(time, delta) {
        // RESERVED for FUTURE
    }
    
    getThrust() {
        return 100;
    }
    
    getMaxSpeed() {
        return 1500;
    }
    
    getDrag () {
        return 0.95;
    }
    
    getHealth() {
        return this.health;    
    }
    
    fire(bullets, game) {
        for (let weapon of this.weapons) {
            weapon.fire(bullets, this, game);
        }
    }    
};




