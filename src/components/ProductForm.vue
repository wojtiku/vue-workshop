<template>
  <LoadingStatus :isLoading="status.loading || saveStatus.loading" :isError="status.error">
    <form action="#" @submit.prevent="submit" class="box product-edit">
      <h2>Edit product</h2>

      <p v-if="saveStatus.error">
        <span class="lozenge">ERROR</span> Could not save the product.
      </p>

      <div class="form-row">
        <label for="edit-name">Name</label>
        <input id="edit-name" v-model.trim="$v.formProduct.name.$model" type="text"/>
      </div>

      <div class="form-row">
        <label for="edit-photo">Photo</label>
        <input id="edit-photo" v-model.trim.lazy="$v.formProduct.photo.$model" type="text"/>
        <img class="photo-preview" :src="formProduct.photo" v-style-when-broken/>
      </div>

      <div class="form-row">
        <label for="edit-desc">Description</label>
        <textarea id="edit-desc" v-model="$v.formProduct.description.$model"></textarea>
      </div>

      <div class="form-row">
        <label for="edit-color">Color</label>
        <input type="color" id="edit-color" v-model.trim="$v.formProduct.color.$model"/>
      </div>

      <div class="form-row">
        <label>Materials</label>
        <div>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Steel"/> Steel</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Wooden"/> Wooden</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Concrete"/> Concrete</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Plastic"/> Plastic</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Cotton"/> Cotton</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Granite"/> Granite</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Rubber"/> Rubber</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Metal"/> Metal</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Soft"/> Soft</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Fresh"/> Fresh</label>
          <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Frozen"/> Frozen</label>
        </div>
      </div>

      <div class="form-row">
        <label for="edit-department">Department</label>
        <select id="edit-department" v-model="$v.formProduct.department.$model">
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
        <input type="number" v-model.number="$v.formProduct.inStock.$model" id="edit-stock"/>
      </div>

      <div class="form-row">
        <label for="edit-price">Price</label>
        <input type="number" v-model.number="$v.formProduct.price.$model" id="edit-price"/>
      </div>

      <button :disabled="$v.$anyDirty === false || $v.$invalid" type="submit" class="btn">Save product</button>
      <span v-show="$v.$invalid" class="lozenge">All fields are required</span>
    </form>
  </LoadingStatus>
</template>

<script>
  import LoadingStatus from "/src/components/LoadingStatus";
  import {required, numeric} from 'vuelidate/lib/validators'
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        formProduct: {}
      }
    },
    computed: {
      ...mapGetters({
        id: "currentProductId",
        status: "currentProductStatus",
        currentProduct: "currentProduct",
        saveStatus: "saveProductStatus"
      })
    },
    watch: {
      currentProductId: {
        handler: "fetchCurrentProduct",
        immediate: true
      },
      currentProduct() {
        this.formProduct = {...this.currentProduct};
      }
    },
    methods: {
      submit() {
        if (!this.$v.$invalid) {
          this.saveProduct(this.formProduct)
            .then(() => {
              if (!this.saveStatus.error) {
                this.$router.push("/product/" + this.id)
              }
            });
        }
      },
      ...mapActions([
        "fetchCurrentProduct",
        "saveProduct"
      ])
    },
    validations: {
      formProduct: {
        name: {required},
        description: {required},
        photo: {required},
        color: {required},
        materials: {required},
        department: {required},
        inStock: {required, numeric},
        price: {required, numeric}
      }
    },
    components: {LoadingStatus}
  }
</script>

<style lang="scss" scoped>
  .form-row {
    $labelWidth: 150px;

    position: relative;
    padding-left: $labelWidth;
    margin-bottom: $gutter/2;

    & > label {
      position: absolute;
      margin-left: -$labelWidth;
      padding: 5px 3px;
    }
    label {
      display: block;
      margin-bottom: $gutter/6;
    }
  }

  .photo-preview {
    display: block;
    margin: $gutter/6 0;
    max-width: 300px;
    max-height: 300px;
  }
</style>
