import {ConfigManager} from '../config/configManager.mjs';

export class Preload extends Phaser.Scene {
  constructor() {
      super({ key: 'preload' });
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

    // Load hardpoint images
    this.load.image('w1', 'assets/w1.png');
    this.load.image('w2', 'assets/w2.png');
    this.load.image('h1', 'assets/h1.png');
  }

  loadingFinished(self) {
    self.time.delayedCall(1000, self.showMenu, null, self);
  }

  showMenu() {
    this.scene.start("menu", { configManager: this.configManager});
  }
}
