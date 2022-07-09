const vertexShaderPM = `  
    #define SPEED 3.0
    //varying float sinn;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec4 vColor;
    uniform float time; 
    varying vec2 resolution; 
    
    
    void main() {  
     vec2 st = position.xy/resolution.xy;
     vec3 new_position = position;
     
     float deltaY = (abs(new_position.y) + 1.0) * sin(abs(new_position.y * 1.0) + time * SPEED) / 1.0
     + (sin(abs(new_position.y) * 1.0 + time) + sin(new_position.y * 1.0 + time)) / 7.0;
     
     float deltaX = (abs(new_position.x) + 1.0) * sin(abs(new_position.x * 1.0) + time * SPEED) / 1.0
     + (sin(abs(new_position.x) * 1.0 + time) + sin(new_position.x * 1.0 + time)) / 7.0;
   // vec2 st = gl_FragCoord.xy/resolution;
    
    vUv = uv;
    vec3 newPos = position;
    //sinn = sinn;
    float sinnX;
    float sinnY;
    sinnX += sin(time + position.x * 0.6);  
    sinnY += sin(time + position.y * 0.6);
    newPos.z = (sinnX*sinnY)*5.8;
    //newPos.z = (deltaY*deltaX)*0.05;
    //float pct = 0.0;
    //pct = distance(st,vec2(0.5));
  //  newPos.z = pcr*0.03
   // newPos.z += sin(time + position.x * 0.5);  
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    gl_PointSize = 10. * (1.5 / - mvPosition.z) + 9.;    
    gl_Position = projectionMatrix * mvPosition;
    }    `;
