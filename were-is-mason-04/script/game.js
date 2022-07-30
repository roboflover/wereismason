// import * as THREE from './lib/three.module.js';
import {Mixer} from './component/Mixer.js'
import {Enemy} from './component/Enemy.js'
import {scene, renderer, camera, THREE} from './component/Init.js';

//console.log(scene);
const masonObj = {
  pivot: new THREE.Object3D(),
  lepestokA: 0,
  lepestokB: 0,
  lepestokC: 0,
  lepestokD: 0,
  moduleA: 0,
  dummyA: new THREE.Object3D(),
  dummyB: new THREE.Object3D(),
  dummyC: new THREE.Object3D(),
  dummyD: new THREE.Object3D(),
  dummyM: new THREE.Object3D(),
  amount: 20,
  masonArr: [],
  arr: [],
  distArrB: [],
  clock:  new THREE.Clock(),
  numberOfPoints: 0,
  sizeH: 600,
  sizeV: 1200,
  ratio: 4,
  group: new THREE.Group(),
  groupFlover: new THREE.Group(),
  texture: './../../textures/test.jpg',
  lepestokJson: './../../models/lepestok_buffergeometry.json',
  moduleJson: './../../models/module_buffergeometry.json',
  scale: 10,
  offsetJ: 50,
}

let bg;

const createMason = () => {
  
  let enemy = new Enemy(scene);
  enemy.createCube();
  enemy.loadBufferGeometry(masonObj.lepestokJson, 
  masonObj.scale, masonObj.texture, 0, masonObj.group);
  enemy.loadBufferGeometry(masonObj.lepestokJson, 
  masonObj.scale, masonObj.texture,0, masonObj.group);
  enemy.loadBufferGeometry(masonObj.lepestokJson, 
  masonObj.scale, masonObj.texture, 0, masonObj.group);
  enemy.loadBufferGeometry(masonObj.lepestokJson, 
  masonObj.scale, masonObj.texture, 0, masonObj.group);
  enemy.loadBufferGeometry(masonObj.moduleJson, 
  masonObj.scale, masonObj.texture, 0, masonObj.group);
  scene.add(masonObj.group)

  let mixer = new Mixer();
  for (let i = 0; i < masonObj.amount; i++) {
    let obj = {};   
    obj.px = (Math.random() * masonObj.sizeH) * masonObj.ratio; 					
    obj.py = ((Math.random() * masonObj.sizeV)  - (masonObj.sizeV / 4)) * masonObj.ratio; 					
    obj.pz = (Math.random() * masonObj.sizeH) * 0; 
    masonObj.arr.push( obj)

    masonObj.allowDistance = true;
    masonObj.arr.forEach((value, j)=>{    
      const dx = masonObj.arr[i].px - masonObj.arr[j].px;
      const dy = masonObj.arr[i].py - masonObj.arr[j].py;
      const dz = masonObj.arr[i].pz - masonObj.arr[j].pz;
      const dist = Math.hypot(dx, dy, dz);
      if(dist < 100 && dist > 0.01  ){
        masonObj.allowDistance = false;
      }
    });
    if (masonObj.allowDistance === true){
        masonObj.numberOfPoints++;
        masonObj.distArrB.push(masonObj.arr[i]); 
     }
    
  };
}
console.log()

const createBg = () => {
  bg = new Level();
  scene.add(bg.group);
  bg.group.scale.set(200, 200, 100);
  bg.group.position.z  = -2000;
  bg.group.children[1].rotation.z += 0.1
}

console.log(scene)

const loop = () => {
  const time = Date.now() * 0.001;
  masonObj.group.scale.set(.5,.5,.5)
  masonObj.lepestokA = masonObj.group.children[0];
  masonObj.lepestokB = masonObj.group.children[1];
  masonObj.lepestokC = masonObj.group.children[2];
  masonObj.lepestokD = masonObj.group.children[3];
  masonObj.moduleA = masonObj.group.children[4];
    if (masonObj.lepestokA && masonObj.lepestokB && masonObj.lepestokC 
      && masonObj.lepestokD && masonObj.moduleA ) {
      
      let i = 0;
      const offset = (masonObj.sizeH * masonObj.ratio) / 2;
        for (let i = 0; i < masonObj.distArrB.length; i++) {  
          const px = masonObj.distArrB[i].px;
          const py = masonObj.distArrB[i].py;
          const pz = masonObj.distArrB[i].pz;
          
          masonObj.dummyA.position.set(px - offset, py - offset, pz );
          masonObj.dummyB.position.set(px - offset, py - offset, pz );
          masonObj.dummyC.position.set(px - offset, py - offset, pz );
          masonObj.dummyD.position.set(px - offset, py - offset, pz );
          masonObj.dummyM.position.set(px - offset, py - offset, pz ); 

          masonObj.dummyB.rotation.z = (Math.PI / 2)*2;
          masonObj.dummyC.rotation.z = (Math.PI / 2);
          masonObj.dummyD.rotation.z = (Math.PI / 2) * 3;

          masonObj.dummyA.rotation.x =
           (Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time)) *.2 - 0.5;
          masonObj.dummyB.rotation.x =
         -((Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time)) *.2 - 0.5);  
          masonObj.dummyC.rotation.y =
          ((Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time)) *.2 - 0.5); 
          masonObj.dummyD.rotation.y =
         -((Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time) +
            Math.sin(1 / 4 + time)) *.2 - 0.5); 

          masonObj.lepestokB.position.y = - masonObj.offsetJ;  
          masonObj.lepestokC.position.y = - masonObj.offsetJ / 2; 
          masonObj.lepestokC.position.x = - masonObj.offsetJ / 2; 
          masonObj.lepestokD.position.y = - masonObj.offsetJ / 2; 
          masonObj.lepestokD.position.x =  masonObj.offsetJ / 2; 
          masonObj.moduleA.position.y = - masonObj.offsetJ / 2; 

          masonObj.dummyA.updateMatrixWorld();
          masonObj.dummyB.updateMatrixWorld();
          masonObj.dummyC.updateMatrixWorld();
          masonObj.dummyD.updateMatrixWorld();
          masonObj.dummyM.updateMatrixWorld();
          
          masonObj.lepestokA.setMatrixAt(i, masonObj.dummyA.matrix);
          masonObj.lepestokB.setMatrixAt(i, masonObj.dummyB.matrix);
          masonObj.lepestokC.setMatrixAt(i, masonObj.dummyC.matrix);
          masonObj.lepestokD.setMatrixAt(i, masonObj.dummyD.matrix);
          masonObj.moduleA.setMatrixAt(i, masonObj.dummyM.matrix);
             }

          masonObj.lepestokA.instanceMatrix.needsUpdate = true;
          masonObj.lepestokB.instanceMatrix.needsUpdate = true;
          masonObj.lepestokC.instanceMatrix.needsUpdate = true;
          masonObj.lepestokD.instanceMatrix.needsUpdate = true;
          masonObj.moduleA.instanceMatrix.needsUpdate = true;

    }

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

createMason();
loop();

