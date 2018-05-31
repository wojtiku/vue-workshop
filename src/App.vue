<template>
  <div id="app">
    <Navbar class="container" />

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import Navbar from '/src/components/Navbar';

  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
