import * as THREE from 'three';

export function criarCenarioCaatinga(scene) {
  scene.background = new THREE.Color(0x87ceeb);

  scene.add(new THREE.AmbientLight(0xffffff, 2));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffdd55 })
  );
  sun.position.set(6, 7, -10);
  scene.add(sun);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: 0xd19a4a })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  criarSerra(scene, -6, 2, -10, 3, 4, 0x8b7355);
  criarSerra(scene, 2, 2.5, -12, 4, 5, 0x7d6748);

  criarCacto(scene, -4, -3, 1.8);
  criarCacto(scene, 4, -2, 1.5);
  criarCacto(scene, -3, 3, 1.4);
  criarCacto(scene, 5, 2, 1.8);

  criarPedra(scene, -2, 2, 0.8);
  criarPedra(scene, 2, 1.5, 0.6);
  criarPedra(scene, 1, -3, 0.7);

  criarArbusto(scene, -1.5, -2);
  criarArbusto(scene, 3, 2);
  criarArbusto(scene, -3, 1);
}

function criarSerra(scene, x, y, z, raio, altura, cor) {
  const serra = new THREE.Mesh(
    new THREE.ConeGeometry(raio, altura, 4),
    new THREE.MeshStandardMaterial({ color: cor })
  );
  serra.position.set(x, y, z);
  scene.add(serra);
}

function criarCacto(scene, x, z, altura) {
  const material = new THREE.MeshStandardMaterial({ color: 0x2f7d32 });

  const tronco = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, altura, 12),
    material
  );
  tronco.position.set(x, altura / 2, z);
  scene.add(tronco);

  const braco1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12),
    material
  );
  braco1.rotation.z = Math.PI / 2;
  braco1.position.set(x + 0.35, altura * 0.65, z);
  scene.add(braco1);

  const braco2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.6, 12),
    material
  );
  braco2.rotation.z = Math.PI / 2;
  braco2.position.set(x - 0.3, altura * 0.5, z);
  scene.add(braco2);
}

function criarPedra(scene, x, z, escala) {
  const pedra = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.4),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
  );
  pedra.position.set(x, 0.2, z);
  pedra.scale.set(escala, escala * 0.6, escala);
  scene.add(pedra);
}

function criarArbusto(scene, x, z) {
  const arbusto = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
  );
  arbusto.position.set(x, 0.25, z);
  arbusto.scale.set(1.4, 0.5, 1.4);
  scene.add(arbusto);
}