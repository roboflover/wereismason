class MasonInstancing {
  constructor(){

let material2
let group = new THREE.Group()
//создание алгоритма
let convertVectToFloat = []
const offset = .5
const count = 200
const offsetX = offset
const offsetY = offset
const objects = []
const objectsRight = []
const objectsLeft = []
const objectsCenter = []
const arrayMerge = []
let newArray = []
let unique = []
var H = 5
var V = 11
let countVar = 20
let countSide = count / V
let arrCount = 0
///////////%%////
let clock = new THREE.Clock();
var offsets = []
let arrTest = []
let pos = []
let rot = []
let scl = []
let boxSize = []
let mat4 = new THREE.Matrix4()
let dummy = new THREE.Object3D()
let counter = 0
let meshSize = 0.3

let spiral = new Spiral()
const spiralGeo = spiral.group.children[0].geometry

material2 = new THREE.RawShaderMaterial({
  uniforms: {
    "time": { value: 0.0 }
  },
  vertexShader: document.getElementById('vshader').textContent,
  fragmentShader: document.getElementById('fshader').textContent,
  depthTest: true,
  depthWrite: true
});

let boxGeometry = spiralGeo//new THREE.BoxBufferGeometry(meshSize, meshSize, meshSize)
let mat = new THREE.MeshStandardMaterial({ color: "pink"  })
let instMesh = new THREE.InstancedMesh(boxGeometry, mat)


const testMesh = new THREE.Mesh(spiralGeo, mat)
//scene.add(testMesh)

createCenterObjects()
createRightObjects()

function createCenterObjects() {
        for (let i = 0, l = V; i < l; i++) {
          const vectorChild = new THREE.Vector3()
          vectorChild.set(0, offsetY * i, 0.)
          objectsCenter.push(vectorChild)
        }
        randomizeObjects(objectsCenter)
      }


function createRightObjects() {
        for (let i = 0, l = H; i < l; i++) {
          for (let j = 0, l = V; j < l; j++) {
            const vectorChild = new THREE.Vector3()
            vectorChild.set(offsetX * i + offset, offsetY * j, 0.)
            objectsRight.push(vectorChild)
            //const groupChild = new THREE.Group()
            //groupChild.position.set(offsetX * i + offset, offsetY * j, 0.)
            //objectsRight.push(groupChild)
          }
        }
       randomizeObjects(objectsRight)
      }
      
function randomizeObjects(array) {
  //console.log(array)
      const randLength = array.length
      const percent = 30
      const length = Math.ceil(randLength / 100 * percent)
      let lengthTwo
      let prev = -1
      let next
     //console.log('length', length)
      do {
        unique.length = 0
        objects.length = 0
        for (let i = 0; i < length; i++) {
          next = Math.ceil(Math.random() * randLength) - 1
          objects.push(array[next])
        }
        unique = objects.filter((item, i, ar) => ar.indexOf(item) === i);
      } while (unique.length < length)
     //console.log(unique)
      if (array.length > V) {
       mirrorObjects(unique)
      } else {
       mergeArrays(unique)
  }
}

function mergeArrays(arr){
        arr.forEach(function(val, index){
          arrayMerge.push(val)
        })
        arrCount++
        if(arrCount>=2 ){
        convertVectorToFloatArr(arrayMerge)
    }
}    

function mirrorObjects(array) {
  for (let i = 0; i < array.length; i++) {
    let groupRight = array[i].clone()
    groupRight.x = -groupRight.x
    objectsLeft.push(groupRight)
  }
  newArray = array.concat(objectsLeft);
  mergeArrays(newArray)
}
//создание алгоритма
meshSize = 0.001
function convertVectorToFloatArr(arr){
  arr.forEach(function(val) {
   pos.push(val.x, val.y, val.z)
   rot.push(0.0, 0.0, 0.3)
   boxSize.push(meshSize, meshSize, meshSize)
   counter++
  })
}

instMesh.instanceMatrix.needsUpdate = true
const geometry = new THREE.InstancedBufferGeometry()
geometry.copy(boxGeometry)
// geometry.index = boxGeometry.index
// geometry.attributes = boxGeometry.attributes
geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(new Float32Array(pos), 3))
geometry.setAttribute('rotation', new THREE.InstancedBufferAttribute(new Float32Array(rot), 3))
geometry.setAttribute('boxSize', new THREE.InstancedBufferAttribute(new Float32Array(boxSize), 3))
geometry.instanceCount = Infinity

console.log(geometry.attributes)
console.log(boxGeometry.attributes)

this.shaderUniforms = {
  time: { value: 0 },
  speed: { value: 50 }
}

var boxMat = new THREE.MeshPhongMaterial({ color: 0x4444bb });
boxMat.onBeforeCompile = shader => {

  shader.uniforms.time = this.shaderUniforms.time;
  shader.uniforms.speed = this.shaderUniforms.speed;

  shader.vertexShader = `
  uniform float time;
  uniform float speed;

  attribute vec3 translate;
  attribute vec3 rotation;
  attribute vec3 boxSize;
  // http://barradeau.com/blog/?p=1109
  mat4 rotationMatrix(vec3 axis, float angle)
  {
      axis = normalize(axis);
      float s = sin(angle);
      float c = cos(angle);
      float oc = 1.0 - c;

      return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                  0.0,                                0.0,                                0.0,                                1.0);
  }
  
  mat4 rotateXYZ() {
    return rotationMatrix(vec3(1, 0, 0), rotation.x * time) * rotationMatrix(vec3(0, 1, 0), rotation.y * time) * rotationMatrix(vec3(0, 0, 1), rotation.z * time) ;
  }

  ` + shader.vertexShader;

  shader.vertexShader = shader.vertexShader.replace(
    `#include <begin_vertex>`,
    `#include <begin_vertex>

    mat4 r = rotateXYZ();
   vNormal = (vec4(transformedNormal, 1.0) * r).xyz;
    vec3 posShift = translate;
    posShift.z = sin(mod(posShift.z + 500. + time * (speed *0.01), 1000.) - 500.);
    float meshS = 0.013;
    transformed = (vec4(position * vec3(meshS, meshS, meshS), 0.) * r).xyz;
    transformed += posShift;

    `
  );
};



const mesh = new THREE.Mesh(geometry, boxMat);

let mesh2 = mesh.clone()
mesh2.scale.x = -1
group.add(mesh2)

group.add(mesh)
    //
  this.group = group
  //
  }
}
