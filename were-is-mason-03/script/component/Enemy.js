class Enemy {
  constructor(){
    let arr = [];
    this.mesh = new THREE.Object3D();
    let geom = new THREE.BoxGeometry(12, 12, 12);
    let mat = new THREE.MeshPhongMaterial({
      color: Colors.red,
    });
    let m = new THREE.Mesh(geom, mat);
    m.position.y = 0;
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
    
    // const material = new THREE.MeshBasicMaterial( { color: 0x000000  } );
    const uniforms = {
      time: { type: "f", value: 0 },
      resolution: { value: new THREE.Vector3(1, 1, 1) },
    };
   
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShaderP,
      fragmentShader: fragmentShaderP,
      transparent: true,
      side: THREE.DoubleSide,
    });

    var loader = new THREE.ObjectLoader();
    loader.load( './models/model.json', function ( object ) {
                //console.log( object );
                let s = 100.0;
                object.scale.set(s, s, s);
                object.material = material;
                scene.add( object );
    } );
    //console.log(loader);
    loader.material = material;
    //let objectRabbitAngry = await loaderRabbitAngry.loadAsync( './models/example.json' );
    
    // let moddd = new THREE.BufferGeometryLoader()
		// .setPath( './models/' )
		// .load( 'example.json', function ( geometryInstance ) {

		// 	geometryInstance.computeVertexNormals();
    //   console.log(geometryInstance)
    //   //geometryInstance.scale.set(10.0, 10.0, 10.0);
    // 	} );
    // objectRabbitAngry.material = material;
    // objectRabbitAngry.scale.set(10.0, 10.0, 10.0);
    // scene.add( objectRabbitAngry );

    // const loader = new THREE.ObjectLoader();

    // loader.load(
    //   // resource URL
    //   "models/example.json",
    //   // onLoad callback
    //   // Here the loaded data is assumed to be an object
    //   function ( obj ) {
    //     obj.scale.set(10.0, 10.0, 10.0);
    //     // Add the loaded object to the scene
    //     scene.add( obj );
    //   },

    // );

    const geometry = new THREE.BoxGeometry( 20, 20, 20 ); 				
       for ( let i = 0; i < 200; i ++ ) { 					
         const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) ); 					
         object.position.x = Math.random() * 800 - 400; 					
         object.position.y = Math.random() * 800 - 400; 					
         object.position.z = Math.random() * 800 - 400; 					
         object.rotation.x = Math.random() * 2 * Math.PI; 					
         object.rotation.y = Math.random() * 2 * Math.PI; 					
         object.rotation.z = Math.random() * 2 * Math.PI; 					
         object.scale.x = Math.random() + 0.5; 					
         object.scale.y = Math.random() + 0.5; 					
         object.scale.z = Math.random() + 0.5; 					
         //this.mesh.add( object ); 			
         } 				
   let raycaster = new THREE.Raycaster();
  }
}
