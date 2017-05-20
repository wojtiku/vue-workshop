const fetch = window.fetch;
const asJson = (resp) => resp.json();

export function getAllProducts(page) {
  let url;
  if (page) {
    url = `/api/products?page=${page}`;
  } else {
    url = "/api/products";
  }

  return fetch(url)
    .then(asJson);
}

export function getProductById(id) {
  return fetch("/api/products/" + id)
    .then(asJson);
}

export function updateProduct(product) {
  return fetch("/api/products/" + product.id, {
    method: 'PATCH',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify(product)
  })
    .then(asJson);
}
