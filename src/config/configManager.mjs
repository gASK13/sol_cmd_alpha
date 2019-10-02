import { default as config } from '../../config/config.js';
import {ShipClass} from './ships/shipClass.mjs';
import {Weapon} from './ships/weapon.mjs';

export class ConfigManager {
  basePath = "../../config/";

  constructor(scene, callback) {
    this.callback = callback;
    this.loading = 0;

    this.loadShips(scene);
    this.loadWeapons(scene);
  }

  loadWeapons(scene) {
    this.weapons = {};
    for (let weapon of config.weapons) {
      this.loading++;
      this.loadWeapon(scene, weapon);
    }
  }

  loadWeapon(scene, weapon) {
    import(this.basePath + 'weapons/' + weapon + '.js')
    .then((module) => {
        let wpClass = new Weapon(module.default);
        this.loadSpritesheet(wpClass, scene);
        for(var projClass of wpClass.projectiles) {
          this.loadSpritesheet(projClass, scene);
        }
        this.weapons[weapon] = wpClass;
        this.loading--;
        this.checkIfDone(scene);
    });
  }

  loadShips(scene) {
    this.ships = {};
    for (let ship of config.ships) {
      this.loading++;
      this.loadShip(scene, ship);
    }
  }

  loadShip(scene, ship) {
    import(this.basePath + 'ships/' + ship + '.js')
    .then((module) => {
        let shipClass = new ShipClass(module.default);
        this.loadSpritesheet(shipClass, scene);
        this.ships[shipClass.id] = shipClass;
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
      console.log(this);
    }
  }
}
