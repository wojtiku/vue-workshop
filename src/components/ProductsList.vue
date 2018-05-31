<template>
  <div>
    <p>
      <a class="btn" href="#less" @click.prevent="$emit('previous')">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="$emit('next')">Next page</a>
    </p>

    <LoadingStatus :isLoading="isLoading">
      <ul class="product-list">
        <ProductsListItem
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </ul>
    </LoadingStatus>
  </div>
</template>

<script>
  import LoadingStatus from "/src/components/LoadingStatus";
  import ProductsListItem from "/src/components/ProductsListItem";

  export default {
    props: {
      page: {
        type: Number,
        default: 0
      },
      isLoading: Boolean,
      products: Array
    },
    components: {
      ProductsListItem,
      LoadingStatus
    }
  }
</script>

<style lang="scss" scoped>
  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;

    &--product {
      $inRow: 4;
      flex-basis: calc(#{100%/$inRow} - #{$gutter});
    }
  }
</style>
