class Mixer {
  constructor() {
  this.group = new THREE.Group();
  const mason = new Mason();
  this.group.add(mason.mesh);
  const enemy = new Enemy();
  this.group.add(enemy.mesh);
  }
}

/*
class Switch {
  constructor() {
    this.mesh = new THREE.Object3D();
    let level;
    level = new Level();
    this.mesh.add(level.mesh);
  }
}
*/
