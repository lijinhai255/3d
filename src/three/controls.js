import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入相机
import camera from "@/three/camera";
// 导入渲染器
import renderer from "@/three/renderer";

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

export default controls;
