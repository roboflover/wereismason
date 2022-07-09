const fragmentShaderP  = `
    varying vec3 vPosition; 
    varying vec2 vUv;
    varying vec4 vColor;  
    uniform vec3 resolution;
    uniform float time;  
    varying float rCircle; 
    void main(){
      float radius = .001;
      float dist = length(gl_PointCoord - vec2(0.5));
      float alpha = 1. - smoothstep(0.45, 0.5, dist);
      float aColor = vUv.x * sin(time);
      float bColor = vUv.x * cos(time);
      gl_FragColor = vec4(aColor, 0., vUv.y, alpha);
      
}`;
