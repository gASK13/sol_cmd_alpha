export default {
  id: 'laser_shotgun',
  name: "Spread 10MW Laser Array",
  class: 1,
  description: "This is a laser shotgun. No matter the official name or usage.",
  sprite: {
    image: "assets/laser_shotgun.png",
    width: 32,
    height: 32,
  },
  damage: { rnd: { min: 1, max:3}},  
  velocity: 400,
  delay: 1000,
  projectiles: [
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: -3,
        angle: -0.15
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: -2,
        angle: -0.10
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: -1,
        angle: -0.05
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: 1,
        angle: 0.05
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: 2,
        angle: 0.10
    },
    {
        projectileClass: 'lsr_s',
        tint: 0xff00ff,
        offsetX: 3,
        angle: 0.15
    }
  ]
}
