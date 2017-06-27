<template>
  <div id="app">

    <Navbar />

    <ProductsList
      class="container"
      v-bind="{ products, isLoading, page }"
      @previous="onClickPrevious"
      @next="onClickNext"
    />

    <div class="container">
      <ProductDetails :product="product" />
    </div>

    <div class="container">

      <form action="#" class="box product-edit">
        <h2>Edit product</h2>

        <div class="form-row">
          <label for="edit-name">Name</label>
          <input id="edit-name" v-model.trim="product.name" type="text"/>
        </div>

        <div class="form-row">
          <label for="edit-photo">Photo</label>
          <input id="edit-photo" v-model.trim.lazy="product.photo" type="text"/>
          <img class="photo-preview" :src="product.photo" v-style-when-broken/>
        </div>

        <div class="form-row">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc" v-model="product.description"></textarea>
        </div>

        <div class="form-row">
          <label for="edit-color">Color</label>
          <input type="color" id="edit-color" v-model.trim="product.color"/>
        </div>

        <div class="form-row">
          <label>Materials</label>
          <div>
            <label><input type="checkbox" value="Steel" v-model="product.materials"/> Steel</label>
            <label><input type="checkbox" value="Wooden" v-model="product.materials"/> Wooden</label>
            <label><input type="checkbox" value="Concrete" v-model="product.materials"/> Concrete</label>
            <label><input type="checkbox" value="Plastic" v-model="product.materials"/> Plastic</label>
            <label><input type="checkbox" value="Cotton" v-model="product.materials"/> Cotton</label>
            <label><input type="checkbox" value="Granite" v-model="product.materials"/> Granite</label>
            <label><input type="checkbox" value="Rubber" v-model="product.materials"/> Rubber</label>
            <label><input type="checkbox" value="Metal" v-model="product.materials"/> Metal</label>
            <label><input type="checkbox" value="Soft" v-model="product.materials"/> Soft</label>
            <label><input type="checkbox" value="Fresh" v-model="product.materials"/> Fresh</label>
            <label><input type="checkbox" value="Frozen" v-model="product.materials"/> Frozen</label>
          </div>
        </div>

        <div class="form-row">
          <label for="edit-department">Department</label>
          <select id="edit-department" v-model="product.department">
            <option disabled value="">Wybierz dział...</option>
            <option>Books</option>
            <option>Movies</option>
            <option>Music</option>
            <option>Games</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Home</option>
            <option>Garden</option>
            <option>Tools</option>
            <option>Grocery</option>
            <option>Health</option>
            <option>Beauty</option>
            <option>Toys</option>
            <option>Kids</option>
            <option>Baby</option>
            <option>Clothing</option>
            <option>Shoes</option>
            <option>Jewelery</option>
            <option>Sports</option>
            <option>Outdoors</option>
            <option>Automotive</option>
            <option>Industrial</option>
          </select>
        </div>

        <div class="form-row">
          <label for="edit-stock">In stock</label>
          <input type="number" v-model.number="product.inStock" id="edit-stock"/>
        </div>

        <div class="form-row">
          <label for="edit-price">Price</label>
          <input type="number" v-model.number="product.price" id="edit-price"/>
        </div>

        <button type="submit" class="btn">Save product</button>
      </form>
    </div>

  </div>
</template>

<script>
  import {getAllProducts} from '/src/productService';
  import Navbar from '/src/components/Navbar';
  import ProductsList from '/src/components/ProductsList';
  import ProductDetails from '/src/components/ProductDetails';

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
      ProductDetails
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
