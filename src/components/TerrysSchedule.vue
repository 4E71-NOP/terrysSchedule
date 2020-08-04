<template>
  <div>
    tada
    <HubPanelWrap :title="headertext">
      <h1>{{msg}}</h1>
      <br />
      <br />
    </HubPanelWrap>
  </div>
</template>

<script>
export default {
  name: "TerrysSchedule",
  computed: {
    headertext() {
      return this.$t("title");
    },
  },
};
</script>