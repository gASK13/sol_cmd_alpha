import {Hardpoint} from './hardpoints.mjs';

export class ShipClass {

  constructor(key, json) {
    this.key = "ship_" + key;

    // Load data
    this.maxHealth = json.maxHealth;
    this.thrust = json.thrust;
    this.maxSpeed = json.maxSpeed;
    this.maxShield = json.maxShield;
    this.shieldRecharge = json.shieldRecharge;
    this.shieldRestart = json.shieldRestart;
    this.name = json.name;
    this.description = json.description;

    // Load hitboc - TODO refactor!
    this.hitbox = json.hitbox;

    // Load sprite - TODO refactor!
    this.sprite = json.sprite;

    // Load hardpoints
    if (json.hardpoints) {
      this.hardpoints = [];
      for(let hardpoint of json.hardpoints) {
        this.hardpoints.push(Hardpoint.create(hardpoint));
      }
    }
  }

  get width() {
    if (this.hitbox) {
      return this.hitbox.width;
    }
    return this.sprite.width;
  }

  get height() {
    if (this.hitbox) {
      return this.hitbox.height;
    }
    return this.sprite.height;
  }
}
