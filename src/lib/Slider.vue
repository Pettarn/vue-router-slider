<template>
  <div class="slider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    currentSelected: null
  },
  mounted () {
    this.currentSelected = this.value || this.$children[0].name
    this.$children.forEach((vm) => {
      vm.selected = this.currentSelected
    })
  }
}
</script>

<style scoped>

</style>
