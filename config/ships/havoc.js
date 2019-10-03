export default {
  id: 'havoc',
  name: "Havoc",
  maxHealth: 25,
  thrust: 800,
  maxSpeed: 200,
  description: "Experimental. Like a lot.",
  sprite: {
    image: "assets/havoc.png",
    width: 60,
    height: 50,
  },
  hardpoints: [
    {
      type: 'W',
      x: -70,
      y: -70,
      maxClass: 2,
      id: 'fl_w',
      portX: -15,
      portY: -20
    },
    {
      type: 'W',
      x: 70,
      y: -70,
      maxClass: 2,
      id: 'fr_w',
      portX: 15,
      portY: -20
    },
    {
      type: 'W',
      x: -73,
      y: 24,
      maxClass: 2,
      id: 'ml_w',
      portX: -10,
      portY: 0,
      angle: 0.08
    },
    {
      type: 'W',
      x: 73,
      y: 24,
      maxClass: 2,
      id: 'mr_w',
      portX: 10,
      portY: 0,
      angle: -0.08
    },
    {
      type: 'W',
      x: -39,
      y: 90,
      maxClass: 1,
      id: 'bl_w',
      portX: -7,
      portY: 22,
      angle: 3.1415926536
    },
    {
      type: 'W',
      x: 39,
      y: 90,
      maxClass: 1,
      id: 'br_w',
      portX: 7,
      portY: 22,
      angle: 3.1415926536
    }
  ]
}
