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
  
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 )
  const mesh = new THREE.Mesh(geometry, materialS)
  const groupRight = new THREE.Group()
  const groupCenter = new THREE.Group()
  const offset = 2.5
  const offsetX = offset
  const offsetY = offset
  const scale = 0.5
  const count = 20
  const objects = []
  var H = 2
  var V = 8
  let countVar = 20
  let countSide = count / V
  
  for ( let i = 0, l = H; i < l; i ++ ) {
    for ( let j = 0, l = V; j < l; j ++ ) {
      const groupChild = new THREE.Group()
      groupChild.position.set(offsetX * i, offsetY * j, 1.)
      groupRight.add(groupChild)
    }
  }
  
  for ( let i = 0, l = V; i < l; i ++ ) {
    const groupChild = new THREE.Group()
    groupChild.position.set(0., offsetY * i, 0.)
    groupCenter.add(groupChild)
  }
  
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
  
  while(countVar){
   let rand = Math.floor(Math.random() * objects.length)
    renderArr.push(objects[rand])
    countVar--
  }
  console.log(renderGroup)
  scene.add(renderGroup)
  
  renderArr.forEach(function(item, i, arr){
     let meshX = mesh.clone()
     //objects[rand].add(meshX)
     item.add(meshX)
     scene.add(item)
  })
  /*
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

