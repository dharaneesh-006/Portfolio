import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(-3, 10, 0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const light1 = new THREE.PointLight("#ff3c00", 1);
    light1.position.set(2, 5, 2);
    const light2 = new THREE.PointLight("#0095ff", 5);
    light2.position.set(3, 6, -2);
    const light3 = new THREE.PointLight("#ffffff", 2);
    light3.position.set(2, 6, 1);
    scene.add(light1, light2, light3);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.target.set(5, 0, 0);
    controls.update();

    // Load GLTF with DracoLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // <-- You must place decoder files here

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let mixer;

    loader.load('/models/animation1.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.06, 0.06, 0.06);
      model.position.set(0, 0, -1);
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }, undefined, (error) => {
      console.error('GLTF load error:', error);
    });

    // Scroll-triggered camera animation
    gsap.to(camera.position, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=750vh',
        scrub: true,
      },
      x: 5,
      y: 13,
      z: -1,
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasScene;
