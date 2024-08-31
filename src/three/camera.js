import * as THREE from "three";

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  50000
);

export default camera;
