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
      <a class="btn" href="#less" @click.prevent="page -= 1">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
    </section>

    <section class="container">
      <ul class="product-list">
        <li class="product-list--product">
          <div class="ribbon" style="color: orangered;" />
            <img class="product-list--product--image" src="/product-photos/1.jpeg" alt=""/>
            <div class="product-list--product--caption">
              <h4 class="product-list--product--name">
                Product title</h4>
              <p class="product-list--product--description">
                Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </p>
            </div>
            <div class="product-list--product--footer">
              <p class="product-list--product--price price">
                $21.000  <span class="lozenge">free shipping</span>
              </p>

              <div class="product-list--product--actions">
                <a class="btn" href="#">View product</a>
              </div>
            </div>
        </li>
      </ul>
    </section>

    <div class="container">
      <article class="product">
          <img class="product--image" src="/product-photos/1.jpeg" alt=""/>
          <div class="product--caption">
            <h1 class="product--name">
              Product title</h1>
            <div class="product--department">
              Department: <a href="#">Electronics</a>
            </div>

            <p class="product--description">
              Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
              sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            <dl class="product--attributes">
              <dt>Color:</dt>
              <dd>
                <div class="color-swatch" style="background-color: orangered;"></div>
              </dd>
              <dt>Materials:</dt>
              <dd>
                <ul class="product--materials">
                  <li>wood</li>
                  <li>metal</li>
                  <li>plastic</li>
                </ul>
              </dd>

              <dt>Availability:</dt>
              <dd>a few</dd>

              <dt>Price:</dt>
              <dd class="price">
                $21.000 <span class="lozenge">free shipping</span>
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
        <h2>Edit product X</h2>

        <div class="form-row">
          <label for="edit-name">Name</label>
          <input id="edit-name" type="text" />
        </div>

        <div class="form-row">
          <label for="edit-photo">Photo</label>
          <input id="edit-photo" type="text" />
          <img class="photo-preview" src="/product-photos/1.jpeg" />
        </div>

        <div class="form-row">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc"></textarea>
        </div>

        <div class="form-row">
          <label for="edit-color">Color</label>
          <input type="color" id="edit-color" />
        </div>

        <div class="form-row">
          <label>Materials</label>
          <div>
            <label><input type="checkbox" value="Steel" /> Steel</label>
            <label><input type="checkbox" value="Wooden" /> Wooden</label>
            <label><input type="checkbox" value="Concrete" /> Concrete</label>
            <label><input type="checkbox" value="Plastic" /> Plastic</label>
            <label><input type="checkbox" value="Cotton" /> Cotton</label>
            <label><input type="checkbox" value="Granite" /> Granite</label>
            <label><input type="checkbox" value="Rubber" /> Rubber</label>
            <label><input type="checkbox" value="Metal" /> Metal</label>
            <label><input type="checkbox" value="Soft" /> Soft</label>
            <label><input type="checkbox" value="Fresh" /> Fresh</label>
            <label><input type="checkbox" value="Frozen" /> Frozen</label>
          </div>
        </div>

        <div class="form-row">
          <label for="edit-department">Department</label>
          <select id="edit-department">
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
          <input type="number" id="edit-stock" />
        </div>

        <div class="form-row">
          <label for="edit-price">Price</label>
          <input type="number" id="edit-price" />
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
        page: 1
      }
    },
    methods: {
      onClickNext() {
        this.page = this.page + 1;
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/style";
</style>
