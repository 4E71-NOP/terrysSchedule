<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <TerrysSchedule msg={i18n.locale} />
    <br/>
    <Footer lang= locales./>
  </div>
</template>

<script>
import TerrysSchedule from './components/TerrysSchedule.vue'
import Footer from './components/Footer.vue'
import Config from './components/Config.js'
import VueI18n from 'vue-i18n';
import locales from '@/assets/json/locales.json';

import Vue from 'vue';
Vue.use(VueI18n);

// ----------------------------------------
// Localization 
const messages = {};
Object.keys(locales).forEach((locale) => {
  messages[locale] = require(`@/lang/${locale}.json`);
});

const i18n = new VueI18n({
  locale: Config.getters.locale,
  fallbackLocale: 'en',
  messages,
});


// ----------------------------------------
// There we go!
export default {
  name: 'App',
  components: {
    TerrysSchedule,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
