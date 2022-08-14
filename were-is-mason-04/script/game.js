let bg
let mason, spiral, masonLength
let masonSpeedR = 0.02

const addMasonClass = () => {
  mason = new MasonInstancing()
 // console.log('groupA', mason.group)
 const scale = 1.5
 mason.group.scale.set(scale,scale,scale)
 scene.add(mason.group)
// masonLength = mason.group.children.length
 //console.log(mason.group)
}

const addBackgroundClass = () => {
  bg = new Level();
  const scale = .5
  scene.add(bg.group);
  bg.group.scale.set(scale, scale, scale);
  bg.group.position.z = -6
  //bg.group.children[1].rotation.z += 0.1
}

const loop = () => {
  

  const time = performance.now() * 0.005
  //material.uniforms[ "time" ].value = time
  mason.shaderUniforms.time.value = time;

  bg.group.children[1].geometry.attributes.position.needsUpdate = true;
  bg.group.children[0].rotation.z += 0.001
  bg.group.children[1].rotation.z = bg.group.children[0].rotation.z
  bg.shaderMatPoint.uniforms.time.value += 0.01;
  bg.shaderMatMesh.uniforms.time.value += 0.01;
  
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

addBackgroundClass()
addMasonClass()
loop();
