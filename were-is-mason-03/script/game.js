const masonObj = {
  lepestok: 0,
  dummy: new THREE.Object3D(),
  amount: 200,
  masonArr: [],
  arr: [],
  distArrB: [],
  clock:  new THREE.Clock(),
  numberOfPoints: 0,
  millimetr: 600,
  ratio: 4,
}

let bg;

const createMason = () => {
  
  let mixer = new Mixer();
  for (let i = 0; i < masonObj.amount; i++) {
    let obj = {};   
    obj.px = (Math.random() * masonObj.millimetr) * masonObj.ratio; 					
    obj.py = (Math.random() * masonObj.millimetr) * masonObj.ratio; 					
    obj.pz = (Math.random() * masonObj.millimetr) * 0; 
    masonObj.arr.push( obj)

    masonObj.allowDistance = true;
    masonObj.arr.forEach((value, j)=>{    
      const dx = masonObj.arr[i].px - masonObj.arr[j].px;
      const dy = masonObj.arr[i].py - masonObj.arr[j].py;
      const dz = masonObj.arr[i].pz - masonObj.arr[j].pz;
      const dist = Math.hypot(dx, dy, dz);
      if(dist < 500 && dist > 0.01  ){
        masonObj.allowDistance = false;
      }
    });
    if (masonObj.allowDistance === true){
      masonObj.numberOfPoints++;
      masonObj.distArrB.push(masonObj.arr[i]); 
     }
    
  };
}

const createBg = () => {
  bg = new Level();
  scene.add(bg.group);
  bg.group.scale.set(200, 200, 100);
  bg.group.position.z  = -2000;
  bg.group.children[1].rotation.z += 0.1
}

const loop = () => {
  masonObj.lepestok = scene.children[5];
  if (masonObj.lepestok) {
    const time = Date.now() * 0.001;
    let i = 0;
    const offset = (masonObj.millimetr * masonObj.ratio) / 2;
      for (let i = 0; i < masonObj.distArrB.length; i++) {        
        masonObj.dummy.position.set(masonObj.distArrB[i].px - offset, masonObj.distArrB[i].py - offset, masonObj.distArrB[i].pz);
        masonObj.dummy.rotation.x =
          (Math.sin(1 / 4 + time) +
           Math.sin(1 / 4 + time) +
           Math.sin(1 / 4 + time)) *.2 - 0.5;
           masonObj.dummy.updateMatrix();
        masonObj.lepestok.setMatrixAt(i, masonObj.dummy.matrix);
           }
    masonObj.lepestok.instanceMatrix.needsUpdate = true;
  }
  
  //mixer.group.rotation.x += 0.03;
  bg.group.children[1].geometry.attributes.position.needsUpdate = true;
  bg.group.children[0].rotation.z += 0.001
  bg.group.children[1].rotation.z = bg.group.children[0].rotation.z
  bg.shaderMatPoint.uniforms.time.value += 0.01;
  bg.shaderMatMesh.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

