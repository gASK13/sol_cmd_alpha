export default {
  name: "20MW Laser",
  class: 2,
  description: "Bigger means better, right?",
  sprite: {
    image: "assets/laser_m.png",
    width: 32,
    height: 48,
  },
  projectiles: [
    {
      id: "l",
      sprite: {
        image: "assets/lsr_m.png",
        width: 4,
        height: 32
      },
      damage: 4,
      velocity: 400,
      delay: 333
    }
  ]
}
