<template>
  <div id="terrrySchedule" class="RouterViewBlock">
    <h3>{{ $t('TSheader') }}</h3>
    <table class="tblSelectionPlatform">
      <caption>{{$t('TSTblPlatform')}}</caption>
      <tr>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.pc}"
          @click="clickOnTd('pc')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'windows']"></font-awesome-icon>PC
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.ps4}"
          @click="clickOnTd('ps4')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'playstation']"></font-awesome-icon>PS4
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.xb1}"
          @click="clickOnTd('xb1')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'xbox']"></font-awesome-icon>Xbox One
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.switch}"
          @click="clickOnTd('switch')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fas', 'magic']"></font-awesome-icon>Switch
        </td>
      </tr>
    </table>
    <br />
    <br />
    <span>Choisi : {{ SelectedPlatform }}</span>
    <br />
    <span>Td : {{ clickOnTdVal }}</span>
  </div>
</template>

<script>
//<i class="fas fa-desktop"></i>
//<i class="fas fa-magic"></i>
//<i class="fas fa-info-circle"></i>
//<i class="fab fa-playstation"></i>
//<i class="fab fa-xbox"></i>
//<i class="fas fa-home"></i>

// import for fetching the data from DE
// https://api.warframestat.us/pc (ou platform : pc,ps4,xb1,switch)

export default {
  name: "TerrysSchedule",
  data() {
    return {
      SelectedPlatform: "pc",
      clickOnTdVal: false,
      tdListActive: {
        pc: true,
        ps4: false,
        xb1: false,
        switch: false,
      },
      dbg: "My name is TerrysSchedule.vue",
    };
  },
  methods: {
    clickOnTd(val) {
      this.SelectedPlatform = val;
      for (let elm in this.tdListActive) {
        this.tdListActive[elm] = false;
      }
      this.tdListActive[val] = true;
    },
  },
};
</script>