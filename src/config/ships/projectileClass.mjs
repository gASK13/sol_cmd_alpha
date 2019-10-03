export class ProjectileClass {
  constructor(json) {
    this.id = json.id;
    this.hitbox = json.hitbox;

    // TODO sprite
    this.sprite = json.sprite;
  }

  get key() {
    return this.id;
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
