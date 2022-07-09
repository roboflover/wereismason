let mixer, bg;
var clock = new THREE.Clock();

const createMason = () => {
  mixer = new Mixer();
  mixer.group.scale.set(4, 4, 4);
  scene.add(mixer.group);
  
}

const createBg = () => {
  bg = new Level();
  scene.add(bg.group);
  bg.group.scale.set(200, 200, 100);
  bg.group.position.z  = -2000;
  bg.group.children[1].rotation.z += 0.1
}

const loop = () => {
  
  //mixer.group.rotation.x += 0.03;
  bg.group.children[1].geometry.attributes.position.needsUpdate = true;
  bg.group.children[0].rotation.z += 0.001
  bg.group.children[1].rotation.z = bg.group.children[0].rotation.z
  bg.shaderMatPoint.uniforms.time.value += 0.01;
  bg.shaderMatMesh.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

