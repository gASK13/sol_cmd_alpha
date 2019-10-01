export default {
  name: "Stilleto",
  maxHealth: 8,
  thrust: 500,
  maxSpeed: 1500,
  maxShield: 4,
  shieldRecharge: 1000,
  shieldRestart: 5000,
  description: "Fast but fragile. Not furious at all.",
  sprite: {
    image: "assets/stilleto.png",
    width: 44,
    height: 56
  },
  hardpoints: [
    {
      type: 'W',
      x: -1,
      y: 0,
      maxclass: 1,
      id: 'l_w',
      portX: -14,
      portY: -5,
      angle: -15
    },
    {
      type: 'W',
      x: 1,
      y: 0,
      maxclass: 1,
      id: 'r_w',
      portX: 14,
      portY: -5,
      angle: 15
    },
    {
      x: 0,
      y: -1,
      id: 'm'
    }
  ]
}
