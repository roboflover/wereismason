class Enemy {
  constructor(){
    let arr = [];
    this.mesh = new THREE.Object3D();
    let geom = new THREE.BoxGeometry(12, 12, 12);
    let count = 35;
    let allCount = count * 2;
    let ratio;
    let load = 0;
    let positionArray = [];
    let test = [];
    let finalArray = [];
    let mesh;
    // console.log(load = 1 / allCount * 100)
    
    
    // const material = new THREE.MeshBasicMaterial( { color: 0x000000  } );
    const uniforms = {
      time: { type: "f", value: 0 },
      resolution: { value: new THREE.Vector3(1, 1, 1) },
    };
   
    const material3 = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShaderP,
      fragmentShader: fragmentShaderP,
      transparent: true,
      side: THREE.DoubleSide,
    });

   
    for ( let i = 0; i < count; i ++ ) { 
      
      const texture = new THREE.TextureLoader().load( 'textures/test.jpg' );
      const material6 = new THREE.MeshBasicMaterial( { map: texture } );
      const material = new THREE.MeshNormalMaterial();
      
      let object = {};
      let pos = 2.5;
      let rot = 0.0;
      let scale = 40.0;
      object.px = (Math.random() * 800 - 400) * pos; 					
      object.py = (Math.random() * 800 - 400) * pos; 					
      object.pz = (Math.random() * 800 - 400) * 0; 
      object.rx = (Math.random() * 2 * Math.PI); 					
      object.ry = (Math.random() * 2 * Math.PI); 					
      object.rz = (Math.random() * 2 * Math.PI); 					
      object.s = (Math.random() + 0.5) * scale; 					
      positionArray.push(object.px)

      let geo;
      let loaderModule = new THREE.ObjectLoader();
      //console.log(loaderModule)
      loaderModule.load("./models/model.json", function ( geometry ) {  
          geometry.position.set(object.px, object.py, object.pz);
          geometry.scale.set(object.s, object.s, object.s);  
          geometry.material = material6;
          mesh = geometry;
          scene.add( mesh );
        },
        function ( xhr ) {
          //console.log(load )
          load += 1 / allCount * 100; 
          //console.log(xhr);
          //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
      );
      // let loaderLepestok = new THREE.ObjectLoader();
      // loaderLepestok.load("./models/lepestok.json", function ( geometry ) {  

      //   geometry.scale.set(scale, scale, scale);
      //     geometry.material = material6;
      //     scene.add( geometry );
      //   },
      //   function ( xhr ) {
      //     console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      //   },
      // );

    //   for( let j = 0; j < count; j++) {
    //     // дистанция
    //     if ( positionArray[j] !== undefined) {
    //        const pointA = positionArray[ i ];
    //        const pointB = positionArray[ j ];
    //        const distance = pointA.distanceTo(pointB);
    //        const sizeFactor = 5//size; // *api.factor;
    //        const originalDistance = distance - (0.5*(scales[i] + scales[j]));
    //        //console.log(sizeFactor)
    //        if ( originalDistance < sizeFactor && distance > 0.01 ){ 
    //         console.log('дистанция!')    
    //         finalArray.push(positionArray[j]);   
    //         allowDistance = false;             
    //         }     
    //     }   
    // }
   
   let raycaster = new THREE.Raycaster();
   finalArray.push(mesh)
  }

   console.log(finalArray)
   console.log('длина', finalArray.length)
  // // if(load > 98){
  // for( let i = 0; i < positionArray.length; i++) { 
  //   console.log(positionArray[i])
  // }
  //positionArray.forEach(element => console.log(element));

    
  // }
  }
}
