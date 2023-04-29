import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
camera.rotation.y = 45;
camera.position.x = 30;
camera.position.y = 10;

scene.add(camera);

const canvas = document.querySelector('.webgl');

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;


const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;

scene.add(directionalLight);


const light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(0, 300, 500);
scene.add(light);

const light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(500, 100, 0);
scene.add(light2);

const light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 100, -500);
scene.add(light3);

const light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(-500, 300, 500);
scene.add(light4);


const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);

let object;

const loader = new GLTFLoader();
loader.load('public/scene.gltf', function (gltf) {
    object = gltf.scene;
    object.scale.set(10, 10, 10)

    scene.add(object);
});

function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();