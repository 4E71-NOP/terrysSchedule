<template>
  <v-app>
    <v-main>
      <div>
        <Title />
        <NavBar />
        <router-view />
        <Footer />
      </div>
    </v-main>
  </v-app>
</template>

<script>
// ----------------------------------------
import Vue from "vue";
import VueI18n from "vue-i18n";
import locales from "@/assets/json/locales.json";

// ----------------------------------------
import Title from "@/components/Title.vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

// ----------------------------------------
// Localization
Vue.use(VueI18n);

// From the language list in the locales.json file this will load and stuff the necessary parts in the array.
const messages = {};
Object.keys(locales).forEach((locale) => {
  messages[locale] = require(`@/lang/${locale}.json`);
});

// Create the i18n object
const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

// ----------------------------------------
// There we go!

export default {
  name: "App",

  components: {
    Title,
    NavBar,
    Footer,
  },

  data() {
    return {
      // locale: "fr",
    };
  },
  i18n, // we don't forget to feed the i18n stuff
};
</script>

<style>
@import "./assets/styles/mainStyle.css";
</style>
