<template>
  <div class="slider-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    routerPath: {
      type: String,
      required: true
    },
    filePath: {
      type: String,
      required: true
    }
  },
  data () {
    selected: null
  },
  computed: {
    isActive () {
      return this.selected
    }
  }
}
</script>

<style scoped>

</style>
