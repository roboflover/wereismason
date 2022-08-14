console.clear();

import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 8, 13);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.setScalar(10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1));

let cylGeom = new THREE.CylinderBufferGeometry(0.5, 1, 2, 8);
let cylMat = new THREE.MeshStandardMaterial({ color: "red", roughness: 0.25, metalness: 0.75, polygonOffset: true, polygonOffsetFactor: 1 });
let cylinder = new THREE.InstancedMesh(cylGeom, cylMat, 1000);
let dummy = new THREE.Object3D();

let mat4 = new THREE.Matrix4();
let counter = 0;
let pos = [];
let rot = [];
let scl = [];
//
for (let z = 0; z < 100; z++) {
  for (let x = 0; x < 100; x++) {
    dummy.position.set(-4.5 + x, 0, -4.5 + z).multiplyScalar(4);
    dummy.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    dummy.scale.set(
      1 + Math.random(),
      1 + Math.random(),
      1 + Math.random()
    );
    dummy.updateMatrix();
    cylinder.setMatrixAt(counter, dummy.matrix);
    pos.push(dummy.position.x, dummy.position.y, dummy.position.z);
    rot.push(dummy.quaternion.x, dummy.quaternion.y, dummy.quaternion.z, dummy.quaternion.w);
    scl.push(dummy.scale.x, dummy.scale.y, dummy.scale.z);
    counter++;
  }
}
cylinder.instanceMatrix.needsUpdate = true;
//console.log(cylinder);
scene.add(cylinder);
//
let lineGeom = new THREE.EdgesGeometry(cylGeom);
lineGeom = new THREE.InstancedBufferGeometry().copy(lineGeom);
lineGeom.instanceCount = Infinity;
lineGeom.setAttribute("instT", new THREE.InstancedBufferAttribute(new Float32Array(pos), 3));
lineGeom.setAttribute("instR", new THREE.InstancedBufferAttribute(new Float32Array(rot), 4));
lineGeom.setAttribute("instS", new THREE.InstancedBufferAttribute(new Float32Array(scl), 3));
let lineMat = new THREE.LineBasicMaterial({
  color: "yellow",
  onBeforeCompile: shader => {
    shader.vertexShader = `
    attribute vec3 instT;
    attribute vec4 instR;
    attribute vec3 instS;
    
    // http://barradeau.com/blog/?p=1109
    vec3 trs( inout vec3 position, vec3 T, vec4 R, vec3 S ) {
        position *= S;
        position += 2.0 * cross( R.xyz, cross( R.xyz, position ) + R.w * position );
        position += T;
        return position;
    }
    ${shader.vertexShader}
`.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
      transformed = trs(transformed, instT, instR, instS);
`
    );
  //  console.log(shader.vertexShader);
  }
});
let lines = new THREE.LineSegments(lineGeom, lineMat);
scene.add(lines);

let clock = new THREE.Clock();
//console.log(counter)
renderer.setAnimationLoop(() => {
  let t = clock.getDelta();

  for (let i = 0; i < counter; i++) {
    cylinder.getMatrixAt(i, mat4);
    mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);
    dummy.rotation.x += t;
    dummy.rotation.z += t * .5;
    dummy.updateMatrix();
    cylinder.setMatrixAt(i, dummy.matrix);
    cylinder.instanceMatrix.needsUpdate = true;
    linesTRS(i, dummy);
  }

  renderer.render(scene, camera);
})

function linesTRS(index, o) {
  lineGeom.attributes.instT.setXYZ(index, o.position.x, o.position.y, o.position.z);
  lineGeom.attributes.instT.needsUpdate = true;
  lineGeom.attributes.instR.setXYZW(index, o.quaternion.x, o.quaternion.y, o.quaternion.z, o.quaternion.w);
  lineGeom.attributes.instR.needsUpdate = true;
  lineGeom.attributes.instS.setXYZ(index, o.scale.x, o.scale.y, o.scale.z);
  lineGeom.attributes.instS.needsUpdate = true;
}
