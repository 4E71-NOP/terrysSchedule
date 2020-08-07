<template>
  <div id="terrrySchedule" class="RouterViewBlock">
    <h3>{{ $t('Ts.p01') }}</h3>
    <br />
    <br />
    <br />
    <table class="tblSelectionPlatform">
      <caption>{{$t('Ts.tbl01Caption')}}</caption>
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
        <!-- <td
          class="tblSelectionPlatformTd"
          v-bind:class="{tblSelectionPlatformTdActive: tdListActive.switch}"
          @click="setPlatformAndRefresh('switch')"
        >
          <font-awesome-icon class="fa-2x iconPlatform" :icon="['fas', 'magic']"></font-awesome-icon>Switch
        </td>-->
      </tr>
    </table>
    <br />
    <br />
    <div v-if="updatedFetch===true && WfData[SelectedPlatform].lastUpdate">
      <p>{{$t("Ts.p02")}}</p>
      <p>{{$t("Ts.p03")}} {{ localTimezone }}</p>
      <p>{{$t("Ts.p04")}} {{new Date(WfData[SelectedPlatform].data.timestamp) }}</p>
      <br />
      <br />

      <table class="tblEvents">
        <caption>{{$t("Ts.eventsTblCaption") }}</caption>
        <tbody>
        <tr
          v-for="el in huntEidolonSchedule"
          :key="el.id"
          v-bind:class="{tblEventsTrShift: el.even}"
        >
          <td v-bind:class="{tblEventsTdMonthShift: el.start.monthClass}">{{el.start.month}}</td>
          <td v-bind:class="{tblEventsTdDayShift: el.start.dayClass}">{{el.start.day}}</td>
          <td v-bind:class="{tblEventsTdDayShift: el.start.dayClass}">{{el.start.hour}}</td>
          <td v-bind:class="{tblEventsTdMonthShift: el.end.monthClass}">{{el.end.month}}</td>
          <td v-bind:class="{tblEventsTdDayShift: el.end.dayClass}">{{el.end.day}}</td>
          <td v-bind:class="{tblEventsTdDayShift: el.end.dayClass}">{{el.end.hour}}</td>
        </tr>
        </tbody>
      </table>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
// ----------------------------------------
// Notes:
// *  The switch part requires CORS/Access-Control-Allow-Origin header.
//    The code is non the less present but commented in case of a change.

export default {
  name: "TerrysSchedule",
  data() {
    return {
      dbg: "My name is TerrysSchedule.vue",
      tdListActive: {
        pc: true,
        ps4: false,
        xb1: false,
        // switch: false,
      },
      SelectedPlatform: "pc",
      updatedFetch: false,
      localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      huntEidolonSchedule: {},
      WfData: {
        pc: { lastUpdate: 0, data: {} },
        ps4: { lastUpdate: 0, data: {} },
        xb1: { lastUpdate: 0, data: {} },
        // switch: { lastUpdate: 0, data: {} },
      },
    };
  },
  methods: {
    twoDigitNbr(s) {
      return s < 10 ? "0" + s : s;
    },

    async setPlatformAndRefresh(val) {
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
        await fetch("https://api.warframestat.us/" + val, {
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
          })
          .catch((err) => {
            console.log(err);
          });

        // Now that we have data we feed the schedule with new events
        // The recieved timestamp has the 'second precision' (000millisecond)
        //
        let obj = this.WfData[val].data; //Shortcut
        let huntStart =
          obj.cetusCycle.isDay == true
            ? new Date(obj.cetusCycle.expiry).getTime()
            : new Date(obj.cetusCycle.activation).getTime(); // Depending on the day/night state we take expiry or activation timestamp
        this;
        var lastStartTuple = { month: 0, day: 0 };
        var lastEndTuple = { month: 0, day: 0 };
        var startMonthTrack = true;
        var startDayTrack = true;
        var endMonthTrack = true;
        var endDayTrack = true;
        for (let n = 0; n < 30; n++) {
          let s = new Date(huntStart);
          let e = new Date(huntStart + 50 * 60 * 1000);
          if (s.getMonth() != lastStartTuple.month) {
            startMonthTrack = !startMonthTrack;
          }
          if (s.getDay() != lastStartTuple.day) {
            startDayTrack = !startDayTrack;
          }
          if (e.getMonth() != lastEndTuple.month) {
            endMonthTrack = !endMonthTrack;
          }
          if (e.getDay() != lastEndTuple.day) {
            endDayTrack = !endDayTrack;
          }
          // console.log ("nEven ="+n%2);
          this.huntEidolonSchedule[n] = {
            id: n,
            even: n % 2 == 0 ? true : false,
            start: {
              monthClass: startMonthTrack,
              month:
                s.getMonth() != lastStartTuple.month
                  ? this.$t("month." + s.getMonth())
                  : "",
              dayClass: startDayTrack,
              day:
                s.getDay() != lastStartTuple.day
                  ? this.$t("day." + s.getDay())
                  : "",
              hour:
                this.twoDigitNbr(s.getHours()) +
                ":" +
                this.twoDigitNbr(s.getMinutes()),
            },
            end: {
              monthClass: endMonthTrack,
              month:
                e.getMonth() != lastEndTuple.month
                  ? this.$t("month." + e.getMonth())
                  : "",
              dayClass: endDayTrack,
              day:
                e.getDay() != lastEndTuple.day
                  ? this.$t("day." + e.getDay())
                  : "",
              hour:
                this.twoDigitNbr(e.getHours()) +
                ":" +
                this.twoDigitNbr(e.getMinutes()),
            },
          };
          lastStartTuple = { month: s.getMonth(), day: s.getDay() };
          lastEndTuple = { month: e.getMonth(), day: e.getDay() };
          huntStart = huntStart + 150 * 60 * 1000;
        }
        this.WfData[val].lastUpdate = Date.now();
        this.updatedFetch = true;
        // let a = new Date();
        // a.getTimezoneOffset
      }
    },
  },
};
</script>
