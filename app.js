import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { planets } from './consts/planets';
import { instantiatePlanet } from './utils/planet';
import { didWidthHeightChange } from './utils/screen';
import { cameraSettings } from './appSettings';

function app() {
  const canvas = document.querySelector('#canvas');

  // CAMERA
  const renderer = new THREE.WebGLRenderer({ canvas });
  const { fov, aspect, near, far, position } = cameraSettings;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = position;

  // CONTROLS
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  // todo: I would move this out somewhere to separate file

  // BACKGROUND TEXTURE
  // id in case of using 6 different files this is just temporary
  const textureImages = Array(6)
    .fill()
    .map((el, id) => `assets/images/background/space.jpg`);
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load(textureImages);
  scene.background = texture;

  // LIGHTS
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // PLANETS
  const planetInstances = planets.map((planet) => instantiatePlanet(planet));
  planetInstances.forEach((planet) => scene.add(planet));

  // ADJUSTING CANVAS SIZE WHEN BROWSER RESIZED
  function shouldBeResized(renderer) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (didWidthHeightChange(width, height)) {
      renderer.setSize(width, height, false);
    }
    return didWidthHeightChange(width, height);
  }

  function render(time) {
    time *= 0.001;

    if (shouldBeResized(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    planetInstances.forEach((planet, id) => {
      // todo: rotation should be in the planet declaration with all the settings
      const speed = 1 + id * 0.1;
      const rot = time * speed;
      planet.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}


app();
