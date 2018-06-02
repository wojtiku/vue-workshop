import ProductsListItem from '/src/components/ProductsListItem.vue';
import mockProduct from '/src/test/mockProduct';
import {mount, RouterLinkStub} from '@vue/test-utils';

function instantiateWithProduct(partialProduct) {
  return mount(ProductsListItem, {
    propsData: {
      product: { ...mockProduct, ...partialProduct }
    },
    stubs: {
      RouterLink: RouterLinkStub
    },
    directives: {
      "style-when-broken": () => {}
    }
  });
}

describe('ProductsListItem.vue', () => {

  it('renders props.product.name when passed', () => {
    const name = "awesome product name";
    const vm = instantiateWithProduct({ name });
    expect(vm.html()).toContain(name);
  });

  describe('Highlights product', () => {
    it('should be highlighted if price is below 300', () => {
      const vm = instantiateWithProduct({ price: 299 });
      expect(vm.classes()).toContain("highlight");
    });

    it('should not be highlighted if price is 300 or more', () => {
      const vm = instantiateWithProduct({ price: 300 });
      expect(vm.classes()).not.toContain("highlight");
    });
  });

  describe("Hides footer", () => {
    const footerPriceSelector = '.product-list--product--footer .product-list--product--price';
    const footerLozengeSelector = '.product-list--product--footer > .lozenge';

    it('should show the footer when product is in stock', () => {
      const vm = instantiateWithProduct({ inStock: 1 });
      expect(vm.find(footerPriceSelector).exists()).toBe(true);
      expect(vm.find(footerLozengeSelector).exists()).toBe(false);
    });

    it('should hide the footer when product is NOT in stock', () => {
      const vm = instantiateWithProduct({ inStock: 0 });
      expect(vm.find(footerPriceSelector).exists()).toBe(false);
      expect(vm.find(footerLozengeSelector).exists()).toBe(true);
    });
  });
});