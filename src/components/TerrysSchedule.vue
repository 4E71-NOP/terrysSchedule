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
      <p>{{$t("Ts.p04")}} {{ apiDataUpdate }}</p>
      <br />
      <br />

      <table class="tblEvents">
        <caption>{{$t("Ts.eventsTbl.caption") }}</caption>
        <thead>
          <tr>
            <td colspan="3">{{$t("Ts.eventsTbl.c1")}}</td>
            <td colspan="3">{{$t("Ts.eventsTbl.c2")}}</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in huntEidolonSchedule"
            :key="el.id"
            v-bind:class="{tblEventsTrShift: el.even}"
          >
            <td
              v-bind:class="{tblEventsTdMonthShift: el.start.monthClass}"
            >{{$t("month."+el.start.month)}}</td>
            <td v-bind:class="{tblEventsTdDayShift: el.start.dayClass}">{{$t("day."+el.start.day)}}</td>
            <td v-bind:class="{tblEventsTdDayShift: el.start.dayClass}">{{el.start.hour}}</td>
            <td
              v-bind:class="{tblEventsTdMonthShift: el.end.monthClass}"
            >{{$t("month."+el.end.month)}}</td>
            <td v-bind:class="{tblEventsTdDayShift: el.end.dayClass}">{{$t("day."+el.end.day)}}</td>
            <td v-bind:class="{tblEventsTdDayShift: el.end.dayClass}">{{el.end.hour}}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      {{$t("Ts.waiting")}}
      <br />

      <table class="tblFissures">
        <caption>{{$t("Ts.fissuresTbl.caption")}}</caption>
        <thead>
          <tr>
            <!-- <td>id</td> -->
            <td>{{$t("Ts.fissuresTbl.c1")}}</td>
            <td>{{$t("Ts.fissuresTbl.c2")}}</td>
            <td>{{$t("Ts.fissuresTbl.c3")}}</td>
            <td class="tblFissuresTdRight">{{$t("Ts.fissuresTbl.c4")}}</td>
            <td>{{$t("Ts.fissuresTbl.c5")}}</td>
            <td>{{$t("Ts.fissuresTbl.c6")}}</td>
            <td>{{$t("Ts.fissuresTbl.c7")}}</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in orderedFissures"
            :key="el.id"
            v-bind:class="{tblEventsTrShift: el.appeal}"
          >
            <!-- <td>{{el.id}}</td> -->
            <td>{{el.appeal}}/10</td>
            <td>{{el.tier}}</td>
            <td>{{$t("Ts.fissuresTbl.missionType."+el.type)}}</td>
            <td class="tblFissuresTdRight">
              <Timer :targetDate="el.targetDate" />
            </td>
            <td>{{el.endTime}}</td>
            <td>{{el.node}}</td>
            <td>{{el.enemy}}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>

