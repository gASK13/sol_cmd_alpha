export class ShipLayout extends Phaser.Scene {
  constructor()
  {
      super({ key: 'layout' });
  }

  create(config) {
    this.player = config.player;
    this.configManager = config.configManager;

    // Draw ship
    this.add.sprite(300, 300, this.player.shipInstance.key).setScale(5).setAlpha(0.35);

    // Draw hardpoints
    for(let hardpoint of this.player.shipInstance.shipClass.hardpoints) {
      this.add.image(300 + hardpoint.x, 300 + hardpoint.y, hardpoint.key).setRotation(hardpoint.angle);
    }

    // Draw start button
    var self = this;
    this.add.text(990, 590, "Start Mission").setOrigin(1,1).setFontSize(30).setColor('white').setInteractive()
    .on("pointerup", function() {
      self.scene.start("mining", { player: self.player, configManager: self.configManager});
      self.scene.launch("mining-status", { player: self.player, configManager: self.configManager});
    });

  }
}
