<template>
  <div class="timer" v-bind:class="{timerExpired: expired}">{{content}}</div>
</template>

<script>
export default {
  name: "Timer",
  mounted: function () {
    this.timerUpdate();
  },
  props: {
    targetDate: { type: Date, default: 0 },
  },
  data() {
    return {
      dbg: "My name is Timer.vue",
      content: "...",
      interval: 1000,
      expired: 0,
    };
  },
  methods: {
    timerUpdate() {
      //   console.log("targetDate=" + this.targetDate);
      if (this.targetDate != 0 && this.targetDate >= Date.now()) {
        let c = this.targetDate - Date.now();
        this.content = this.$parent.millisecondsToHumanTime(c);
      } else {
        this.content = this.$t("Ts.fissuresTbl.expired");
        this.expired = 1;
      }
      setTimeout(this.timerUpdate, this.interval);
    },
  },
};
</script>
