import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { criarCenarioCaatinga } from './caatinga.js';
import { abrirOuFecharCard } from './game.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 3, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

criarCenarioCaatinga(scene);

let animal3D = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const loader = new GLTFLoader();

loader.load(
  '/models/Armadillo.glb',
  function (gltf) {
    const animal = gltf.scene;

    animal.scale.set(0.05, 0.05, 0.05);
    animal.position.set(0, 0.2, 0);

    scene.add(animal);
    animal3D = animal;

    console.log('Animal carregado!');
  },
  undefined,
  function (error) {
    console.error('Erro ao carregar o animal:', error);
  }
);

window.addEventListener('click', function (event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (animal3D) {
    const intersects = raycaster.intersectObject(animal3D, true);

    if (intersects.length > 0) {
      abrirOuFecharCard();
    }
  }
});

const musica = document.getElementById('musica');

document.getElementById('btnComecar').addEventListener('click', () => {
  document.getElementById('telaInicial').style.display = 'none';

  if (musica) {
    musica.play();
  }
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});