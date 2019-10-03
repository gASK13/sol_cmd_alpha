export default {
  id: 'laser_s',
  name: "10MW Laser",
  class: 1,
  description: "Your basic anti-ship weapon. Well, anti-asteroid now, I guess?",
  sprite: {
    image: "assets/laser.png",
    width: 32,
    height: 32,
  },
  damage: 2,
  velocity: 400,
  delay: 200,
  projectiles: [
      {
        projectileClass: 'lsr_s',
        tint: 0xff0000
      }
  ]
}
