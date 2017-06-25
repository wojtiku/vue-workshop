<template>
  <div id="app">

    <nav class="navbar container">
      <a class="navbar--brand"
         href="#"
         :title="appName"
      >
        {{ appName }}
      </a>
      <ul class="navbar--menu">
        <li class="active"><a href="#">Somewhere</a></li>
        <li class="active"><a href="#">Over</a></li>
        <li class="active"><a href="#">The rainbow</a></li>
      </ul>
    </nav>

    <section class="container">
      <a class="btn" href="#less" @click.prevent="(page) ? page -= 1 : 0">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
    </section>

    <section class="container">
      <ul class="product-list">
        <li
          v-for="product in products"
          :key="product.id"
          :class="{ highlight: product.price < 300 }"
          class="product-list--product"
        >
          <div class="ribbon" :style="{ color: product.color }" />
            <img class="product-list--product--image" :src="product.photo" alt=""/>
            <div class="product-list--product--caption">
              <h4 class="product-list--product--name">
                {{ product.name }}
              </h4>
              <p class="product-list--product--description">
                {{ product.description }}
              </p>
            </div>
            <div class="product-list--product--footer">
              <template v-if="product.inStock > 0">
                <p class="product-list--product--price price">
                  ${{ product.price }}  <span v-show="product.price > 20" class="lozenge">free shipping</span>
                </p>

                <div class="product-list--product--actions">
                  <a class="btn" href="#">View product</a>
                </div>
              </template>
              <template v-else>
                <span class="lozenge">out of stock</span>
                🐈🐕🐪
              </template>
            </div>
        </li>
      </ul>
    </section>

    <div class="container">
      <article class="product">
          <img class="product--image" :src="product.photo" alt=""/>
          <div class="product--caption">
            <h1 class="product--name">
              {{ product.name }}
            </h1>
            <div class="product--department">
              Department: <a href="#">{{ product.department }}</a>
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
                ${{product.price }} <span v-show="product.price > 20" class="lozenge">free shipping</span>
              </dd>
            </dl>
          </div>
          <div class="product--footer">
            <div class="product--actions">
              <a class="btn" href="#">Edit product</a>
            </div>
          </div>
      </article>
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
          <img class="photo-preview" :src="product.photo"/>
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
  export default {
    data() {
      return {
        appName: "Vue.js (work)shop",
        page: 1,
        products: [
          {
            "id": 0,
            "name": "My updated product",
            "price": "219.00",
            "department": "Home",
            "color": "#51452b",
            "description": "Consequatur nam distinctio modi et omnis odio optio. Ut ipsum voluptatem. Voluptatem est voluptatem a. Sed et et sunt aut. Error hic dolor quas velit aut omnis repudiandae.",
            "photo": "/product-photos/1.jpeg",
            "inStock": 3,
            "materials": [
              "Granite",
              "Plastic"
            ]
          },
          {
            "id": 1,
            "name": "Intelligent Soft Computer",
            "price": "280.00",
            "department": "Health",
            "color": "#126123",
            "description": "Est occaecati porro. Qui voluptatum nihil et voluptatem ea. Ut repellendus dicta velit quisquam totam sequi dolorum. Eius voluptatem asperiores consequatur non iusto atque et mollitia. Omnis sequi repudiandae.",
            "photo": "/product-photos/2.jpeg",
            "inStock": 7,
            "materials": [
              "Fresh"
            ]
          },
          {
            "id": 3,
            "name": "Awesome Granite Salad",
            "price": "809.00",
            "department": "Movies",
            "color": "#402a23",
            "description": "Ut ut dolores ut aut officia qui nemo eum voluptatem. Voluptas dolores qui voluptatem consequatur quam itaque. Ullam voluptatem in dolorem repellat non aut vero ea.",
            "photo": "/product-photos/3.jpeg",
            "inStock": 10,
            "materials": [
              "Rubber"
            ]
          },
          {
            "id": 4,
            "name": "Rustic Cotton Cheese",
            "price": "601.00",
            "department": "Health",
            "color": "#18047b",
            "description": "Et inventore qui doloremque vel. Ut nulla quae nobis aut. Ipsam ut impedit sed consequatur illo neque alias ipsum.",
            "photo": "/product-photos/4.jpeg",
            "inStock": 6,
            "materials": [
              "Wooden",
              "Metal",
              "Frozen",
              "Soft",
              "Rubber"
            ]
          },
          {
            "id": 5,
            "name": "My updated product",
            "price": "219.00",
            "department": "Home",
            "color": "#51452b",
            "description": "Consequatur nam distinctio modi et omnis odio optio. Ut ipsum voluptatem. Voluptatem est voluptatem a. Sed et et sunt aut. Error hic dolor quas velit aut omnis repudiandae.",
            "photo": "/product-photos/5.jpeg",
            "inStock": 3,
            "materials": [
              "Granite",
              "Plastic"
            ]
          }
        ]
      }
    },
    methods: {
      onClickNext() {
        this.page = this.page + 1;
      }
    },
    computed: {
      product() {
        return (this.products.length > 0) ? this.products[0] : {};
      },
      quantityDescription() {
        if (!this.product.inStock || this.product.inStock <= 0) {
          return 'out of stock';
        } else if (this.product.inStock < 5) {
          return 'few in stock';
        } else {
          return 'plenty in stock'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
