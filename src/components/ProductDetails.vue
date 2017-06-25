<template>
  <LoadingStatus :isLoading="isLoading" :isError="isError">
    <article class="product">
      <img class="product--image" :src="product.photo" alt="" v-style-when-broken/>
      <div class="product--caption">
        <h1 class="product--name">
          {{ product.name }}
        </h1>
        <div class="product--category">
          Category: <a href="#">{{ product.department }}</a>
        </div>

        <p class="product--description">
          {{ product.description }}
        </p>
        <dl class="product--attributes">
          <dt>Color:</dt>
          <dd>
            <div class="color-swatch" :style="{ 'background-color': product.color }"></div>
          </dd>
          <dt>Materials:</dt>
          <dd>
            <ul class="product--materials">
              <li v-for="material in product.materials">
                {{ material }}
              </li>
            </ul>
          </dd>

          <dt>Availability:</dt>
          <dd>{{ quantityDescription }}</dd>

          <dt>Price:</dt>
          <dd class="price">
            {{ product.price | asCurrency }} <span v-show="product.price > 20" class="lozenge">free shipping</span>
          </dd>
        </dl>
      </div>
      <div class="product--footer">
        <div class="product--actions">
          <router-link class="btn" :to="`/product/${id}/edit`">Edit product</router-link>
        </div>
      </div>
    </article>
  </LoadingStatus>
</template>

<script>
  import {getProductById} from '/src/productService';
  import LoadingStatus from "/src/components/LoadingStatus";

  export default {
    props: {
      id: Number
    },
    data() {
      return {
        product: {},
        isLoading: false,
        isError: false
      }
    },
    created() {
      this.fetchProduct();
    },
    watch: {
      id() {
        this.fetchProduct();
      }
    },
    methods: {
      fetchProduct() {
        this.isLoading = true;
        this.isError = false;

        if (this.id >= 0) {
          getProductById(this.id)
            .then((p) => this.product = p)
            .catch(() => this.isError = true)
            .then(() => this.isLoading = false)
        } else {
          this.product = {};
          this.isLoading = false;
          this.isError = true;
        }
      }
    },
    computed: {
      quantityDescription() {
        if (!this.product.inStock || this.product.inStock <= 0) {
          return 'out of stock';
        } else if (this.product.inStock < 5) {
          return 'few in stock';
        } else {
          return 'plenty in stock'
        }
      }
    },
    components: {LoadingStatus}
  }
</script>

<style lang="scss" scoped>
  .product {
    @include box();
    @include clearfix();
    @include productCommons();

    &--image {
      position: relative;
      float: right;
      max-width: 300px;
      margin-left: $gutter;
      z-index: 1;
    }

    &--attributes {
      $verticalPadding: $gutter/3;
      position: relative;
      border-top: solid 1px #ccc;
      max-width: 400px;
      dt {
        padding: $verticalPadding;
        position: absolute;
        left: 0;
      }
      dd {
        margin: 0;
        padding: $verticalPadding $verticalPadding $verticalPadding 120px;

        border-bottom: solid 1px #ccc;

        ul {
          margin: 0;
          padding: 0 20px;
        }
      }
    }
  }
</style>
