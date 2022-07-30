// // import * as THREE from './lib/three.module.js';
// import {Mixer} from './component/Mixer.js'
// import {Enemy} from './component/Enemy.js'
// import {scene, renderer, camera, THREE} from './component/Init.js';

let bg;

const createMason = () => {
  
  const materialS = new THREE.ShaderMaterial( {
  
    uniforms: {

    },

    vertexShader: vertexShaderMason,
    fragmentShader: fragmentShaderMason,
    side: THREE.DoubleSide,
    transparent: true
  
  } );
  
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );

  const group = new THREE.Group()
  const groupH = new THREE.Group()
  const offset = 1.5
  const scale = 0.6
  var H = 8
  var V = 12

  for ( let i = 0, l = H; i < l; i ++ ) {
   
    addMesh( geometry, materialS, i, offset )
  }

  for ( let i = 0, l = V-1; i < l; i ++ ) {
    let groupV = groupH.clone()
    groupV.position.y = offset * 1
    groupH.add(groupV)
  }

  function addMesh(geometry, material, index, offset) {
    const objects = [];
    const mesh = new THREE.Mesh( geometry, material )

    mesh.scale.set( scale, scale, scale )
    mesh.position.set(offset * index, 1., 1.)
    objects.push( mesh )
    groupH.add( mesh )
  }
  group.add(groupH)

  function computeGroupCenter(myObject3D) {
    let box = new THREE.Box3().setFromObject(myObject3D)
    let vector = new THREE.Vector3()
    box.getCenter(vector)
    //let centerPoint = sphere.center
    return vector;
}
  const middle = computeGroupCenter(group)
  group.position.set(-middle.x, -middle.y, middle.z)
  scene.add(group)

}

const createBg = () => {
  bg = new Level();
  scene.add(bg.group);
  bg.group.scale.set(200, 200, 100);
  bg.group.position.z  = -2000;
  bg.group.children[1].rotation.z += 0.1
}



const loop = () => {
  const time = Date.now() * 0.001;
  

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  
}

createMason();
loop();

