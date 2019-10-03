import { default as config } from '../../config/config.js';
import { ShipClass } from './ships/shipClass.mjs';
import { ItemClass } from './ships/itemClass.mjs';
import { WeaponClass } from './ships/weaponClass.mjs';
import { ProjectileClass } from './ships/projectileClass.mjs';

export class ConfigManager {
  basePath = "../../config/";

  constructor(scene, callback) {
    this.callback = callback;
    this.loading = 0;

    this.loadProjectiles(scene);
    this.loadShips(scene);
    this.loadWeapons(scene);
    this.loadItems(scene);
  }

  loadProjectiles(scene) {
    this.projectiles = {};
    for (let proj of config.projectiles) {
      this.loading++;
      this.loadProjectile(scene, proj);
    }
  }

  loadItems(scene) {
    this.items = {};
    for (let item of config.items) {
      this.loading++;
      this.loadItem(scene, item);
    }
  }

  loadWeapons(scene) {
    this.weapons = {};
    for (let weapon of config.weapons) {
      this.loading++;
      this.loadWeapon(scene, weapon);
    }
  }

  loadWeapon(scene, weapon) {
    import(this.basePath + 'items/weapons/' + weapon + '.js')
    .then((module) => {
        let wpClass = new WeaponClass(module.default);
        this.loadSpritesheet(wpClass, scene);
        this.weapons[wpClass.id] = wpClass;
        this.loading--;
        this.checkIfDone(scene);
    });
  }

  loadItem(scene, item) {
    import(this.basePath + 'items/' + item + '.js')
    .then((module) => {
        let iClass = new ItemClass(module.default);
        this.loadSpritesheet(iClass, scene);
        this.items[iClass.id] = iClass;
        this.loading--;
        this.checkIfDone(scene);
    });
  }

  loadProjectile(scene, proj) {
    import(this.basePath + 'projectiles/' + proj + '.js')
    .then((module) => {
        let pClass = new ProjectileClass(module.default);
        this.loadSpritesheet(pClass, scene);
        this.projectiles[pClass.id] = pClass;
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
    }
  }
}
