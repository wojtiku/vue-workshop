import Vue from 'vue';
import Vuex from 'vuex';
import {getAllProducts} from '/src/productService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => {
      if (rootState.route && rootState.route.query.page) {
        return +rootState.route.query.page
      }
      return 1
    },
    products: (state) => state.products,
    productsStatus: (s) => s.productsStatus
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    changeProductsStatus(state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
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
    }
  }
});
