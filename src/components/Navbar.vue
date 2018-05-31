<template>
    <nav class="navbar">
      <router-link class="navbar--brand" to="/">
        {{ appName }}
      </router-link>
      <ul class="navbar--menu">
        <li class="active"><a href="#">Somewhere</a></li>
        <li class="active"><a href="#">Over</a></li>
        <li class="active"><a href="#">The rainbow</a></li>
      </ul>
    </nav>
</template>

<script>

  export default {
    data() {
      return {
        appName: "Vue.js (work)shop"
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    @include box();
    line-height: 30px;
    @include clearfix();

    &--brand {
      font-size: 20px;
      float: left;
      margin-right: $gutter;
      color: $c-black;
      &:hover {
        text-decoration: none;
      }
    }

    &--menu {
      float: left;
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: inline-block;
        margin-right: $gutter/2;
      }
    }
  }
</style>
