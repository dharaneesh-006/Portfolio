import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Add scrollable content behind canvas
    const scrollContainer = document.createElement('div');
    scrollContainer.style.height = '300vh';
    document.body.appendChild(scrollContainer);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(-3, 10, 0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const pointlight1 = new THREE.PointLight("#ff3c00", 1);
    pointlight1.position.set(2, 5, 2);
    const pointlight = new THREE.PointLight("#0095ff", 5);
    pointlight.position.set(3, 6, -2);
    const pointlight2 = new THREE.PointLight("#ffffff", 2);
    pointlight2.position.set(2, 6, 1);
    scene.add(pointlight1, pointlight, pointlight2);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(5, 0, 0);
    controls.update();

    // GLTF loader
    const loader = new GLTFLoader();
    let mixer;

    loader.load(
      '/models/animation1.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.06, 0.06, 0.06);
        model.position.set(0, 0, -1);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      },
      undefined,
      (error) => {
        console.error('GLTF load error:', error);
      }
    );

    // Scroll-based camera animation
    gsap.to(camera.position, {
      scrollTrigger: {
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      },
      z: 10,
      onUpdate: () => {
        camera.lookAt(5, 0, 0);
      }
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      document.body.removeChild(scrollContainer);
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
        pointerEvents: 'none' // allow scrolling through canvas
      }}
    />
  );
};

export default CanvasScene;
