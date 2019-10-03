export default {
  id: 'laser_m',
  name: "20MW Laser",
  class: 2,
  description: "Bigger means better, right?",
  sprite: {
    image: "assets/laser_m.png",
    width: 32,
    height: 48,
  },
  damage: { min: 3, max: {rnd: {min: 4, max: 6}}},
  velocity: 400,
  delay: 333,
  projectiles: [
    {
        projectileClass: 'lsr_m',
        tint: 0x00afaf
    }
  ]
}
