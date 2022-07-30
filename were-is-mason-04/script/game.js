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
  
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 )
  
  const group = new THREE.Group()
  const count = 20
  const offset = 2.5
  const offsetX = offset
  const offsetY = offset
  const scale = 0.5
  const objects = []
  var H = 6
  var V = 8
  
  for ( let i = 0, l = H; i < l; i ++ ) {
    for ( let j = 0, l = V; j < l; j ++ ) {
      const groupChild = new THREE.Group()
      groupChild.position.set(offsetX * i, offsetY * j, 1.)
      group.add(groupChild)
    }
  }

  group.children.forEach(function(item, i, arr){
    //console.log(item.position)
    const mesh = new THREE.Mesh(geometry, materialS)
    let randomIndex = Math.floor(Math.random() * arr.length)
    //console.log(randomIndex)
    arr[randomIndex].add(mesh)
    //
  })

  //group.add(groupH)
  function computeGroupCenter(myObject3D) {
    let box = new THREE.Box3().setFromObject(myObject3D)
    let vector = new THREE.Vector3()
    box.getCenter(vector)
    //let centerPoint = sphere.center
    return vector;
}
  const middle = computeGroupCenter(group)
  group.position.set(-middle.x, -middle.y, -middle.z)
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

