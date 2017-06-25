import Vue from 'vue'
import Vuelidate from 'vuelidate';
import App from '/src/App.vue'

Vue.config.productionTip = false

Vue.use(Vuelidate);

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

new Vue({
	render: h => h(App)
}).$mount('#app');
