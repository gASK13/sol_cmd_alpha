export default {
  id: 'scarab',
  name: "Scarab",
  maxHealth: 12,
  thrust: 100,
  maxSpeed: 800,
  maxShield: 8,
  shieldRecharge: 500,
  shieldRestart: 2500,
  description: "Slow, but can take a punch. Not two though, that's pushing the line.",
  sprite: {
    image: "assets/scarab.png",
    width: 56,
    height: 58,
  },
  hitbox: { width: 40, height: 58},
  hardpoints: [
    {
      type: 'W',
      x: -90,
      y: 50,
      maxClass: 2,
      id: 'l_w',
      portX: -16,
      portY: -5
    },
    {
      type: 'W',
      x: 90,
      y: 50,
      maxClass: 2,
      id: 'r_w',
      portX: 16,
      portY: -5
    },
    {
      type: 'W',
      x: 0,
      y: -110,
      maxClass: 1,
      id: 'f_w',
      portX: 0,
      portY: -35
    },
    {
      x: 0,
      y: -70,
      id: 'm',
      maxClass: 1
    }
  ]
}
