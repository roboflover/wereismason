const fragmentShaderPM = ` #define TIMESCALE 0.25 
  #define TILES 8
  #define COLOR 0.7, 1.6, 2.8
  varying vec3 vPosition; 
   // varying float rCircle;  
   //varying vec2 vUv;
    varying vec4 vColor;  
    uniform vec3 resolution;
    uniform float time;  
    uniform float count;
    
    void tiles( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/resolution.xy;
    float size = 1.0/count*1.07; // size of the tile
    float edge = size/16.0; // size of the edge
    float face_tone = 0.0; // 0.9 for the face of the tile
    float edge_tone = 1.0; // 0.5 for the edge
    uv = sign(vec2(edge) - mod(uv, size));
    vec4 grid = vec4(face_tone - sign(uv.x + uv.y + 2.0) * (face_tone - edge_tone));
    float alpha = 1.0;
    float aColor = uv.x  * sin( time );
    float bColor = uv.x  * cos( time );
    fragColor = vec4(0., aColor, bColor, grid.x);
}
  
void circle(out vec4 fragColor, in vec2 fragCoord )
{
 vec2 st = fragCoord/resolution.xy;
 float pct = 0.0;
 pct = distance(st,vec2(0.5));
 vec3 color = vec3(pct);
 fragColor = vec4( color, 1.0 );
 //rCircle = color.x;
}  
  
    varying vec2 vUv;
    //vUv = uv;
    void main(){
      
      
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec3 color = vec3(st.x, st.y, 0.);

   color = vec3(1., 0., 0.);
    //gl_FragColor = vec4(color, 1.);
    
    tiles(gl_FragColor, vUv * resolution.xy);
    //gl_FragColor = vec4(color, 1.);
    //circle(gl_FragColor, vUv * resolution.xy);
}  `;
