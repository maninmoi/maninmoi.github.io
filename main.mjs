import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (!WebGL.isWebGLAvailable() ) {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}


const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Keys
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const keyStates = {
    [KEY_LEFT]: false,
    [KEY_UP]: false,
    [KEY_RIGHT]: false,
    [KEY_DOWN]: false,
};

//Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

//Camera
const cameraDistance = 5;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, cameraDistance);

//Scaling
function scaleCubeToWindowHeight() {
    let cubeScale = 0;

    for (let i = 1; i < 10; i++) {
        if((i-1)*85+(i*85)>innerHeight){ //One 1x1x1 Cube is roughly 85 Pixels from corner to corner
            break;
        }
        cubeScale = i;
    }
    cube.scale.set(cubeScale, cubeScale, cubeScale);
}

// Initial scaling of the cube
scaleCubeToWindowHeight();

//Mouse Control
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.copy(cube.position);
//Camera
camera.position.z = 5;

window.addEventListener('resize', onWindowResize, false);

animate();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (keyStates[KEY_LEFT]) {

    }
    if (keyStates[KEY_UP]) {

    }
    if (keyStates[KEY_RIGHT]) {

    }
    if (keyStates[KEY_DOWN]) {

    }
    render();
}

function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    render();
}

function render() {
    renderer.render(scene, camera);
}

// Define a function to handle keydown events
function onKeyDown(event) {
    const keyCode = event.keyCode;

    // Check if a specific key is pressed and update its state
    if (keyStates.hasOwnProperty(keyCode)) {
        keyStates[keyCode] = true;
    }
}

// Define a function to handle keyup events
function onKeyUp(event) {
    const keyCode = event.keyCode;

    // Check if a specific key is released and update its state
    if (keyStates.hasOwnProperty(keyCode)) {
        keyStates[keyCode] = false;
    }
}