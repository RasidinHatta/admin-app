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
        scene.background = new THREE.Color('#444444');
        scene.fog = new THREE.Fog(0x3f7b9d, 0, 750);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 3;
        camera.position.z = 6;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Adding lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xff9933, 0.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Create different materials for each axis
        const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red for X-axis
        const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green for Y-axis
        const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Blue for Z-axis

        // Create the X-axis
        const axesGeometryX = new THREE.BufferGeometry();
        axesGeometryX.setFromPoints([
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(5, 0, 0), // X-axis
        ]);
        const xAxisLine = new THREE.Line(axesGeometryX, xAxisMaterial);
        scene.add(xAxisLine);

        // Create the Y-axis
        const axesGeometryY = new THREE.BufferGeometry();
        axesGeometryY.setFromPoints([
            new THREE.Vector3(0, -5, 0),
            new THREE.Vector3(0, 5, 0), // Y-axis
        ]);
        const yAxisLine = new THREE.Line(axesGeometryY, yAxisMaterial);
        scene.add(yAxisLine);

        // Create the Z-axis
        const axesGeometryZ = new THREE.BufferGeometry();
        axesGeometryZ.setFromPoints([
            new THREE.Vector3(0, 0, -5),
            new THREE.Vector3(0, 0, 5), // Z-axis
        ]);
        const zAxisLine = new THREE.Line(axesGeometryZ, zAxisMaterial);
        scene.add(zAxisLine);


        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: '#777777',
            metalness: 0.6,
            roughness: 0.2,
            envMapIntensity: 0.5,
            side: THREE.DoubleSide,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        // const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 64);
        // const material = new THREE.MeshBasicMaterial({ color: '#3b4dad' });
        // const torus = new THREE.Mesh(torusGeometry, material);
        // torus.position.set(0, 2, 0);
        // scene.add(torus);

        const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.4, 200, 20, 2, 3);
        const material = new THREE.MeshStandardMaterial({
            color: '#049ef4', // This should be a blue color
            emissive: '#000000',
            roughness: 0,
            wireframe: true,
            metalness: 0.4,
            vertexColors: false,
            flatShading: false,
            fog: true,
            depthTest: true,
            depthWrite: true,
            side: THREE.DoubleSide,
        });


        const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
        torusKnot.position.set(0, 2, 0);
        scene.add(torusKnot);

        // Add the Positions folder
        const positionFolder = gui.addFolder('Positions');
        positionFolder.add(torusKnot.position, 'x').min(-3).max(3).step(0.01).name('position-x');
        positionFolder.add(torusKnot.position, 'y').min(-3).max(3).step(0.01).name('position-y');
        positionFolder.add(torusKnot.position, 'z').min(-3).max(3).step(0.01).name('position-z');
        positionFolder.close();

        // Add the Appearance folder
        const appearanceFolder = gui.addFolder('Appearance');
        appearanceFolder.add(torusKnot, 'visible');
        appearanceFolder.addColor(torusKnot.material, 'color');
        appearanceFolder.close();

        // Add the Rotation folder
        const rotationFolder = gui.addFolder('Rotation');
        rotationFolder.add(torusKnot.rotation, 'x').min(0).max(Math.PI * 2).step(0.01).name('rotation-x');
        rotationFolder.add(torusKnot.rotation, 'y').min(0).max(Math.PI * 2).step(0.01).name('rotation-y');
        rotationFolder.add(torusKnot.rotation, 'z').min(0).max(Math.PI * 2).step(0.01).name('rotation-z');

        // Add Rotation Speed
        rotationFolder.add({ speed: rotationSpeed }, 'speed', 0, 0.1).onChange((value: number) => {
            setRotationSpeed(value);
        }).name('rotation speed');

        // Add Start/Stop Control
        rotationFolder.add({ startStop: isRotating }, 'startStop').name('Toggle Rotation').onChange((value: boolean) => {
            setIsRotating(value);
        });

        const animate = () => {
            requestAnimationFrame(animate);

            if (isRotating) {
                // Update torus rotation for animation based on speed
                torusKnot.rotation.x += rotationSpeed;
                torusKnot.rotation.y += rotationSpeed;
                torusKnot.rotation.z += rotationSpeed;
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
