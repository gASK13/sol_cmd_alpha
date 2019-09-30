export class ShipClass {

  constructor(key, json) {
    this.key = "ship_" + key;
    this.maxHealth = json.maxHealth;
    this.thrust = json.thrust;
    this.maxSpeed = json.maxSpeed;
    this.maxShield = json.maxShield;
    this.shieldRecharge = json.shieldRecharge;
    this.shieldRestart = json.shieldRestart;
    this.name = json.name;
    this.description = json.description;

    this.sprite = json.sprite;
  }

  getSpriteKey() {
    return this.key;
  }

  getWidth() {
    if (this.sprite.hitbox) {
      return this.sprite.hitbox.width;
    }
    return this.sprite.width;
  }

  getHeight() {
    if (this.sprite.hitbox) {
      return this.sprite.hitbox.height;
    }
    return this.sprite.height;
  }

  getMaxHealth() {
    return this.maxHealth;
  }

  getThrust() {
    return this.thrust;
  }

  getMaxSpeed() {
    return this.maxSpeed;
  }

  getMaxShield() {
    return this.maxShield;
  }

  getShieldRecharge() {
    return this.shieldRecharge;
  }

  getShieldRestart() {
    return this.shieldRestart;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }
}
