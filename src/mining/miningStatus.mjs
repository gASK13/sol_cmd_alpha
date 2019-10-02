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
