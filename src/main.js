import Vue from 'vue'
import App from '/src/App.vue'

Vue.config.productionTip = false


Vue.filter(
  "asCurrency",
  (price) => '$' + (+price).toFixed(2)
);

new Vue({
	render: h => h(App)
}).$mount('#app')
