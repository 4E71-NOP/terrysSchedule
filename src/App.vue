<template>
  <div id="app">
    <Title />
    <TerrysSchedule />
    <Footer msg="tada" />
  </div>
</template>

<script>
// import Vue from 'vue';

// import VueI18n from 'vue-i18n';
// import locales from '@/assets/json/locales.json';

// import Cfg from '@/components/Cfg.js'
import Title from "@/components/Title.vue";
import TerrysSchedule from "./components/TerrysSchedule.vue";
import Footer from "@/components/Footer.vue";

// ----------------------------------------
// Localization
// Vue.use(VueI18n);
// const messages = {};
// Object.keys(locales).forEach((locale) => {
//   messages[locale] = require(`@/lang/${locale}.json`);
// });

// const i18n = new VueI18n({
//   locale: Cfg.getters.locale,
//   fallbackLocale: 'en',
//   messages,
// });

// ----------------------------------------
// There we go!
export default {
  name: "App",
  components: {
    Title,
    TerrysSchedule,
    Footer,
  },
  // data:  i18n
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.title {
  width: 90%;
  display: block;
  margin: 15px;

  padding: 10px;
  background-color: teal;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 10px 5px #00000080;
  font-weight: bold;

}

.terrrySchedule {
  width: 90%;
  display: block;
  margin: 15px;
  min-height: 256px;

  padding: 10px;
  background-color:ghostwhite;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 10px 5px #00000080;
}

.footer {
  display: block;
  margin: 15px;
  position: fixed;
  bottom: 0;

  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;

  background-color: #004080;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  text-align: right;
  box-shadow: 0px 10px 5px #00000080;

}
</style>
