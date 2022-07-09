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
  for(let i = 0; i < 30; i++) {
    position2.unshift(position[i]);
  }

  geoLine1.setAttribute( 'position', new THREE.Float32BufferAttribute( position2, 3 ));
  const material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending, transparent: true } ); 
  this.linesCloud = new THREE.Line( geoLine1, this.shaderMatLine );
  this.group.add( this.linesCloud );

  this.group.add( this.pointCloud );
  
  
  // create lines
 

  }
 

 // 
}
    