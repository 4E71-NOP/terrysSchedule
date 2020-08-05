<template>
  <div id="navBar" class="navBar">
    <div class="navBarMenuItem" v-for="item in navBarItems" :key="item.id">
      <router-link class="navBarRouterLink" :to="{name: item.routeName}">
        <font-awesome-icon class="fa-2x" :icon="[item.iconGroup, item.iconName]" />
        &nbsp;
        {{ $t(item.i18n) }}
      </router-link>
    </div>
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
          iconGroup: "fas",
          iconName: "home",
        },
        {
          id: 1,
          routeName: "information",
          i18n: "navBar-information",
          iconGroup: "fas",
          iconName: "info-circle",
        },
      ],
    };
  },
};
</script>

