<template>
    <div id="Information" class="RouterViewBlock">
      <p>
        {{$t('information-t01')}}
        <a href="http://www.warframe.com" target="_blank">WarFrame</a>
        {{$t('information-t02')}}
      </p>
      <!-- <p>{{ getCurrentRoute }}</p> -->
    </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      dbg: "My name is Information.vue",
      currentRoute: this.$route.path,
    };
  },
  computed: {
    getCurrentRoute() {
      return "route = '" + this.$route.name + "'";
    },
  },
};
</script>

