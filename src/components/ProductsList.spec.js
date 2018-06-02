import LoadingStatus from '/src/components/LoadingStatus';
import ProductsList from '/src/components/ProductsList';
import {mockProductList} from '/src/test/mockProduct';
import {createLocalVue, RouterLinkStub, shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive("style-when-broken", ()=>{});

describe('ProductsList.vue', () => {
  let state;
  let actions;
  let getters;
  let store;

  function createWrapper() {
    store = new Vuex.Store({
      state,
      getters,
      actions
    });

    return shallowMount(ProductsList, {
      store,
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
        LoadingStatus
      }
    });
  }

  beforeEach(() => {
    state = {
      page: 1
    };
    actions = {
      fetchProducts: jest.fn()
    };
    getters = {
      products: () => mockProductList,
      productsStatus: () => ({}),
      currentPageNumber: (state) => state.page
    };
  });

  it('should match snapshot', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render product-list-items with correct products', () => {
    const wrapper = createWrapper();
    const items = wrapper.findAll({ name: "ProductsListItem" });

    expect(items).toHaveLength(4);
    expect(items.at(2).props().product).toBe(mockProductList[2]);
  });

  describe("Navigation buttons", () => {
    describe("Back button", () => {
      it('should point to the previous page', () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll(RouterLinkStub).at(0).props().to.query.page).toBe(state.page - 1);
      });

      it('should be hidden on the first page', () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll(RouterLinkStub).at(0).isVisible()).toBe(false);
      });
    });

    describe("Next button", () => {
      it('should point to the next page', () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll(RouterLinkStub).at(1).props().to.query.page).toBe(state.page + 1);
      });

      it('should be hidden when there are no products', () => {
        getters.products = () => [];

        const wrapper = createWrapper();
        expect(wrapper.findAll(RouterLinkStub).at(1).isVisible()).toBe(false);
      });
    });
  });

  describe("Refreshing data", () => {
    it('should fetch products when mounted', () => {
      createWrapper();
      expect(actions.fetchProducts).toHaveBeenCalledTimes(1);
    });

    it('should fetch products when page changes', () => {
      createWrapper();
      state.page += 1;
      expect(actions.fetchProducts).toHaveBeenCalledTimes(2);
    });
  });

  describe("Loading status", () => {
    function getLoadingStatusProps() {
      return createWrapper().find(LoadingStatus).props();
    }

    it('should not show spinner when products are there', () => {
      const props = getLoadingStatusProps();

      expect(props.isLoading).toBeFalsy();
      expect(props.isError).toBeFalsy();
    });

    it('should show spinner when loading', () => {
      getters.productsStatus = () => ({ loading: true });
      const props = getLoadingStatusProps();

      expect(props.isLoading).toBeTruthy();
      expect(props.isError).toBeFalsy();
    });

    it('should show message on error', () => {
      getters.productsStatus = () => ({ error: true });
      const props = getLoadingStatusProps();

      expect(props.isLoading).toBeFalsy();
      expect(props.isError).toBeTruthy();
    });
  })

});