import Vue from 'vue';
import Vuex from 'vuex';
import {getAllProducts, getProductById, updateProduct} from '/src/productService';

Vue.use(Vuex);

const withId = (id) => (el) => el.id === id;

const store = {
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {},
    saveProductStatus: {}
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => {
      if (rootState.route && rootState.route.query.page) {
        return +rootState.route.query.page
      }
      return 1
    },
    currentProductId: (state, getters, rootState) => {
      if (rootState.route && rootState.route.params.productId) {
        return +rootState.route.params.productId
      }
      return 1
    },
    products: (state) => state.products,
    productsStatus: (s) => s.productsStatus,
    currentProduct: (s, g) => s.products.find(withId(g.currentProductId)),
    currentProductStatus: (s) => s.currentProductStatus,
    saveProductStatus: (s) => s.saveProductStatus
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    changeProductsStatus(state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
    },
    changeCurrentProductStatus(state, newCurrentProductStatus) {
      state.currentProductStatus = newCurrentProductStatus;
    },
    changeSaveProductStatus(state, newSaveProductStatus) {
      state.saveProductStatus = newSaveProductStatus;
    },
    updateOrAddProduct(state, updatedProduct) {
      const productIdx = state.products.findIndex(withId(updatedProduct.id));
      if (productIdx >= 0) {
        state.products.splice(productIdx, 1, updatedProduct);
      } else {
        state.products.push(updatedProduct);
      }
    }
  },
  actions: {
    updateProducts({ commit }, newProducts) {
      commit("updateProducts", newProducts);
      commit("changeProductsStatus", { loading: false });
    },
    fetchProducts({ commit, dispatch, getters }) {
      commit("changeProductsStatus", { loading: true });
      return getAllProducts(getters.currentPageNumber)
        .then((products => dispatch("updateProducts", products)))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit("changeProductsStatus", { error: e });
        });
    },
    fetchCurrentProduct({ commit, dispatch, getters }) {
      commit("changeCurrentProductStatus", { loading: true });
      return getProductById(getters.currentProductId)
        .then((product => {
          commit("updateOrAddProduct", product);
          commit("changeCurrentProductStatus", { loading: false });
        }))
        .catch((e) => commit("changeCurrentProductStatus", { error: e }));
    },
    saveProduct({ commit }, product) {
      commit("changeSaveProductStatus", { loading: true });
      return updateProduct(product)
        .then((p) => {
          commit("updateOrAddProduct", p);
          commit("changeSaveProductStatus", { loading: false });
        })
        .catch((e) => commit("changeSaveProductStatus", { error: e }));
    }
  }
};

export default new Vuex.Store(store);
export {store};
