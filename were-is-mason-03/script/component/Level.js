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
  let position = new Float32Array(count * count * 3);
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

      position.set([
        (i/count - 0.5)*20,
        (j/count - 0.5)*20,
        0
        ], 3*(count * i + j))
        
        //console.log(3*(count * i + j));
    }
  }
  
  geoPoint.setAttribute( 'position', new THREE.BufferAttribute(position, 3));
  this.pointCloud = new THREE.Points( geoPoint, this.shaderMatPoint );
  
  // create lines
  this.shaderMatLine = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: document.getElementById('vertexShaderLine').textContent,
    fragmentShader: document.getElementById('fragmentShaderLine').textContent,
    transparent: true,
  });
  
  geoLine = new THREE.BufferGeometry(); 
  
  let position2 = new Float32Array();
  let position3 = new Float32Array();
  position2 = position.slice(0, 30);
  //const posLine = position.slice(0, count*3);
  position.forEach(function callback(currentValue, index, array) {
    if(!(index % (count*3))){
      const prev = index;
      const next = index + (count * 3);
      const posLine = position.slice(prev, next);
      position2 = position.slice(prev, next);
      //position3.length +1;
      position3.set(position3, array);
      // (myarray.length+1)).set([...myarray, appendix])
      // пытаюсь сложить несколько массивов в один
      // position3.pop(position2);
      // position2.set(posLine, count * 3 *index);
    }
        //your iterator }[, thisArg]);
      })
  console.log(position3);
  geoLine.setAttribute( 'position', new THREE.BufferAttribute( position3, 3 )); 				
  
  const material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending, transparent: true } ); 
  //linesMesh = new THREE.LineSegments( geoLine, material );
  this.linesCloud = new THREE.Line( geoLine, this.shaderMatLine );
  this.group.add( this.linesCloud );
  this.group.add( this.pointCloud );
  }
}
    
