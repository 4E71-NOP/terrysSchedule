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
    <span>Choisi : {{ SelectedPlatform }}</span>
    <br />
    <span>Td : {{ clickOnTdVal }}</span>
  </div>
</template>

<script>
export default {
  name: "TerrysSchedule",
  data() {
    return {
      SelectedPlatform: "pc",
      clickOnTdVal: false,
      lastUpdate: 0,
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
		console.log ("Trying : "+"https://api.warframestat.us/"+val);
        fetch("https://api.warframestat.us/"+val, {"method": "GET"})
          .then((res) => {
            if (res.ok) {
			  this.WfData[val].data = res.body;
			  this.WfData[val].lastUpdate = Date.now();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};

/*
fetch("https://jokes-database.p.rapidapi.com/", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "jokes-database.p.rapidapi.com",
        "x-rapidapi-key": this.apiKey
    }
})

*/
</script>
