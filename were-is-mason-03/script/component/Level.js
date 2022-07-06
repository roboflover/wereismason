class Level {
  
  constructor(){
    
  this.mesh = new THREE.Object3D();  
  this.particlesData = [];
  this.group = new THREE.Group();
  this.particleCount = 200;
  
  this.particlePositions;
  this.pointCloud;
  this.rHalf;
  let colors;
  let geoPoint, geoLine, linesMesh;
  let count = 10;
  let position = [];
  let parentTransform;
  //= new Float32Array(count * count * 3);
	//position.length(count * count * 3);
	
  const r = 800;
	this.rHalf = r / 2;
	
	const effectController = {				
	  showDots: true,				
	  showLines: true,				
	  minDistance: 150,				
	  limitConnections: false,				
	  maxConnections: 2000,				
	  particleCount: 500			
	};
	
  const uniforms = {

    time: { type: "f", value: 0 },
    resolution:  { type: "v4", value: new THREE.Vector4() },

  };
  
  // create points
  
  this.shaderMatPoint = new THREE.ShaderMaterial( {
  uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	transparent: true,

} );
  
  geoPoint = new THREE.BufferGeometry();

  for( let i = 0; i < count; i ++ ) {
    for( let j = 0; j < count; j ++ ) {
      let u = Math.random()*2*Math.PI;
      let v = Math.random()*2*Math.PI;
      position.push(
        (i/count - 0.5)*20,
        (j/count - 0.5)*20,
        0
        );
    }
  }
  //console.log(position)
  geoPoint.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );
  //geoPoint.setAttribute( 'position', new THREE.BufferAttribute(position, 3));
  this.pointCloud = new THREE.Points( geoPoint, this.shaderMatPoint );
  
  // create lines
  this.shaderMatLine = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: document.getElementById('vertexShaderLine').textContent,
    fragmentShader: document.getElementById('fragmentShaderLine').textContent,
    transparent: true,
  });
  
  let position2 = [];
  let geoLine1 = new THREE.BufferGeometry(); 
  let prev = 0;
  for(let i = 0; i < 33; i++) {
    position2.push(position[i]);
  }
  geoLine1.setAttribute( 'position', new THREE.Float32BufferAttribute( position2, 3 ));
  const material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending, transparent: true } ); 
  this.linesCloud = new THREE.Line( geoLine1, this.shaderMatLine );
  this.group.add( this.linesCloud );

  this.group.add( this.pointCloud );
  
  // create line
  parentTransform = new THREE.Object3D(); 
  const lineGeometry = new THREE.BufferGeometry();
  const points = [];
  const point = new THREE.Vector3();				
  const direction = new THREE.Vector3();
  
  for ( let i = 0; i < 30; i ++ ) {
    direction.x = 0.5;
  	direction.normalize().multiplyScalar( 50 );
  	point.add( direction );					
  	points.push( point.x, point.y, point.z );
    }
  
    lineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
    
    let object;
    const lineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );
   
    //object = new THREE.Line( lineGeometry, lineMaterial );
    object = new THREE.LineSegments( lineGeometry, lineMaterial );
    let scl = .12510;
    object.scale.x = 0.5 * scl;
    object.scale.y = 0.5 * scl;
    object.scale.z = 0.5 * scl;
    
    let rot = .5;
    object.rotation.x = rot * Math.PI;					
    object.rotation.y = rot * Math.PI;					
    object.rotation.z = rot * 2 * Math.PI;
    
    parentTransform.add( object );
    this.group.add(parentTransform)
  }
 
 // 
}
    
