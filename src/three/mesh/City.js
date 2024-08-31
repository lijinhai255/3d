import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import eventHub from "@/utils/eventHub";

export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    this.loader.setDRACOLoader(dracoLoader);
    this.loader.load("./model/city4.glb", (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);
    });

    eventHub.on("actionClick", (i) => {
      console.log(i);
      this.action.reset();
      this.clip = this.gltf.animations[i];
      this.action = this.mixer.clipAction(this.clip);
      this.action.play();
    });
  }

  update(time) {
    if (this.mixer) {
      this.mixer.update(time);
    }
  }

  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.999,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress);
        this.redcar.position.set(point.x, point.y, point.z);
        if (this.curveProgress + 0.001 < 1) {
          const point = this.curve.getPoint(this.curveProgress + 0.001);
          this.redcar.lookAt(point);
        }
      },
    });
  }
}
