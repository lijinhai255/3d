<template>
  <div>
    <div class="scene" ref="sceneDiv"></div>
  </div>
</template>

<script setup>
// import testVertex from "@/shader/test/Vertex.glsl";
import { onMounted, ref } from "vue";

// 初始化调整屏幕
import "@/three/init";

// 导入场景
import scene from "@/three/scene";

// 导入相机
import camera from "@/three/camera";

// 导入gui

import gui from "@/three/gui";

// 导入渲染器
import renderer from "@/three/renderer";

// 导入控制器
// import controls from "@/three/controls";

// 导入坐标轴

import axesHelper from "@/three/axesHelper";

// 每一帧的执行函数

import animate from "@/three/animate";

import createMesh from "@/three/createMesh";
console.log(gui);
// 场景元素 div
let sceneDiv = ref(null);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(0, 0, 10);
scene.add(camera);
// 加入辅助轴，帮助我们查看3维坐标轴
scene.add(axesHelper);

// 创建物体
createMesh();

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  // 渲染对象
  // 相机设置
  animate();
});
</script>
<script>
// Explicitly define the component name
export default {
  name: "MySceneComponent", // Changed from "Scene" to "MySceneComponent"
};
</script>
<style scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
