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
        
        this.health = 8;
        this.maxHealth = 8;
        this.credits = 0;
        
        this.maxShield = 8;
        this.shield = 8;
        this.shieldRecharge = 500;    
        this.shieldInitialRecharge = 2500;
        
        this.weapons = [new WeaponDualLaser()];
        
        this.equipmentChanged();
    }        
    
    absorbDamage(damage) {
        let dmg = damage;
        
        if (this.shield > 0) {
            dmg -= this.shield;
            this.shield = dmg < 0 ? -dmg : 0;                          
            this.nextRecharge = this.scene.time.now + (this.shield == 0 ? this.shieldInitialRecharge : this.shieldRecharge);            
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
        if (this.scene.time.now > this.nextRecharge && this.shield < this.maxShield) {
            this.shield++;
            this.nextRecharge = this.scene.time.now + this.shieldRecharge;     
            this.scene.scene.get("mining-status").updateHealth(this);    
        }
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
    
    fire(bullets) {
        for (let weapon of this.weapons) {
            weapon.fire(bullets, this);
        }
    }    
};




