import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from '/src/App.vue'
import ProductsList from '/src/components/ProductsList';

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.filter(
  "asCurrency",
  (price) => '$' + (+price).toFixed(2)
);

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
    { path: '/', component: ProductsList },
  ]
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
