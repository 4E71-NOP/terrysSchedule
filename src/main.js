import Vue from 'vue'
import App from './App.vue'
import router from "@/router.js"; // 'router' as in "must be exactly 'router' and nobody told you!!!"
// import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHome, faInfoCircle, faMagic } from '@fortawesome/free-solid-svg-icons'
import { faWindows, faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'


library.add([faHome, faInfoCircle, faMagic, faWindows, faPlaystation, faXbox]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

new Vue({
  router,
  vuetify: new Vuetify( ),
  // store,
  render: h => h(App),
}).$mount('#app')
