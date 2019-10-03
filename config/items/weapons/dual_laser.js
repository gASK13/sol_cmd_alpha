export default {
  id: 'dual_laser',
  name: "Dual 10MW Laser",
  class: 2,
  description: "Two lasers. When one is not enough!",
  sprite: {
    image: "assets/dual_laser.png",
    width: 32,
    height: 48,
  },
  damage: {rnd: { min: 1, max: 3}},
  velocity: 400,
  delay: { rnd: { min: 150, max: 250 }},
  projectiles: [
    {
        projectileClass: 'lsr_s',
        tint: 0xffff00,
        offsetX: -3
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xffff00,
        offsetX: 3
    }
  ]
}
