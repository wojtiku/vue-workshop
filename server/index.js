const express = require('express');
const app = express();
const f = require('faker');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const NUMBER_OF_PRODUCTS = 100;
const PRODUCTS_PER_PAGE = 8;
const store = [];

for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
  const materials = [];
  for (let j = f.random.number(5); j >= 0; j--) {
    materials.push(f.commerce.productMaterial());
  }

  const uniqueMaterials = materials.filter(function (item, pos, self) {
    return self.indexOf(item) === pos;
  });

  store.push({
    id: i,
    name: f.commerce.productName(),
    price: +f.commerce.price(),
    department: f.commerce.department(),
    color: f.internet.color(),
    description: f.lorem.sentences(),
    photo: `/product-photos/${f.random.number(29) + 1}.jpeg`,
    inStock: f.random.number(10),
    materials: uniqueMaterials,
    isFeatured: f.random.boolean || false
  });
}

app.get('/api/products', function (req, res) {
  const page = +req.query.page;
  const products = store.filter(e => !!e);

  if (!page) {
    console.log('Fetch all products');
    res.json(products);
  } else {
    const pageStartIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const pageEndIndex = page * PRODUCTS_PER_PAGE;

    if (page < 1 || pageEndIndex < products.length) {
      console.log(`Fetch ${page} page of products`);
      res.json(products.slice(pageStartIndex, pageEndIndex));
    } else {
      console.error(`Products page ${page} not found`);
      res.status(404).send();
    }
  }
});

app.get('/api/products/:id', function (req, res) {
  const id = +req.params.id;
  const product = store[id];

  if (product) {
    console.log(`Fetch product ${id}`);
    res.json(product);
  } else {
    console.error(`Product ${id} not found`);
    res.status(404).send();
  }
});

app.patch('/api/products/:id', function (req, res) {
  const id = +req.params.id;
  const update = req.body;
  const toUpdate = {};

  if (update.name) {
    toUpdate.name = update.name;
  }
  if (update.price != null) {
    toUpdate.price = update.price;
  }
  if (update.department) {
    toUpdate.department = update.department;
  }
  if (update.color) {
    toUpdate.color = update.color;
  }
  if (update.description) {
    toUpdate.description = update.description;
  }
  if (update.photo) {
    toUpdate.photo = update.photo;
  }
  if (update.materials) {
    toUpdate.materials = update.materials;
  }
  if (update.inStock != null) {
    toUpdate.inStock = update.inStock;
  }
  if (update.isFeatured) {
    toUpdate.isFeatured = update.isFeatured;
  }

  if (store[id]) {
    store[id] = Object.assign(store[id], toUpdate);
    res.json(store[id]);
    console.log(`Update product ${id}`);
  } else {
    console.error(`Product ${id} not found`);
    res.status(404).send();
  }
});


app.delete('/api/products/:id', function (req, res) {
  const id = +req.params.id;

  if (store[id]) {
    console.log(`Delete product ${id}`);
    store[id] = undefined;
    res.status(204).send();
  } else {
    res.status(404).send();
    console.error(`Product ${id} not found`);
  }
});

app.post('/api/products', function (req, res) {
  const newProduct = req.body;

  const requiredFields = [
    "name",
    "price",
    "materials",
    "department",
    "color",
    "description"
  ];

  const errors = requiredFields
    .filter(field => !newProduct[field])
    .reduce((errors, field) => {
      errors[field] = "This field is required";
      return errors;
    }, {});

  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
    return;
  }

  const toAdd = {
    id: store.length,
    name: newProduct.name,
    price: newProduct.price,
    department: newProduct.department,
    color: newProduct.color,
    description: newProduct.description,
    photo: 'https://unsplash.it/600/600?image=' + f.random.number(1083),
    materials: newProduct.materials,
    inStock: newProduct.inStock || 0,
    isFeatured: newProduct.isFeatured || false
  };
  store.push(toAdd);
  res.json(toAdd);
  console.log(`Add product ${toAdd.id}`);
});

app.listen(4567, function () {
  console.log('Product API listening on http://localhost:4567');
});
