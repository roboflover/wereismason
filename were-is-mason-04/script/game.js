let bg
let mason
/*
const createMason = () => {
  
  
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} )
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 )
  const geoBox = new THREE.BoxGeometry( 1, 1, 1 )
  const meshBoundingBox = new THREE.Mesh(geoBox, material)
 // const mesh = new THREE.Mesh(geometry, materialS)
  const groupRight = new THREE.Group()
  const groupCenter = new THREE.Group()
  const offset = 2.5
  const offsetX = offset
  const offsetY = offset
  const scale = 0.5
  const count = 20
  const objects = []
  const objectsRight = []
  const objectsLeft = []
  const objectsCenter = []
  var H = 2
  var V = 5
  let countVar = 20
  let countSide = count / V
  
  createRightObjects()
  createCenterObjects()
  
  function createRightObjects(){
      for (let i = 0, l = H; i < l; i++) {
        for (let j = 0, l = V; j < l; j++) {
          const groupChild = new THREE.Group()
          groupChild.position.set(offsetX * i + offset, offsetY * j, 0.)
          objectsRight.push(groupChild)
        }
      }
      randomizeObjects(objectsRight)
  }

  function createCenterObjects(){
    for (let i = 0, l = V; i < l; i++) {
      const groupChild = new THREE.Group()
      groupChild.position.set(0, offsetY * i, 0.)
      objectsCenter.push(groupChild)
    }
    randomizeObjects(objectsCenter)
  }
  
  function randomizeObjects(array){
    const randLength = array.length
    const percent = 50
    const length = Math.ceil(randLength / 100 * percent)
    let lengthTwo
    let prev = -1
    let next
    let unique = []
    
    do{
      unique.length = 0
      objects.length = 0
      for (let i = 0; i < length; i++) {
      next = Math.ceil(Math.random() * randLength)-1
      objects.push(array[next])
      }
      unique = objects.filter((item, i, ar) => ar.indexOf(item) === i);
    }while(unique.length<length)
    //console.log(unique.length)
    if(unique.length===length){
    mirrorObjects(unique)
    } 
    else {
      renderObjects(unique)
    }
    
  }
  
  //mirror objects
  function mirrorObjects(array){
    for (let i = 0; i < array.length; i++) {
      let groupRight = array[i].clone()
      groupRight.position.x = -groupRight.position.x
      objectsLeft.push(groupRight)
    }
    renderObjects(array)
  }
  
 renderObjects(objectsLeft)
  

  function renderObjects(array){
    array.forEach(function(item, i, arr) {
      let meshX = meshBoundingBox.clone()
      item.add(meshX)
      scene.add(item)
    })
  }
}
*/

const addMasonClass = () => {
  mason = new Mason()
 // console.log('groupA', mason.group)
 scene.add(mason.group)
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
  //mixer.group.rotation.x += 0.03;
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

