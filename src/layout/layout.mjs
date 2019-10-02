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
    this.hardpoints = [];
    for(let hardpoint of this.player.shipInstance.shipClass.hardpoints) {
      var hp = this.add.sprite(300 + hardpoint.x, 300 + hardpoint.y, hardpoint.key).setRotation(hardpoint.angle);
      hp.hardpoint = hardpoint;
      this.hardpoints.push(hp);
    }

    // Draw start button
    var self = this;
    this.add.text(990, 590, "Start Mission").setOrigin(1,1).setFontSize(30).setColor('white').setInteractive()
    .on("pointerup", function() {
      self.scene.start("mining", { player: self.player, configManager: self.configManager});
      self.scene.launch("mining-status", { player: self.player, configManager: self.configManager});
    });

    // Draw inventory
    this.add.text(900, 100, "INVENTORY").setOrigin(0.5, 0.5).setFontSize(20).setColor('white');
    this.add.text(900, 120, "Drag & Drop").setOrigin(0.5, 0.5).setFontSize(10).setColor('white');

    var sy = 150;
    for (var item of this.player.inventory) {
      let self = this;
      var spr = this.add.sprite(900, sy, item.key).setInteractive();
      spr.item = item;
      this.input.setDraggable(spr);
      this.input.on('dragstart' , function(pointer, object) {
        object.originalX = object.x;
        object.originalY = object.y;
        object.originalA = object.rotation;
        object.setRotation(0);
      });
      this.input.on('drag' , function(pointer, object, x, y) {
        object.x = x;
        object.y = y;
        object.setRotation(object.originalA);
        object.setTint(0xffffff);
        for (var hp of self.hardpoints) {
          console.log(x + "/" + y);
          if(hp.getBounds().contains(x,y)) {
            if (hp.hardpoint.constructor.name == 'WeaponHardpoint' && hp.hardpoint.maxClass >= object.item.class) {
              object.x = hp.x;
              object.y = hp.y;
              object.setRotation(hp.hardpoint.angle);
              object.setTint(0x00ff00);
            } else {
              object.setTint(0xff0000);
            }
          }
        }
      });
      this.input.on('dragend' , function(pointer, object) {
        object.setTint(0xffffff);
        for (var hp of self.hardpoints) {
          if(hp.getBounds().contains(object.x,object.y)) {
            if (hp.hardpoint.constructor.name == 'WeaponHardpoint' && hp.hardpoint.maxClass >= object.item.class) {
              object.x = hp.x;
              object.y = hp.y;
              object.setRotation(hp.hardpoint.angle);
              self.player.shipInstance.loadout[hp.hardpoint.id] = object.item;
              return;
            }
          }
        }
        object.x = object.originalX;
        object.y = object.originalY;
      });
      sy += 50;
    }
  }
}
