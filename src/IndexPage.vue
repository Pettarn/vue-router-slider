<template>
  <div id="app">
    <div class="headbar">
      <router-link class="link" tag="div" to="/a">1</router-link>
      <router-link class="link" tag="div" to="/b">2</router-link>
      <router-link class="link" tag="div" to="/c">3</router-link>
    </div>
    <slider-view
      v-model="selected"
      :routerPathList="routerPathList"
      :routerNameList="routerNameList"
      :compList="compList"
    ></slider-view>
  </div>
</template>

<script>
import SliderView from "./lib/SliderView";
import Item1 from './components/item1'
import Item2 from './components/item2'
import Item3 from './components/item3'

export default {
  components: {
    SliderView
  },
  data() {
    return {
      selected: "item1",
      routerNameList: ["item1", "item2", "item3"],
      routerPathList: ["/a", "/b", "/c"],
      compList: [
        Item1,
        Item2,
        Item3
      ]
    };
  }
};
</script>

<style scoped>
.headbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 200px;
  background-color: pink;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}
</style>
