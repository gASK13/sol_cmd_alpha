import { default as config } from '../../config/config.js';
import {ShipClass} from './ships/shipClass.mjs';

export class ConfigManager {
  basePath = "../../config/";

  constructor(scene, callback) {
    this.ships = [];
    this.callback = callback;
    this.loading = 0;

    this.loadShips(scene);
  }

  loadShips(scene) {
    for (let ship of config.ships) {
      this.loading++;
      this.loadShip(scene, ship);
    }
  }

  loadShip(scene, ship) {
    import(this.basePath + 'ships/' + ship + '.js')
    .then((module) => {
        let shipClass = new ShipClass(ship, module.default);
        this.loadSpritesheet(shipClass, scene);
        this.ships.push(shipClass);
        this.loading--;
        this.checkIfDone(scene);
    });
  }

  loadSpritesheet(config, scene) {
    scene.load.spritesheet(config.key, config.sprite.image, {
     frameWidth: config.sprite.width,
     frameHeight: config.sprite.height
    });
  }

  checkIfDone(scene) {
    if (this.loading <= 0) {
      this.callback(scene);
    }
  }
}