import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------- DAT.GUI -----------------------

const gui = new dat.GUI()
const world = {
  cube: {
    width: 1,
    height: 1,
    depth:1,
  },
  camera: {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  }
}

gui.add(world.cube, 'width',0.1, 8).onChange(() => {
  cube.geometry.dispose()
  cube.geometry = new THREE.BoxGeometry(world.cube.width,world.cube.height,world.cube.depth)
})

gui.add(world.cube,'height', 0.1,8).onChange(() => {
  cube.geometry.dispose()
  cube.geometry = new THREE.BoxGeometry(world.cube.width,world.cube.height,world.cube.depth)
})

gui.add(world.cube,'depth', 0.1,8).onChange(() => {
  cube.geometry.dispose()
  cube.geometry = new THREE.BoxGeometry(world.cube.width,world.cube.height,world.cube.depth)
})

gui.add(world.camera,'positionX', -500, 500).onChange(() => {
  camera.position.x= world.camera.positionX
})

gui.add(world.camera,'positionY', -500, 500).onChange(() => {
  camera.position.y= world.camera.positionY
})

gui.add(world.camera,'positionZ', -500, 500).onChange(() => {
  camera.position.z= world.camera.positionZ
})


// ----------------- Scene -----------------

const scene = new THREE.Scene();


// ---------------- Camera -----------------------

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight,0.1,1000)
camera.position.x = -101
camera.position.z = -404
camera.position.y = 72
camera.lookAt(0,0,0)
// ---------------- renderer ---------------------

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(innerWidth,innerHeight)
document.body.appendChild( renderer.domElement );
console.log(renderer)


// ----------------- Cube ---------------------------

// const geometry = new THREE.BoxGeometry(1,1,1)

// const material = new THREE.MeshNormalMaterial({color:0xff0000})

// const cube = new THREE.Mesh(geometry,material)
// scene.add(cube)


// -------------------- Directional Light ----------------------

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.z = 3 
scene.add( directionalLight )

// ------------------- Ambient Light -----------------------

const light = new THREE.AmbientLight( 0xffffff ); 
scene.add( light );


// -------------------- loader model3d.gltf ------------------------

let loadedModel;

const loader = new GLTFLoader();
loader.setPath('models/pickle_rick/')
loader.load( 'scene.gltf', ( gltf ) => {

  loadedModel = gltf

  gltf.scene.rotation.x = 90
  gltf.scene.rotation.z = 45

  console.log(gltf.scene)
	scene.add( gltf.scene );
  render()
  console.log(loader)
});

// ----------------- Controls -------------------------

const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
controls.target.set( 0, 2, 0 );
controls.update();

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  console.log(controls)
  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

// --------------------- Animations -----------------

function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene,camera)


  // cube.rotation.z += 0.01
  // cube.rotation.y += 0.01
}

// -------------------- render ----------------

function render() {

  renderer.render( scene, camera );

}


animate()
render()

