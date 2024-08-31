<template>
  <div class="main">
    <div class="buttons">
      <button class="button" @click="toggleFloorExplosion">
        {{ explosionButtonText }}
      </button>
      <button type="button" class="button" @click="getComponentProperty">
        构件属性
      </button>
      <button type="button" class="button" @click="getFloorsDetail">
        楼层信息
      </button>
      <button type="button" class="button" @click="getModelTree">
        目录树信息
      </button>
    </div>
    <div ref="bimContainer" class="bim-container"></div>
  </div>
</template>

<script>
import {
  BimfaceSDKLoader,
  BimfaceSDKLoaderConfig,
  Glodon,
} from "bimfacesdkloader"; // 确保已安装并正确引入SDK

export default {
  data() {
    return {
      viewer3D: null,
      model3D: null,
      app: null,
      isFloorExplosionActivated: false,
      explosionButtonText: "开启楼层爆炸",
      floorList: [],
      direction: { x: 5, y: 5, z: 5 },
      viewToken: "fa2afdcc9c41466494ac7ec78d4c4d33", // 使用有效的viewToken
    };
  },
  methods: {
    async initBimViewer() {
      try {
        const dom = this.$refs.bimContainer;
        const loaderConfig = new BimfaceSDKLoaderConfig();
        loaderConfig.viewToken = this.viewToken;
        const viewMetaData = await BimfaceSDKLoader.load(loaderConfig);

        if (viewMetaData.viewType === "3DView") {
          const webAppConfig =
            new Glodon.Bimface.Application.WebApplication3DConfig();
          webAppConfig.domElement = dom;
          webAppConfig.globalUnit =
            Glodon.Bimface.Common.Units.LengthUnits.Millimeter;

          this.app = new Glodon.Bimface.Application.WebApplication3D(
            webAppConfig
          );
          this.app.addView(this.viewToken);
          this.viewer3D = this.app.getViewer();

          this.viewer3D.addEventListener(
            Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
            () => {
              this.model3D = this.viewer3D.getModel();
              this.viewer3D.render();
              this.adjustViewerSize();
            }
          );
        }
      } catch (error) {
        console.error("Failed to load BIM model:", error);
        alert("无法加载 BIM 模型，请检查控制台以获取更多信息。");
      }
    },
    adjustViewerSize() {
      const resizeHandler = () => {
        if (this.viewer3D) {
          this.viewer3D.resize(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight - 40
          );
        }
      };
      window.addEventListener("resize", resizeHandler);
      resizeHandler();
    },
    async getFloors() {
      return new Promise((resolve, reject) => {
        this.viewer3D.getFloors((data) => {
          if (data) {
            const floorIds = data.map((floor) => floor.id);
            resolve(floorIds);
          } else {
            console.error("No floor data available.");
            reject(new Error("没有可用的楼层数据。"));
          }
        });
      });
    },
    toggleFloorExplosion() {
      console.log(this.isFloorExplosionActivated, this.floorList);
      if (!this.isFloorExplosionActivated) {
        if (this.floorList.length == 0) {
          this.viewer3D.getFloors(function (data) {
            if (!data) {
              console.log("No floor data.");
              return;
            }
            console.log(data, "data-data");
            for (let i = 0; i < data.length; i++) {
              this.floorList.push(data[i].id);
            }
            console.log(
              this.floorList,
              this.direction,
              "1-his.floorList, this.direction"
            );
            this.model3D.setFloorExplosion(3, this.floorList, this.direction);
            this.viewer3D.render();
          });
        } else {
          console.log(
            this.floorList,
            this.direction,
            "2-his.floorList, this.direction"
          );
          this.model3D.setFloorExplosion(3, this.floorList, this.direction);
          this.viewer3D.render();
        }
        this.setButtonText("btnFloorExplosion", "关闭楼层爆炸");
      } else {
        this.model3D.clearFloorExplosion();
        this.viewer3D.render();
        this.setButtonText("btnFloorExplosion", "开启楼层爆炸");
      }
      this.isFloorExplosionActivated = !this.isFloorExplosionActivated;
    },
    setButtonText(btnId, text) {
      this.explosionButtonText = text;
    },
    getComponentProperty() {
      if (this.viewer3D) {
        this.viewer3D
          .getModel()
          .getComponentProperty("307240", (objectdata) => {
            alert(JSON.stringify(objectdata));
          });
      }
    },
    getFloorsDetail() {
      if (this.viewer3D) {
        this.viewer3D.getModel().getFloors((objectdata) => {
          alert(JSON.stringify(objectdata));
        });
      }
    },
    getModelTree() {
      if (this.viewer3D) {
        this.viewer3D.getModel().getModelTree((objectdata) => {
          alert(JSON.stringify(objectdata));
        });
      }
    },
  },
  mounted() {
    this.initBimViewer();
  },
  beforeUnmount() {
    if (this.viewer3D) {
      this.viewer3D.destroy();
    }
    if (this.app) {
      this.app.destroy();
    }
    window.removeEventListener("resize", this.adjustViewerSize);
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.bim-container {
  flex: 1;
  background-color: #f0f0f0;
}

.buttons {
  padding: 10px;
  background-color: #11dab7;
  color: #fff;
}

.button {
  padding: 10px 20px;
  background-color: #11dab7;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
