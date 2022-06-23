class Level {
  
  constructor(){
    
  this.mesh = new THREE.Object3D();  
  this.particlesData = [];
  this.group = new THREE.Group();
  this.particleCount = 20000;
  
  this.particlePositions;
  this.pointCloud;
  this.rHalf;
  let colors;
  let geometry2;
  let count = 100;
  let position = new Float32Array(count * count * 3);
		
  const maxParticleCount = 1000;
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

    iTime: { value: 0 },

    u_resolution:  { value: new THREE.Vector3(1, 1, 1) },


  };
  
  const shaderMaterial = new THREE.ShaderMaterial( {

  uniforms,

	vertexShader: document.getElementById( 'vertexShader' ).textContent,

	fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );

  
  const pMaterial = new THREE.PointsMaterial( {				
    color: 0xFFFFFF,					
    size: 3,					
    blending: THREE.AdditiveBlending,					
    transparent: true,					
    sizeAttenuation: false 
  });
  
  geometry2 = new THREE.BufferGeometry();

  for( let i = 0; i < count; i ++ ) {
    for( let j = 0; j < count; j ++ ) {
      
      let u = Math.random()*2*Math.PI;
      let v = Math.random()*2*Math.PI;
      /*
      let x = (0.9 + 0.2 * v)*Math.cos(u)*Math.sin(v);
      let y = 1.5*Math.cos(v);
      let z = (0.9 + 0.2 * v)*Math.sin(u)*Math.sin(v);
      
      position.set([
        x,
        y,
        z
      ], 3*(count*i+j));
      */
      position.set([
        (i/count - 0.5)*20,
        (j/count - 0.5)*20,
        0
        ], 3*(count * i + j))
    }
  }

  geometry2.setAttribute( 'position', new THREE.BufferAttribute(position, 3));
  //console.log(geometry2)
  // create the particle system				
  this.pointCloud = new THREE.Points( geometry2, shaderMaterial );

  this.group.add( this.pointCloud );
   }
}
    
