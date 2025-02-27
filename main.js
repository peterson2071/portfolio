
import * as THREE from './node_modules/three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import './vite.config.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.IcosahedronGeometry(5, 1, 8, 50);
const material = new THREE.MeshBasicMaterial({color: 0x216285, wireframe: true});
const icosahedron = new THREE.Mesh(geometry, material);

scene.add(icosahedron);
const pointLight = new THREE.PointLight(0xffffff);

const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(5, 5, 5);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambientLight);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().loadAsync('/portfolio/image.png')
const mtr = new THREE.SpriteMaterial({map: spaceTexture});
const sprite = new THREE.Sprite(mtr);
const world = sprite.getWorldScale(scene);
sprite.scale.set(world);
camera.position.set(0, 10, 0);
scene.background = spaceTexture;

const sphere = new THREE.SphereGeometry(5, 200, 200);
const basic = new THREE.MeshBasicMaterial({color: 'orange'});
const sun = new THREE.Mesh(
  sphere,
  basic
);

scene.add(sun);

const abstractTexture = new THREE.TextureLoader().load('./abstract-vector-geometric-form-d-shape-artisic-abstraction-illustration-85096266.jpeg');
const abstract = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({map: abstractTexture})
);


sun.position.z = 30;
sun.position.setX(-10);

abstract.position.setY(120);

scene.add(abstract);
animate();


function animate(){
  requestAnimationFrame(animate);
  icosahedron.rotation.x += 0.01;
  icosahedron.rotation.y += 0.005;
  icosahedron.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

function addStars(){
  const sphere = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(sphere, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

function moveCamera(){
const t = document.body.getBoundingClientRect().top;

sun.rotation.x += 0.01;
sun.rotation.y += 0.005;
sun.rotation.z += 0.01;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

