import {Player} from './player.mjs';
import {ConfigManager} from './configManager.mjs';

/*
    Menu class - placeholder for now, so I can prove I can do it.
*/
export class Menu extends Phaser.Scene {

    constructor()
    {
        super({ key: 'menu' });
    }

    preload() {

      var text = this.add.text(500, 100, 'SOL COMMAND');
      text.setOrigin(0.5, 0.5);
      text.setFontSize(60);
      text.setColor("red");
      text.setFontStyle("bold");

      text = this.add.text(500, 150, 'ALPHA');
      text.setOrigin(0.5, 0.5);
      text.setFontSize(20);
      text.setColor("red");

      this.loadingText = this.add.text(500, 300, 'Loading...');
      this.loadingText.setOrigin(0.5, 0.5);
      this.loadingText.setFontSize(30);
      this.loadingText.setColor("blue");

      // LOAD LSR
      this.load.image('laser', 'assets/lsr.png');

      // LOAD AS(S)
      this.load.image('ass', 'assets/ass.png');
      this.load.image('ass_1', 'assets/ass_1.png');
      this.load.image('ass_2', 'assets/ass_2.png');
      this.load.image('ass_3', 'assets/ass_3.png');

      // MENU
      this.load.image('status_bck', 'assets/status.png');
      this.load.image('health', 'assets/health.png');
      this.load.image('shield', 'assets/shield.png');

      // Coins
      this.load.spritesheet("coin", "assets/coin.png", {
          frameWidth: 16,
          frameHeight: 16
      });

      // Load configs
      this.configManager = new ConfigManager(this, this.loadingFinished);
    }

    loadingFinished(self)
    {
      self.time.delayedCall(1000, self.showNewGameSelection, null, self);
    }

    showNewGameSelection() {
        this.loadingText.setVisible(false);

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
