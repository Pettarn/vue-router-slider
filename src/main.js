import Vue from 'vue'
import App from './App.vue'
import router from './index'

import SliderView from '@pettarn/vue-router-slider'
Vue.use(SliderView)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
