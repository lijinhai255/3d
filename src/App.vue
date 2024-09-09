<template>
  <div>
    <Scene />

    <BigScreen />
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Scene from "./components/Scene.vue";
import BigScreen from "@/components/BigScreen.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Scene,
    BigScreen,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
</style>
