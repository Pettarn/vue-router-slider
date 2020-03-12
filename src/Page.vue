<template>
  <div>
    <slider v-model="selected">
      <slider-item name="item1">
        <router-link></router-link>
      </slider-item>
      <slider-item></slider-item>
      <slider-item></slider-item>
      <slider-item></slider-item>
      <!-- n个 -->
    </slider>
    <slider-view v-model="selected"></slider-view>
  </div>
</template>

<script>
import Slider from './lib/Slider'
import SliderItem from './lib/SliderItem'
import SliderView from './lib/SliderView'


export default {
  data () {
    return {
      selected: null
    }
  },
  components: {
    Slider,
    SliderItem,
    SliderView
  }
}
</script>
