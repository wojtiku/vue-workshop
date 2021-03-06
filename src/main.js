import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import { sync } from 'vuex-router-sync';
import store from '/src/store';
import App from '/src/App.vue'
import ProductsList from '/src/components/ProductsList';
import ProductDetails from '/src/components/ProductDetails';
import ProductForm from '/src/components/ProductForm';
import asCurrency from '/src/filters/asCurrency';

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.filter("asCurrency", asCurrency);

Vue.directive(
  "style-when-broken", function (el) {
    el.classList.remove("broken-image");
    if (!el.onerror) {
      el.onerror = () => {
        el.classList.add("broken-image");
      };
    }
  }
);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ProductsList
    },
    {
      path: '/product/:productId',
      component: ProductDetails,
    },
    {
      path: '/product/:productId/edit',
      component: ProductForm,
    }
  ]
});

sync(store, router);

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app');