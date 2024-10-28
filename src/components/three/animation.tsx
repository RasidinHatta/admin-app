// components/three/ThreeScene.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import Stats from 'stats.js';

const ThreeAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isRotating, setIsRotating] = useState(true); // State for rotation control
    const [rotationSpeed, setRotationSpeed] = useState(0.01); // State for rotation speed

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
        scene.fog = new THREE.Fog(0x3f7b9d, 0, 750);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 3;
        camera.position.z = 6;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Adding lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);

        const torusGeometry1 = new THREE.TorusGeometry(5, 1, 16, 100);
        const torusGeometry2 = new THREE.TorusGeometry(3, 0.6, 16, 100);
        const torusGeometry3 = new THREE.TorusGeometry(2, 0.4, 16, 100);
        const material1 = new THREE.MeshStandardMaterial({
            color: '#049ef4',
            roughness: 0,
            metalness: 0.4,
            side: THREE.DoubleSide,
        });
        const material2 = new THREE.MeshStandardMaterial({
            color: '#519e5e',
            roughness: 0,
            metalness: 0.4,
            side: THREE.DoubleSide,
        });
        const material3 = new THREE.MeshStandardMaterial({
            color: '#d03906',
            roughness: 0,
            metalness: 0.4,
            side: THREE.DoubleSide,
        });

        // Create torus1 (horizontal)
        const torus1 = new THREE.Mesh(torusGeometry1, material1);
        torus1.position.set(0, 0, 0);
        scene.add(torus1);

        // Create torus2 (vertical)
        const torus2 = new THREE.Mesh(torusGeometry2, material2);
        torus2.position.set(0, 0, 0);
        torus2.rotation.x = Math.PI / 2; // Rotate to make it vertical
        scene.add(torus2);

        const torus3 = new THREE.Mesh(torusGeometry3, material3);
        torus3.position.set(0, 0, 0);
        torus3.rotation.z = Math.PI / 2; // Rotate to make it vertical
        scene.add(torus3);

        // Add controls to GUI
        const positionFolder = gui.addFolder('Positions');
        positionFolder.add(torus1.position, 'x').min(-3).max(3).step(0.01).name('torus1-position-x');
        positionFolder.add(torus2.position, 'y').min(-3).max(3).step(0.01).name('torus2-position-y');
        positionFolder.close();

        const appearanceFolder = gui.addFolder('Appearance');
        appearanceFolder.add(torus1, 'visible').name('torus1 visible');
        appearanceFolder.add(torus2, 'visible').name('torus2 visible');
        appearanceFolder.addColor(torus1.material, 'color').name('color1');
        appearanceFolder.addColor(torus2.material, 'color').name('color2');
        appearanceFolder.addColor(torus3.material, 'color').name('color3');
        appearanceFolder.close();

        const rotationFolder = gui.addFolder('Rotation');
        rotationFolder.add({ speed: rotationSpeed }, 'speed', 0, 0.1).onChange((value: number) => {
            setRotationSpeed(value);
        }).name('rotation speed');
        rotationFolder.add({ startStop: isRotating }, 'startStop').name('Toggle Rotation').onChange((value: boolean) => {
            setIsRotating(value);
        });

        // Stars background
        const addStar = () => {
            const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
            const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(starGeometry, starMaterial);
            const [x, y, z] = Array(3).fill(1).map(() => THREE.MathUtils.randFloatSpread(100));
            star.position.set(x, y, z);
            scene.add(star);
        };
        Array(200).fill(3).forEach(addStar);

        const animate = () => {
            requestAnimationFrame(animate);

            if (isRotating) {
                torus1.rotation.x += rotationSpeed;
                torus2.rotation.y += rotationSpeed;
                torus3.rotation.x += rotationSpeed;
            }

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
    }, [isRotating, rotationSpeed]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <canvas className="webgl w-full h-full" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default ThreeAnimation;
