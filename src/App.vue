<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    Tada
    <br/>
    <TerrysSchedule msg = i18n.messages.title />
    <br/>
    <Footer lang= i18n.messages.footer />
  </div>
</template>

<script>
import Vue from 'vue';

import VueI18n from 'vue-i18n';
import locales from '@/assets/json/locales.json';

import Cfg from '@/components/Cfg.js'
import TerrysSchedule from './components/TerrysSchedule.vue'
import Footer from '@/components/Footer.vue'


// ----------------------------------------
// Localization 
Vue.use(VueI18n);
const messages = {};
Object.keys(locales).forEach((locale) => {
  messages[locale] = require(`@/lang/${locale}.json`);
});

const i18n = new VueI18n({
  locale: Cfg.getters.locale,
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
  },
  data:  i18n
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
