// ThreeBackground.jsx
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import backgroundImage from '../images/allbg.png'; // Adjust path as needed

const ThreeBackground = () => {
  useEffect(() => {
    let container, camera, scene, renderer, effect;
    const spheres = [];
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) * 10;
      mouseY = (event.clientY - windowHalfY) * 10;
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      const timer = 0.0001 * Date.now();
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      for (let i = 0, il = spheres.length; i < il; i++) {
        const sphere = spheres[i];
        sphere.position.x = 5000 * Math.cos(timer + i);
        sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
      }

      effect.render(scene, camera);
    }

    function init() {
      container = document.getElementById('three-container');

      // Camera setup
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
      camera.position.z = 3200;

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.TextureLoader().load(backgroundImage);

      // Sphere geometry and water-like material setup
      const geometry = new THREE.SphereGeometry(100, 32, 16);
      const textureCube = new THREE.CubeTextureLoader()
        .setPath('textures/cube/Park3Med/')
        .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
      textureCube.mapping = THREE.CubeRefractionMapping;

      // Create water-like material
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x00aaff, // Light blue tint for water effect
        envMap: textureCube,
        refractionRatio: 0.98,
        reflectivity: 0.6,
        transmission: 0.8, // Enables transparency
        opacity: 0.8, // Adjusts transparency level
        transparent: true,
        roughness: 0.1, // Makes it glossy
        metalness: 0.1,
      });

      // Add spheres to the scene
      for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 10000 - 5000;
        mesh.position.y = Math.random() * 10000 - 5000;
        mesh.position.z = Math.random() * 10000 - 5000;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
        scene.add(mesh);
        spheres.push(mesh);
      }

      // Add colorful point lights
      const colors = [0x66ccff, 0x33ccff, 0x99ccff, 0x66ffff, 0x33ffff, 0xccffff];
      colors.forEach((color, i) => {
        const pointLight = new THREE.PointLight(color, 1.2, 5000);
        pointLight.position.set(
          Math.sin((i / colors.length) * Math.PI * 2) * 2500,
          Math.cos((i / colors.length) * Math.PI * 2) * 2500,
          1000
        );
        scene.add(pointLight);
      });

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // Stereo effect setup
      effect = new StereoEffect(renderer);
      effect.setSize(window.innerWidth, window.innerHeight);

      // Event listeners
      document.addEventListener('mousemove', onDocumentMouseMove);
      window.addEventListener('resize', onWindowResize);

      // Start animation
      renderer.setAnimationLoop(animate);
    }

    init();

    // Clean up event listeners and Three.js components
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="three-container" style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: -1 }} />;
};

export default ThreeBackground;
