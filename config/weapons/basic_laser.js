export default {
  name: "10MW Laser",
  class: 1,
  description: "Your basic anti-ship weapon. Well, anti-asteroid now, I guess?",
  sprite: {
    image: "assets/laser.png",
    width: 32,
    height: 32,
  },
  projectiles: [
    {
      id: "l",
      sprite: {
        image: "assets/lsr.png",
        width: 9,
        height: 26
      },
      hitbox: { width: 40, height: 58},
      damage: 2,
      velocity: 400,
      delay: 200
    }
  ]
}
