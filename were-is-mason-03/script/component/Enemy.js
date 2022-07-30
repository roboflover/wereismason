class Enemy {
  constructor(){
    let arr = [];
    this.mesh;
    this.turboMesh;
    this.lepestok;
    let mesh;
    let count = 35;
    const texture = new THREE.TextureLoader().load( 'textures/test.jpg' );
    const material6 = new THREE.MeshBasicMaterial( { map: texture } );

    function loadBufferGeometry(url, scale) {
      const loader = new THREE.BufferGeometryLoader();
      loader.load(
        url,
        function (geometry) {
          geometry.computeVertexNormals();
          geometry.scale(scale, scale, scale);
          mesh = new THREE.InstancedMesh(geometry, material6, count);
          mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame       
          scene.add(mesh);
          console.log(mesh)
          //console.log('мэш 0', mesh)
          
        }
      );
    }
    
   loadBufferGeometry('./models/lepestok_buffergeometry.json', 50.0);

   this.lepestok = mesh;
   // console.log(this.turboMesh)
    
      //loaderModule.load("./models/model.json", function ( geometry ) {  
     
  }
}
