export class Projectile {
  constructor(key, json) {
    this.key = key;
    this.id = json.id;
    this.hitbox = json.hitbox;
    this.damage = json.damage;
    this.delay = json.delay;
    this.velocity = json.velocity;

    // TODO sprite
    this.sprite = json.sprite;
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
