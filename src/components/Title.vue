<template>
  <div id="title" class="title">
    <div class="titleTerryBubble"></div>
    <span style="font-size:72px;font-family: 'Arial'; font-weight:bold;">
    {{ $t('title') }}
    </span>
    <div class="titleWarFrameLogo"></div>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      dbg: "My name is Title.vue",
    };
  },
};
</script>

