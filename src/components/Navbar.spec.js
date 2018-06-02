import Navbar from '/src/components/Navbar';
import {mount} from '@vue/test-utils';

describe("Navbar", () => {
    it("matches snapshot", () => {
      const wrapper = mount(Navbar);
      expect(wrapper.html()).toMatchSnapshot();
    });
});