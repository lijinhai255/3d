import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// console.log(THREE);
// 初始化场景
const scene = new THREE.Scene();

// // 场景天空盒
// const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/");
// const textureCube = textureCubeLoader.load([
//   "1.jpg",
//   "2.jpg",
//   "3.jpg",
//   "4.jpg",
//   "5.jpg",
//   "6.jpg",
// ]);

// scene.background = textureCube;
// scene.environment = textureCube;
// 导入hdr纹理
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync("./textures/023.hdr").then((texture) => {
  scene.background = texture;
  scene.environment = texture;
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});

// 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 10);
scene.add(light);

export default scene;
