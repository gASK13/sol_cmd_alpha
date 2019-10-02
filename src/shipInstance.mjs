import { ShipClass } from './config/ships/shipClass.mjs';

export class ShipInstance {
  constructor(shipClass) {
    this.shipClass = shipClass;
    this.loadout = {};
  }

  get key() {
    return this.shipClass.key;
  }

  get width() {
    return this.shipClass.width;
  }

  get height() {
    return this.shipClass.height;
  }

  get maxHealth() {
    return this.shipClass.maxHealth;
  }

  get thrust() {
    return this.shipClass.thrust;
  }

  get maxSpeed() {
    return this.shipClass.maxSpeed;
  }

  get maxShield() {
    return this.shipClass.maxShield;
  }

  get shieldRecharge() {
    return this.shipClass.shieldRecharge;
  }

  get shieldRestart() {
    return this.shipClass.shieldRestart;
  }

  get name() {
    return this.shipClass.name;
  }

  get description() {
    return this.shipClass.description;
  }
}
