<template>
  <div id="app">

    <Navbar />

    <ProductsList
      class="container"
      v-bind="{ products, isLoading }"
      :currentPage="page"
      @previous="onClickPrevious"
      @next="onClickNext"
    />

    <div class="container">
      <ProductDetails :product="product" />
    </div>

    <div class="container">
      <ProductForm :product="product" />
    </div>

  </div>
</template>

<script>
  import {getAllProducts} from '/src/productService';
  import Navbar from '/src/components/Navbar';
  import ProductsList from '/src/components/ProductsList';
  import ProductDetails from '/src/components/ProductDetails';
  import ProductForm from '/src/components/ProductForm';

  export default {
    data() {
      return {
        page: 1,
        products: [],
        isLoading: true
      }
    },
    created() {
      this.reloadProducts();
    },
    methods: {
      onClickNext() {
        this.page = this.page + 1;
      },
      onClickPrevious() {
        if (this.page > 0) {
          this.page = this.page - 1;
        }
      },
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch(() => this.products = [])
          .then(() => this.isLoading = false);
      }
    },
    computed: {
      product() {
        return (this.products.length > 0) ? this.products[0] : {};
      }
    },
    watch: {
      page() {
        this.reloadProducts();
      }
    },
    components: {
      Navbar,
      ProductsList,
      ProductDetails,
      ProductForm
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
