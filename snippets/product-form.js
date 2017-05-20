const component = {
  // validations
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
  }
  // end validations
};