import Vue from 'vue'
import App from './App.vue'
import router from "@/router.js"; // 'router' as in 'must be exactly 'router' and nobody told you!!!

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faHome, faInfoCircle, faDesktop, faMagic } from '@fortawesome/free-solid-svg-icons'

library.add([faHome, faInfoCircle, faDesktop, faMagic, faFontAwesome]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
