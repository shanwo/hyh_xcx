<template>
  <div class="fix_box_water">
    水印水印
  </div>
</template>

<script>
export default {
  name: 'Watermark',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .fix_box_water{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

  }
</style>
