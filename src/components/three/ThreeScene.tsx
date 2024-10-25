// components/three/ThreeScene.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import Stats from 'stats.js';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gui = new dat.GUI();
    gui.close();

    const canvas = document.querySelector('.webgl') as HTMLCanvasElement;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const stats = new Stats();
    if (containerRef.current) {
      containerRef.current.appendChild(stats.dom);
      stats.dom.style.position = 'absolute';
      stats.dom.style.top = '10px';
      stats.dom.style.right = '10px';
      stats.dom.style.zIndex = '10';

      containerRef.current.appendChild(gui.domElement);
      gui.domElement.style.position = 'absolute';
      gui.domElement.style.top = '10px';
      gui.domElement.style.right = '10px';
      gui.domElement.style.zIndex = '10';
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    scene.fog = new THREE.Fog(0xffffff, 0, 750);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 3;
    camera.position.z = 6;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Adding lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5); // Adjust position as needed
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create the y-axis line
    const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -5, 0), // Start point (lower end)
      new THREE.Vector3(0, 5, 0),  // End point (upper end)
    ]);
    const yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
    scene.add(yAxisLine); // Add the y-axis line to the scene

    // Create the x-axis line
    const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color
    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5, 0, 0), // Start point (lower end)
      new THREE.Vector3(5, 0, 0),  // End point (upper end)
    ]);
    const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
    scene.add(xAxisLine); // Add the x-axis line to the scene

    // Create the z-axis line
    const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue color
    const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -5), // Start point (lower end)
      new THREE.Vector3(0, 0, 5),  // End point (upper end)
    ]);
    const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
    scene.add(zAxisLine); // Add the z-axis line to the scene

    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#777777',
      metalness: 0.2,
      roughness: 0.4,
      envMapIntensity: 0.5,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 64);
    const material = new THREE.MeshBasicMaterial({ color: '#3b4dad' });
    const torus = new THREE.Mesh(torusGeometry, material);
    torus.position.set(0, 0, 0);
    scene.add(torus);

    // Add the Positions folder
    const positionFolder = gui.addFolder('Positions');
    positionFolder.add(torus.position, 'x').min(-3).max(3).step(0.01).name('position-x');
    positionFolder.add(torus.position, 'y').min(-3).max(3).step(0.01).name('position-y');
    positionFolder.add(torus.position, 'z').min(-3).max(3).step(0.01).name('position-z');
    positionFolder.close();

    // Add the Appearance folder
    const appearanceFolder = gui.addFolder('Appearance');
    appearanceFolder.add(torus, 'visible');
    appearanceFolder.addColor(torus.material, 'color');
    appearanceFolder.close();

    // Add the Rotation folder
    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(torus.rotation, 'x').min(0).max(Math.PI * 2).step(0.01).name('rotation-x');
    rotationFolder.add(torus.rotation, 'y').min(0).max(Math.PI * 2).step(0.01).name('rotation-y');
    rotationFolder.add(torus.rotation, 'z').min(0).max(Math.PI * 2).step(0.01).name('rotation-z');
    rotationFolder.close();


    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      stats.update();
    };

    animate();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas className="webgl w-full h-full" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ThreeScene;
