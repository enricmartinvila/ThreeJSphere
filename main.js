import * as THREE from 'three';
import './style.css'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

//Scene
const scene = new THREE.Scene();

//Red Cube
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: '#13c2c2', roughness: 0.5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}



//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);


//Camera
const camera = new THREE.PerspectiveCamera(45 , sizes.width/sizes.height, 0.5);
camera.position.z = 20;
scene.add(camera);



//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);

//Render
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3;

//Resizee

window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
});


const loop = () => {
  controls.update();
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
}
loop();


// Timeline
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z: 0, x:0, y:0}, {z:1 , x:1, y:1});
tl.fromTo('nav', { y: '-100%'}, {y: '0%'});
tl.fromTo( '.title' , {opacity: 0}, {opacity: 1});


//Mouse Animation Color
let mouseDown = false;
let rgb = [19, 194, 194];
window.addEventListener('mousedown', () => {mouseDown = true;});
window.addEventListener('mouseup', () => {mouseDown = false;});

window.addEventListener('mousemove', (event) => {
  if(mouseDown){
    rgb = [
      Math.round(event.clientX / sizes.width * 255),
      Math.round(event.clientX / sizes.height * 255),
      150
    ];
    material.color.setRGB(rgb[0]/255, rgb[1]/255, rgb[2]/255);
  }
});