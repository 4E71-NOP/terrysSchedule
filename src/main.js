import Vue from 'vue'
import App from './App.vue'
import router from "@/router.js"; // 'router' as in 'must be 'router' and nobody told you'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
