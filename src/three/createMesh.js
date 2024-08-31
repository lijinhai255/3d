import City from "./mesh/City";
import scene from "./scene";

let city;
export default function createMesh() {
  // 创建城市
  city = new City(scene);
}

export function updateMesh(time) {
  city.update(time);
}
