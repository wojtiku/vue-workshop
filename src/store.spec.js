import {getAllProducts} from '/src/productService';
import {store} from '/src/store';

jest.mock('/src/productService', () => jest.genMockFromModule('./productService'));

describe("Store", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getters", () => {
    it("currentProduct", () => {
      const products = [{id: 1}, {id: 2}];
      const state = {
        products,
      };
      const mockGetters = {
        currentProductId: 2
      };

      expect(store.getters.currentProduct(state, mockGetters)).toBe(products[1]);
    });
  });

  describe("mutations", () => {
    describe("updateOrAddProduct", () => {
      let products;
      let state;

      beforeEach(() => {
        products = [{id: 1}, {id: 2}];
        state = {
          products,
        };
      });

      it("update", () => {
        const newProduct = { id: 1, foo: "bar" };

        store.mutations.updateOrAddProduct(state, newProduct);

        expect(state.products.length).toBe(2);
        expect(state.products[0]).toBe(newProduct);
      });

      it("add", () => {
        const newProduct = { id: 3, foo: "bar" };

        store.mutations.updateOrAddProduct(state, newProduct);

        expect(state.products.length).toBe(3);
        expect(state.products[2]).toBe(newProduct);
      });
    });
  });

  describe("actions", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    it("updateProducts", () => {
      const newProducts = [];
      store.actions.updateProducts({ commit }, newProducts);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith("updateProducts", newProducts);
      expect(commit).toHaveBeenCalledWith("changeProductsStatus", {loading: false});

    });

    it("fetchProducts with request succeeding", async () => {
      const products = [{}, {}];
      getAllProducts.mockResolvedValue(products);
      await store.actions.fetchProducts({ commit, dispatch, getters: {} });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith("changeProductsStatus", {loading: true});
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith("updateProducts", products);
    });

    it("fetchProducts with request failing", async () => {
      const error = new Error("testing");
      getAllProducts.mockRejectedValue(error);
      await store.actions.fetchProducts({ commit, dispatch, getters: {} });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith("changeProductsStatus", {loading: true});
      expect(commit).toHaveBeenLastCalledWith("changeProductsStatus", {error: error});
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith("updateProducts", []);
    });
  });

});