<template>
  <div class="container">
    <div v-if="!!isLoading" class="spinner"></div>
    <slot v-else />
  </div>
</template>

<script>
  export default {
    props: {
      isLoading: {
        default: false
      }
    }
  }
</script>