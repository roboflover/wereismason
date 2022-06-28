window.addEventListener('load', init, false);
//init();
let Colors = {
  white: 0xffffff, 
}

function init() {
  createScene();
  createLights();
  createMason();
  createBg();
  //createLevel();
  loop();
} 

let scene, HEIGHT, WIDTH;
let renderer, container;
let camera, aspectRatio, fieldOfView, nearPlane, farPlane;
let controls;

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  // Create the scene
  scene = new THREE.Scene();
  
  // Add a fog effect to the scene; same color as the
  // background color used in the style sheet
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  // Create the camera
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
  camera.position.z = 800;
  camera.position.y = 0;
  
  
  // Create the renderer with transparent background and antialias
  scene.background = null;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  // enable shadows
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls( camera, renderer.domElement );
}

let hemisphereLight, ambientLight, shadowLight;

const createLights = () => {
  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

  // an ambient light modifies the global color of a scene and makes the shadows softer
  ambientLight = new THREE.AmbientLight(0x5c88a4, .5);
  scene.add(ambientLight);

  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  shadowLight = new THREE.DirectionalLight(0xffffff, .6);

  // Set the direction of the light  
  shadowLight.position.set(150, 350, 100);
  shadowLight.castShadow = true;

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // res of shadow
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}

// handle window resize
window.onresize = () => {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	//renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}



