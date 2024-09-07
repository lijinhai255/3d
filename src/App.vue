<template>
  <plan-list :data="userData.areaSales" />
</template>

<script>
import { ref } from "vue";
import planList from "./components/TableList.vue";

export default {
  name: "planList",
  components: { planList },
  props: {
    data: Array,
  },
  setup() {
    const userData = ref({
      today: 0,
      averageAge: 0,
    });
    return {
      userData,
    };
  },
};
</script>

<style lang="scss" scoped>
.plan-list {
  width: 100%;
  height: 100%;
  background: rgb(55, 55, 55);
  padding: 20px 40px;
  box-sizing: border-box;

  .title {
    font-size: 36px;
    margin-left: 20px;
  }

  .list {
    width: 100%;
    height: 880px;
    margin-top: 20px;
    padding: 30px 0;
    box-sizing: border-box;
    background: rgb(40, 40, 40);
  }
}
</style>
