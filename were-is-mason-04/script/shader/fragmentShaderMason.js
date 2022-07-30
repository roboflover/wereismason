const fragmentShaderMason = `

varying vec2 vUv;

void main() {
    if ((fract(vUv.x * 10.0) < 0.02)
        || (fract(vUv.y * 10.0) < 0.02)) {
        gl_FragColor = vec4(vec3(0.0), 1.0);
    } else {
        gl_FragColor = vec4(1.0);
    }
}
`;
