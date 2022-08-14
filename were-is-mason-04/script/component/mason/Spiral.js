class Spiral {
  constructor(){
    this.group = new THREE.Group()

let shroom_height, stipe_vSegments, stipe_rSegments, stipe_points, stipe_indices, stipe_shape, stipe_shape2
let circleValues
const mouse = new THREE.Vector2()
let INTERSECTED
let theta = 0
let meshOk = false
let group2 = new THREE.Object3D()
let cloneGroup
let countMemory

const uniforms = {
    time: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
  }

class CustomSinCurve extends THREE.Curve {

  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 2 - 1.5;
    const ty = Math.sin(1 * Math.PI * t)
    const tz = 0;
    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
  }
}

const zPosScale = 1.5;
//const Noise = new THREE.ImprovedNoise()
const radialSegments = 32
const tubularSegments = 20
const tubeRadius = 2;
const path = new CustomSinCurve(10)
const geometry = new THREE.TubeBufferGeometry(path, tubularSegments, tubeRadius, radialSegments, false)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
let scaleTube = 0.2
let degree = 40.91
let normal = new THREE.Vector3()
let vertex = new THREE.Vector3()
//let ns;
let nScale = 0.25
let normals = []
let vertices = []
let mandalaGroups = []
var v = new THREE.Vector3(0, 1, 0)
var P = new THREE.Vector3()

mesh.scale.set(scaleTube, scaleTube, scaleTube)
mesh.position.applyAxisAngle(v, Math.PI / 2)

for (let i = 0; i <= tubularSegments; i ++ ) {
  var pointAt = i / tubularSegments
  P = path.getPointAt(pointAt, P)
  var N = geometry.normals[ i ]
  var B = geometry.binormals[ i ]
  for (let j = 0; j <= geometry.parameters.radialSegments; j ++ ) {
    var v = j / geometry.parameters.radialSegments * Math.PI * 2
    var sin = Math.sin( v )
    var cos = - Math.cos( v )
    normal.x = ( cos * N.x + sin * B.x )
    normal.y = ( cos * N.y + sin * B.y )
    normal.z = ( cos * N.z + sin * B.z )
    normal.normalize();
    var radius = geometry.parameters.radius;
    radius = radius + ((Math.sin(pointAt * 40 - 1.5)*0.9 ) + Math.sin(pointAt * 3 + 2)) // wave along the path
   // ns = Noise.noise(vertex.x * nScale, vertex.y * nScale, j)
    vertex.x = P.x + radius * normal.x
	  vertex.y = P.y + radius * normal.y
	  vertex.z = P.z + radius * normal.z
		vertices.push( vertex.x, vertex.y, vertex.z )
  }
}

mesh.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3))
let lengthX = mesh.geometry.attributes.position.array.length
/*
for(let i = 0; i < lengthX; i++){
  let t = Math.random()*10
  ns = Noise.noise(
    mesh.geometry.attributes.position.array[i + 0] * nScale, 
    mesh.geometry.attributes.position.array[i + 1] * nScale, 
    t);
radialSegments  }
*/
//mergeTest(3, geometry)
function mergeTest(count, geo){
  let geoArr = []
  geo.translate(-5.,0.,0.)
  
 // var geometry1 = geo.clone()
  
  for(let i = 0; i < count; i++){
    let geoB = geo.clone()
    geoB.rotateZ(((Math.PI/count)*2) * i)
    geoArr.push(geoB)
  }
 // geometry2.translate(1,2,3)
  //console.log(geometry2)
  //geometry2.rotateZ(((Math.PI/5) * 2)*4)
  var merged = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArr);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cluster = new THREE.Mesh(merged, material)
  
  return cluster
}


let mandala = mergeTest(3, geometry)


this.group.add(mandala)    
    
    
  }
}

