"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import Stats from 'stats.js';

const ThreeScene = () => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the container

    useEffect(() => {
        const gui = new dat.GUI();
        gui.close();

        const canvas = document.querySelector('.webgl') as HTMLCanvasElement; 
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const stats = new Stats();
        if (containerRef.current) {
            // Append stats to the container
            containerRef.current.appendChild(stats.dom);
            stats.dom.style.position = 'absolute'; // Set position to absolute
            stats.dom.style.top = '10px'; // Align to the top
            stats.dom.style.right = '10px'; // Align to the right
            stats.dom.style.zIndex = '10'; // Ensure it's above other elements
        }

        // Append GUI to the container
        if (containerRef.current) {
            containerRef.current.appendChild(gui.domElement);
            gui.domElement.style.position = 'absolute'; // Set position to absolute
            gui.domElement.style.top = '10px'; // Align to the top
            gui.domElement.style.right = '10px'; // Align to the left
            gui.domElement.style.zIndex = '10'; // Ensure it's above other elements
        }

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        const axesHelper = new THREE.AxesHelper(500);
        scene.add(axesHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 3;
        camera.position.z = 6;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.6;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2.02;
        controls.minDistance = 10;
        controls.maxDistance = 1000;
        controls.update();

        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: '#777777',
            metalness: 0.2,
            roughness: 0.4,
            envMapIntensity: 0.5,
            side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 64);
        const material = new THREE.MeshBasicMaterial({ color: 'yellow' });
        const torus = new THREE.Mesh(torusGeometry, material);
        torus.position.set(0, 2, 0);
        scene.add(torus);

        gui.add(torus.position, 'y').min(-3).max(3).step(0.01).name('elevation');
        gui.add(torus, 'visible');
        gui.addColor(torus.material, 'color');

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
    