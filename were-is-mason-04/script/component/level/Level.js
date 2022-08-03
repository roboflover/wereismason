class Level {
  
    constructor(){
      
   this.group = new THREE.Group();
   let count = 15.0;
   this.shaderMatPoint;
   this.shaderMatMesh;
   let scale = 2.0;
    const uniforms = {
      time: { type: "f", value: 0 },
      resolution: { value: new THREE.Vector3(1, 1, 1) },
      count: { type: "f", value: count },
    };
   
    this.shaderMatPoint = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vShaderBgPoint,
      fragmentShader: fShaderBgPoint,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.shaderMatMesh = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vShaderBgLine,
      fragmentShader: fShaderBgLine,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      //wireframe: true,
    });
   var geometry = new THREE.PlaneBufferGeometry( 20, 20, count-1, count-1 ); 
   /*
   geoPoint = new THREE.BufferGeometry();
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        positionPV.set([
              (i / count - 0.5) * 20,
              (j / count - 0.5) * 20,
              0
              ], 3 * (count * i + j));
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positionPV, 3));
    */
     let pointCloud = new THREE.Points(geometry, this.shaderMatPoint);
    //let mmm = new THREE.Mesh(geoPoint, shaderMatMesh);
     //group.add(mmm)
     pointCloud.position.z = 0.5;
     this.group.add(pointCloud);
   //  console.log(this.group)
     //scene.add(group);
    
    
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} ); 
    var bg = new THREE.Mesh( geometry, this.shaderMatMesh ); 
    bg.position.x =-.0;
    bg.position.y =-.0;
    bg.position.z = -0.0;
    
    
    this.group.add( bg );
    bg.scale.set(scale, scale, scale,);
    pointCloud.scale.set(scale, scale, scale,);
    }
  }
      
