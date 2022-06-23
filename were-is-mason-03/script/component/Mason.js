class Mason {
  constructor() {
    this.mesh = new THREE.Object3D();
    let geom = new THREE.BoxGeometry(10, 10, 10);
    let mat = new THREE.MeshPhongMaterial({
      color: Colors.white,
    });
    let m = new THREE.Mesh(geom, mat);
    m.position.y = 100;
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
  }

}
