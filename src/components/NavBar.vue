<template>
  <div id="navBar" class="navBar">
    <span class="navBarMenuItem" v-for="item in navBarItems" :key="item.id">
      <font-awesome-icon :icon="item.icon"/>
      <router-link :to="{name: item.routeName}">{{ $t(item.i18n) }}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      dbg: "My name is NavBar.vue",
      navBarItems: [
        {
          id: 0,
          routeName: "home",
          i18n: "navBar-home",
          icon: "faHome",
        },
        {
          id: 1,
          routeName: "information",
          i18n: "navBar-information",
          icon: "faInfoCircle",
        },
      ],
    };
  },
};
</script>