<script>
// ----------------------------------------
// Notes:
// *  The switch part requires CORS/Access-Control-Allow-Origin header.
//    The code is non the less present but commented in case of a change.
import _ from "lodash";
import Timer from "@/components/Timer.vue";

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
      // Apeal is function of the expexted time spent to open the relic.
      appealTable: {
        Capture: 10,
        Extermination: 7,
        Rescue: 7,
        Sabotage: 7,
        Disruption: 5,
        Excavation: 5,
        Spy: 5,
        Defense: 3,
        "Mobile Defense": 3,
        Survival: 3,
        Defection: 0,
        Assault: 0,
        Hijack: 0,
        Interception: 0,
      },
      timeLeftUnits: {
        day: { v: 86400000, f: "day" },
        hour: { v: 3600000, f: "hour" },
        minute: { v: 60000, f: "minute" },
        second: { v: 1000, f: "second" },
      },
      fissures: {},
      // orderedFissuresTbl: {},
      WfData: {
        pc: { lastUpdate: 0, data: {} },
        ps4: { lastUpdate: 0, data: {} },
        xb1: { lastUpdate: 0, data: {} },
        // switch: { lastUpdate: 0, data: {} },
      },
    };
  },
  // Use of Lo(w)dash orderBy as the VueJs docs recommend it. Another dependency.
  computed: {
    orderedFissures: function () {
      return _.orderBy(
        this.fissures,
        ["appeal", "tier", "type"],
        ["desc", "asc", "asc"]
      );
    },
    apiDataUpdate: function () {
      return this.WfData[this.SelectedPlatform].data.timestamp
        ? new Date(this.WfData[this.SelectedPlatform].data.timestamp)
        : "...";
    },
  },

  methods: {
    nDigitNbr(n, l) {
      return n.toString().padStart(l, "0");
    },

    millisecondsToHumanTime(val) {
      var str = "";
      for (let t in this.timeLeftUnits) {
        let r = Math.floor(val / this.timeLeftUnits[t].v);
        // console.log(val + "/" + this.timeLeftUnits[t].v + "=" + r);
        if (r >= 1) {
          str +=
            this.nDigitNbr(r, 2) +
            this.$t("unitsShort." + this.timeLeftUnits[t].f) +
            " ";
          val -= this.timeLeftUnits[t].v * r;
        }
      }
      return str;
    },
    async computeEvents() {
      var val = this.SelectedPlatform;
      // Now that we have data we feed the schedule with new events
      // The recieved timestamp has the 'second precision' (000 millisecond)
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
        this.huntEidolonSchedule[n] = {
          id: n,
          even: n % 2 == 0 ? true : false,
          start: {
            monthClass: startMonthTrack,
            month:
              s.getMonth() != lastStartTuple.month
                ? s.getMonth()
                : 99,
            dayClass: startDayTrack,
            day:
              s.getDay() != lastStartTuple.day
                ? s.getDay()
                : 99,
            hour:
              this.nDigitNbr(s.getHours(), 2) +
              ":" +
              this.nDigitNbr(s.getMinutes(), 2),
          },
          end: {
            monthClass: endMonthTrack,
            month:
              e.getMonth() != lastEndTuple.month
                ? e.getMonth()
                : 99,
            dayClass: endDayTrack,
            day:
              e.getDay() != lastEndTuple.day
                ? e.getDay()
                : 99,
            hour:
              this.nDigitNbr(e.getHours(), 2) +
              ":" +
              this.nDigitNbr(e.getMinutes(), 2),
          },
        };
        lastStartTuple = { month: s.getMonth(), day: s.getDay() };
        lastEndTuple = { month: e.getMonth(), day: e.getDay() };
        huntStart = huntStart + 150 * 60 * 1000;
      }
    },

    async computeFissures() {
      let src = this.WfData[this.SelectedPlatform].data.fissures;
      this.fissures = {};
      let dst = this.fissures;
      let dstIdx = 0;
      for (let elm in src) {
        let dateExpiry = new Date(src[elm].expiry);
        if (src[elm].active == true && dateExpiry > Date.now()) {
          dst[dstIdx] = {
            id: dstIdx,
            appeal: this.appealTable[src[elm].missionType],
            tier: src[elm].tier,
            type: src[elm].missionType,
            endTime:
              this.nDigitNbr(dateExpiry.getHours(), 2) +
              this.$t("unitsShort.hour") +
              this.nDigitNbr(dateExpiry.getUTCMinutes(), 2),
            targetDate: dateExpiry,
            node: src[elm].node,
            enemy: src[elm].enemy,
          };
        }
        dstIdx++;
      }
    },

    async setPlatformAndRefresh(val) {
      this.SelectedPlatform = val;
      for (let elm in this.tdListActive) {
        this.tdListActive[elm] = false;
        this.WfData[elm].data = {};
      }
      this.tdListActive[val] = true;
      let dateVal = Date.now();
      if (dateVal - this.WfData[val].lastUpdate > 5 * 1000) {
        // update the counters. We don't want to spam DE
        // console.log("Gap="+(dateVal - this.WfData[val].lastUpdate)/1000+"s -> Update!");
        // Fetching the data from DE
        // https://api.warframestat.us/pc (ou platform : pc,ps4,xb1,switch)
        console.log("Trying : " + "https://api.warframestat.us/" + val);

        await fetch("https://api.warframestat.us/" + val, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            "Accept-Language": "en", //we take EN by default as the missionType is a string and not a numeric field... facepalm
          },
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
        await this.computeEvents();
        await this.computeFissures();
        this.WfData[val].lastUpdate = Date.now();
        this.updatedFetch = true;
      }
    },
  },
  components: {
    Timer,
  },
};
</script>
