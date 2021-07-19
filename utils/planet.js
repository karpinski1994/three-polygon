import * as THREE from 'three';

export function instantiatePlanet({textureUrl, x, y, z, size}) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    const texture3d = new THREE.TextureLoader().load(
      'assets/images/planets/3d.jpeg'
    );
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 32),
      new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: texture3d,
      })
    );
    planet.position.x = x;
    planet.position.y = y;
    planet.position.z = z;
    return planet;
  }