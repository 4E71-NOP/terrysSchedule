<template>
  <div id="terrrySchedule" class="RouterViewBlock">
    <h3>{{ $t('TSheader') }}</h3>
    <br />
    <br />
    <br />
    <table class="tblSelectionPlatform">
      <caption>{{$t('TSTblPlatform')}}</caption>
      <tr>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.pc}"
          @click="setPlatformAndRefresh('pc')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'windows']"></font-awesome-icon>PC
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.ps4}"
          @click="setPlatformAndRefresh('ps4')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'playstation']"></font-awesome-icon>PS4
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.xb1}"
          @click="setPlatformAndRefresh('xb1')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fab', 'xbox']"></font-awesome-icon>Xbox One
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.switch}"
          @click="setPlatformAndRefresh('switch')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fas', 'magic']"></font-awesome-icon>Switch
        </td>
      </tr>
    </table>
    <br />
    <br />
    <div v-if="updatedFetch===true">
      <span>Choisi : {{ SelectedPlatform }}</span>
      <br />from WarFrame API :
      <br />
      <span>timestamp = {{ WfData[SelectedPlatform].data.timestamp }}</span>
      <br />
      <span>localTimezone = {{ localTimezone }} / {{ new Date(WfData.pc.data.timestamp) }}</span>
      <br />
      <span>isDay = {{ WfData[SelectedPlatform].data.cetusCycle.isDay }}</span>
      <br />
      <span>activation = {{ WfData[SelectedPlatform].data.cetusCycle.activation }}</span>
      <br />
      <span>expiry = {{ WfData[SelectedPlatform].data.cetusCycle.expiry }}</span>
      <br />
      <span>shortString = {{ WfData[SelectedPlatform].data.cetusCycle.shortString }}</span>
      <br />
      <span>timeLeft = {{ WfData[SelectedPlatform].data.cetusCycle.timeLeft }}</span>

    </div>
  </div>
</template>

<script>
// ----------------------------------------

export default {
  name: "TerrysSchedule",
  data() {
    return {
      SelectedPlatform: "pc",
      updatedFetch: false,
      localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      tdListActive: {
        pc: true,
        ps4: false,
        xb1: false,
        switch: false,
      },
      dbg: "My name is TerrysSchedule.vue",
      WfData: {
        pc: { lastUpdate: 0, data: {} },
        ps4: { lastUpdate: 0, data: {} },
        xb1: { lastUpdate: 0, data: {} },
        switch: { lastUpdate: 0, data: {} },
      },
      appointments: [],
      calendar_settings: {
        style: "material_design", // ['flat_design', 'material_design']
        view_type: "Week", // ['Month', 'Day']
        split_value: 20, // Value % 60 === 0
        cell_height: 20, // !isNaN(Value)
        scrollToNow: true, // Boolean
        current_day: new Date(), // Valid date
      },
    };
  },
  methods: {
    setPlatformAndRefresh(val) {
      this.SelectedPlatform = val;
      for (let elm in this.tdListActive) {
        this.tdListActive[elm] = false;
      }
      this.tdListActive[val] = true;
      let dateVal = Date.now();
      //   console.log("Date stockée dans la section '"+val+"' = "+this.WfData[val].lastUpdate+" != "+dateVal );
      if (dateVal - this.WfData[val].lastUpdate > 3 * 1000) {
        // update the counters. We don't want to spam DE
        // console.log("Gap="+(dateVal - this.WfData[val].lastUpdate)/1000+"s -> Update!");
        // Fetching the data from DE
        // https://api.warframestat.us/pc (ou platform : pc,ps4,xb1,switch)
        console.log("Trying : " + "https://api.warframestat.us/" + val);
        fetch("https://api.warframestat.us/" + val, {
          method: "GET",
          "Content-Type": "application/json",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((res) => {
            this.WfData[val].data = res;
            this.WfData[val].lastUpdate = Date.now();
            this.updatedFetch = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};

</script>
