import * as THREE from './../lib/three.module.js';
import {OrbitControls} from './../lib/OrbitControls.js'

let scene, HEIGHT, WIDTH;
let renderer, container;
let camera, aspectRatio, fieldOfView, nearPlane, farPlane;
let controls;

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10500;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  
  camera.position.x = 0;
  camera.position.z = 3500;
  camera.position.y = 0;
  
  scene.background = null;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  controls = new OrbitControls( camera, renderer.domElement );

  
}
createScene()
export {scene, container, renderer, controls, camera, THREE};