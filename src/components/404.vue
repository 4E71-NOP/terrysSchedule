<template>
  <div id="404" class="RouterViewBlock">
    Dude... wait... what?<br>
    <span class="goBackButton">
		<button @click="goBack">{{$t('buttonGoBack')}}</button>
	</span>
  </div>
</template>

<script>
export default {
  name: "404",
  data() {
    return {
      dbg: "My name is 404.vue",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
