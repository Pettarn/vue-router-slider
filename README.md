# vue-router-slider

> A component for Vue that can slide viewport from left/right to right/left to change router.

## Install
      yarn add @pettarn/vue-router-slider --dev

## Usage

main.js:

      import SliderView from '@pettarn/vue-router-slider'
      Vue.use(SliderView)

xxx.vue:

      <template>
      ...
        <slider-view
          v-model="selected"
          :routerPathList="routerPathList"
          :routerNameList="routerNameList"
          :compList="compList"
        ></slider-view>
      ...
      </template>

## 注
It has been registered globally in `vue.use`, so it is not necessary to register components in `xxx.vue` file.

