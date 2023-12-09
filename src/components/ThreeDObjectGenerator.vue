<template>
    <div ref="container" style="width: 100%; height: 100vh;"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  
  export default {
    name: 'ThreeDObjectGenerator',
    props: {
      objectColor: {
        type: String,
        
      },
      geometry: {
        type: Array,
        default: () => [],
      }
    },
    setup(props) {
      const container = ref(null);
      let scene, camera, renderer, mesh, controls;
  
      const initThreeJS = async () => {
        // Ensure container is rendered before initializing
        if (!container.value) {
          await nextTick();
          initThreeJS();
          return;
        }
  
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
        container.value.appendChild(renderer.domElement);
  
        const shape = new THREE.Shape();
        props.geometry.forEach(([x, y], index) => {
          if (index === 0) {
            shape.moveTo(x, y);
          } else {
            shape.lineTo(x, y);
          }
        });
        shape.closePath();
  
        const extrudeSettings = {
          steps: 2,
          depth: 16,
          bevelEnabled: false,
        };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.objectColor) });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
  
        camera.position.z = 5;
  
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
  
        animate();
      };
  
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
  
      watch(() => props.objectColor, (newColor) => {
        if (mesh && mesh.material) {
          mesh.material.color.set(newColor);
        }
      });
  
      onMounted(() => {
        initThreeJS();
      });
  
      onUnmounted(() => {
        if (renderer) {
          renderer.dispose();
        }
        if (controls) {
          controls.dispose();
        }
      });
  
      return { container };
    },
  };
  </script>
  