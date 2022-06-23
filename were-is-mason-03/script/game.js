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
  //console.log(bg.particlesData[1]);
  //console.log(bg.particlePositions);
}

const loop = () => {
  
  /*
  let vertexpos = 0;				
  let colorpos = 0;				
  let numConnected = 0;
  
  for ( let i = 0; i < bg.particleCount; i ++ )	
  {
      bg.particlesData[ i ].numConnections = 0;
  }
  
  for ( let i = 0; i < bg.particleCount; i ++ )	
  {
    
    // get the particle
    const particleData = bg.particlesData[i];
    let vel = particleData.velocity;
    //console.log(Math.sin(clock.getElapsedTime()));
    bg.positionAttribute.array[ i * 3 ] += Math.sin(clock.getElapsedTime()) * vel.x;
    bg.positionAttribute.array[ i * 3 +1] += Math.sin(clock.getElapsedTime()) * vel.y;
    bg.positionAttribute.array[ i * 3 +2] += Math.sin(clock.getElapsedTime()) * vel.z;

  }
  */
  mason.group.rotation.x += 0.03;
  
  bg.pointCloud.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

