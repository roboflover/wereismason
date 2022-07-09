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
         this.mesh.add( object ); 			
         } 				
   let raycaster = new THREE.Raycaster();
  }
}
