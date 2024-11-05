// ModelViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ModelViewer = () => {
  const { scene } = useGLTF('/models/scene.gltf'); // Load the GLTF model
  scene.scale.set(1, 1, 1); // Adjust scale if needed

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 10 }}>
        {/* Vibrant colored lights for dynamic effect */}
        <ambientLight intensity={0.5} color="red" />
        <pointLight position={[-5, 5, 5]} color="yellow" intensity={1.5} />
        <pointLight position={[5, -5, 5]} color="blue" intensity={1.5} />
        <pointLight position={[0, 5, -5]} color="green" intensity={1.5} />

        {/* Model */}
        <primitive object={scene} />

        {/* Controls to orbit around the model */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
