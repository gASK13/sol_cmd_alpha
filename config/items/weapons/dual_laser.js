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
  damage: 2,
  velocity: 400,
  delay: 200,
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
