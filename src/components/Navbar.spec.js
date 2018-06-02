import Navbar from '/src/components/Navbar';
import {mount, RouterLinkStub} from '@vue/test-utils';

describe("Navbar", () => {
    it("matches snapshot", () => {
      const wrapper = mount(Navbar, {
        stubs: {
          RouterLink: RouterLinkStub
        }
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
});