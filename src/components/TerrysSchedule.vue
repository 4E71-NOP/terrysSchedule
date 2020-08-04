<template>
  <div id="terrrySchedule" class="terrrySchedule">
    <h3>{{ $t('TSheader') }}</h3>
    <p>{{ $t('invite1') }} <a href='http://www.warframe.com' target='_blank'>WarFrame</a> {{$t('invite2')}}</p>
  </div>
</template>

<script>
// import for fetching the data from DE

export default {
  name: "TerrysSchedule",
  data() {
    return {
      dbg: "My name is TerrysSchedule.vue",
    };
  },
};
</script>