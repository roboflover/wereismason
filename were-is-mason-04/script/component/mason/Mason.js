class Mason {
  constructor(){
    
    
   // const createMason = () => {
    let group = new THREE.Group()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      const geometry = new THREE.SphereGeometry(0.5, 32, 16)
      const geoBox = new THREE.BoxGeometry(1, 1, 1)
      const boundingBox = new THREE.Mesh(geoBox, material)
      const scaleS = 0.2
      let spiral = new Spiral()
      let meshSpiral = spiral.group
      meshSpiral.scale.set(scaleS, scaleS, scaleS)
      // scene.add()
      const mesh = new THREE.Mesh(geometry, material)
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
      let newArray = []
      let countVar = 20
      let countSide = count / V
      let unique = []
    
      createRightObjects()
      //createCenterObjects()
    
      function createRightObjects() {
        for (let i = 0, l = H; i < l; i++) {
          for (let j = 0, l = V; j < l; j++) {
            const groupChild = new THREE.Group()
            groupChild.position.set(offsetX * i + offset, offsetY * j, 0.)
            objectsRight.push(groupChild)
          }
        }
        randomizeObjects(objectsRight)
      }
    
      function createCenterObjects() {
        for (let i = 0, l = V; i < l; i++) {
          const groupChild = new THREE.Group()
          groupChild.position.set(0, offsetY * i, 0.)
          objectsCenter.push(groupChild)
        }
        randomizeObjects(objectsCenter)
      }
    
      function randomizeObjects(array) {
        const randLength = array.length
        const percent = 50
        const length = Math.ceil(randLength / 100 * percent)
        let lengthTwo
        let prev = -1
        let next
        
    
        do {
          unique.length = 0
          objects.length = 0
          for (let i = 0; i < length; i++) {
            next = Math.ceil(Math.random() * randLength) - 1
            objects.push(array[next])
          }
          unique = objects.filter((item, i, ar) => ar.indexOf(item) === i);
        } while (unique.length < length)
        //mirrorObjects(unique)
         /*
        if (unique.length === length) {
          mirrorObjects(unique)
        }
        else {
          renderObjects(unique)
        }
        */
        mirrorObjects(unique)
      }
    
      //mirror objects
      function mirrorObjects(array) {
        for (let i = 0; i < array.length; i++) {
          let groupRight = array[i].clone()
          groupRight.position.x = -groupRight.position.x
          objectsLeft.push(groupRight)
        }
        newArray = array.concat(objectsLeft);
       // renderObjects(newArray)
       addOneEnemy(newArray)
      }
    
     function addOneEnemy(arr){
       const rand = Math.ceil(Math.random() * newArray.length) -1
       console.log(rand)
       
       for (let i = 0; i < newArray.length; i++) {
        let meshX = meshSpiral.clone()
        let bBox = boundingBox.clone()
        if(i === rand){
          arr[i].add(bBox)
          group.add(arr[rand])
        } else {
          arr[i].add(meshX)
          group.add(arr[i]) 
        }
       }
     }
    
      function renderObjects(array) {
        array.forEach(function(item, i, arr) {
        let meshX = meshSpiral.clone()
        item.add(meshX)
        group.add(item)
        })
      }

   function computeGroupCenter(count) {
     var center = new THREE.Vector3();
     var children = group.children;
     var count = children.length;
     for (var i = 0; i < count; i++) {
       center.add(children[i].position);
     }
     center.divideScalar(count);
     return center;
   }
   const centerGroup = computeGroupCenter(group)
   //console.log(centerGroup)
   group.position.y = -centerGroup.y
    this.group = group
  }
}
