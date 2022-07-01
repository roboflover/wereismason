let mason, bg;
var clock = new THREE.Clock();

const createMason = () => {
  mason = new Mixer();
  
  scene.add(mason.group);

}

const createBg = () => {
  bg = new Level();
  scene.add(bg.group);
  bg.group.scale.set(100, 100, 100);
  
}

const loop = () => {
  
  mason.group.rotation.x += 0.03;
  bg.pointCloud.geometry.attributes.position.needsUpdate = true;
  bg.shaderMatPoint.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

