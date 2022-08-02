let bg;

const createMason = () => {
  
  const materialS = new THREE.ShaderMaterial( {
    uniforms: {
      
    },
    vertexShader: vertexShaderMason,
    fragmentShader: fragmentShaderMason,
    side: THREE.DoubleSide,
    transparent: true
  })
  
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} )
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 )
  const geoBox = new THREE.BoxGeometry( 1, 1, 1 )
  const meshBoundingBox = new THREE.Mesh(geoBox, material)
  const mesh = new THREE.Mesh(geometry, materialS)
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
  
  
    /*
  
  
  groupRight.children.forEach(function(item, i, arr){
    //console.log(item)
    let meshX = meshBoundingBox.clone()
    item.add(meshX)
  })
  
  
  scene.add(groupRight)
  //scene.add(meshBoundingBox)
  //console.log(groupRight)

  function computeGroupCenter(myObject3D) {
    let box = new THREE.Box3().setFromObject(myObject3D)
    let vector = new THREE.Vector3()
    box.getCenter(vector)
    return vector;
  }

  const middleRight = computeGroupCenter(groupRight)
  const middleCenter = computeGroupCenter(groupCenter)
  let groupLeft = groupRight.clone()
  
  groupLeft.scale.x = -1.0
  groupLeft.position.set(-offset, -middleRight.y, -middleRight.z)
  groupRight.position.set(offset, -middleRight.y, -middleRight.z)
  groupCenter.position.set(0., -middleCenter.y, -0.)
  
  pushToObjects(groupLeft)
  pushToObjects(groupRight)
  pushToObjects(groupCenter)
  
  function pushToObjects(group) {
    group.children.forEach(function(item, i, arr) {
      objects.push(item)
    })
  }
  
  let renderArr = []
  let renderGroup = new THREE.Group()
  /*
  while(countVar){
   let rand = Math.floor(Math.random() * objects.length)
    renderArr.push(objects[rand])
    countVar--
  }

 // console.log(renderGroup)
  scene.add(renderGroup)
  
  renderArr.forEach(function(item, i, arr){
     let meshX = mesh.clone()
     //objects[rand].add(meshX)
     item.add(meshX)
     scene.add(item)
  })

  renderArr.forEach(function(item, i, arr){
    renderGroup.add(item)
    })
    //console.log(renderGroup)
  scene.add(renderGroup)

  /*
  //console.log(objects.length)
  //objects.push(groupLeft.children[index])
    /*
  scene.add(groupLeft)
  scene.add(groupRight)
  scene.add(groupCenter)

  while(countVar){
    let meshCenter = mesh.clone()
    let randomIndex = Math.floor(Math.random() * count)
      groupCenter.children.forEach(function(item, i, arr){
        
      })
    console.log(randomIndex)
    countVar--
  }

  groupCenter.children.forEach(function(item, i, arr){
    let meshCenter = mesh.clone()
    let randomIndex = Math.floor(Math.random() * arr.length)
    arr[randomIndex].add(meshCenter)
  })
  
  groupRight.children.forEach(function(item, i, arr){
    let meshRight = mesh.clone()
    let randomIndex = Math.floor(Math.random() * arr.length)
    arr[randomIndex].add(meshRight)
  })
  */

}

const createBg = () => {
  bg = new Level()
  scene.add(bg.group)
  bg.groupRight.scale.set(200, 200, 100)
  bg.groupRight.position.z  = -2000
  bg.groupRight.children[1].rotation.z += 0.1
}



const loop = () => {
  const time = Date.now() * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

createMason();
loop();

