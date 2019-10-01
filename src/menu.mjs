import {Player} from './player.mjs';

/*
    Menu class - placeholder for now, so I can prove I can do it.
*/
export class Menu extends Phaser.Scene {

    constructor()
    {
        super({ key: 'menu' });
    }

    create(config) {

        this.configManager = config.configManager;

        var text = this.add.text(500, 100, 'SOL COMMAND');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(60);
        text.setColor("red");
        text.setFontStyle("bold");

        text = this.add.text(500, 150, 'ALPHA');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(20);
        text.setColor("red");

        var text = this.add.text(500, 300, 'Start New Game');
        text.setOrigin(0.5, 0.5);
        text.setFontSize(30);

        let sx = 450;
        let sy = 400;
        let self = this;
        for (let shp of this.configManager.ships) {
            this.add.sprite(sx, sy, shp.getSpriteKey()).setInteractive().on("pointerup", function() {
                let player = new Player(0);
                self.scene.start("mining", { player: player, configManager: self.configManager, shipClass: shp});
                self.scene.launch("mining-status", { player: player, configManager: self.configManager});
            });
            sx += 100
        }
    }
};
