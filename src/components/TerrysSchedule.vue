<template>
  <div id="terrrySchedule" class="RouterViewBlock">
    <h3>{{ $t("Ts.p01") }}</h3>
    <table class="tblSelectionPlatform">
      <caption>
        {{
          $t("Ts.tbl01Caption")
        }}
      </caption>
      <tr>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{ tblSelectionPlatformTdActive: tdListActive.pc }"
          @click="setPlatformAndRefresh('pc')"
        >
          <font-awesome-icon
            class="fa-2x iconPlatform"
            :icon="['fab', 'windows']"
          ></font-awesome-icon
          >PC
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{ tblSelectionPlatformTdActive: tdListActive.ps4 }"
          @click="setPlatformAndRefresh('ps4')"
        >
          <font-awesome-icon
            class="fa-2x iconPlatform"
            :icon="['fab', 'playstation']"
          ></font-awesome-icon
          >PS4
        </td>
        <td
          class="tblSelectionPlatformTd"
          v-bind:class="{ tblSelectionPlatformTdActive: tdListActive.xb1 }"
          @click="setPlatformAndRefresh('xb1')"
        >
          <font-awesome-icon
            class="fa-2x iconPlatform"
            :icon="['fab', 'xbox']"
          ></font-awesome-icon
          >Xbox One
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
    <div v-if="updatedFetch === true && WfData[SelectedPlatform].lastUpdate">
      <p>
        {{ $t("Ts.p02") }}
        <br />
        {{ $t("Ts.p03") }} {{ localTimezone }}
        <br />
        {{ $t("Ts.p04") }} {{ apiDataUpdate }}
      </p>

      <!-- -->
      <v-tabs
        v-model="tab"
        background-color="blue accent-4"
        class="elevation-2"
        dark
        :centered="centered"
        :grow="grow"
        :vertical="vertical"
        :right="right"
        :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
        :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
        :icons-and-text="icons"
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
          {{ $t("Ts.Tabs." + i) }}
          <v-icon v-if="icons">mdi-phone</v-icon>
        </v-tab>

        <!-- 
        --------------------------------------------------------------------------------
        Eidolon 
        -->
        <v-tab-item value="tab-1">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.cetus.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td colspan="3">{{ $t("Ts.eventTbl.cetus.c1") }}</td>
                <td colspan="3">{{ $t("Ts.eventTbl.cetus.c2") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in huntEidolonSchedule"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td
                  v-bind:class="{ tblEventsTdMonthShift: el.start.monthClass }"
                >
                  {{ $t("month." + el.start.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ $t("day." + el.start.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ el.start.hour }}
                </td>
                <td v-bind:class="{ tblEventsTdMonthShift: el.end.monthClass }">
                  {{ $t("month." + el.end.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ $t("day." + el.end.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ el.end.hour }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </v-tab-item>
        <!-- 
        --------------------------------------------------------------------------------
        Orbis valley 
        -->
        <v-tab-item value="tab-2">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.orbVallis.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td>{{ $t("Ts.eventTbl.orbVallis.c1") }}</td>
                <td colspan="3">{{ $t("Ts.eventTbl.orbVallis.c2") }}</td>
                <td colspan="3">{{ $t("Ts.eventTbl.orbVallis.c3") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in orbVallisSchedule"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td>{{ $t("Ts.eventTbl.orbVallis.type." + el.start.type) }}</td>
                <td
                  v-bind:class="{ tblEventsTdMonthShift: el.start.monthClass }"
                >
                  {{ $t("month." + el.start.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ $t("day." + el.start.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ el.start.hour }}
                </td>
                <td v-bind:class="{ tblEventsTdMonthShift: el.end.monthClass }">
                  {{ $t("month." + el.end.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ $t("day." + el.end.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ el.end.hour }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </v-tab-item>
        <!-- 
        --------------------------------------------------------------------------------
        Cambion drift
        -->
        <v-tab-item value="tab-3">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.cambionDrift.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td>{{ $t("Ts.eventTbl.cambionDrift.c1") }}</td>
                <td colspan="3">{{ $t("Ts.eventTbl.cambionDrift.c2") }}</td>
                <td colspan="3">{{ $t("Ts.eventTbl.cambionDrift.c3") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in cambionDriftSchedule"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td>
                  {{ $t("Ts.eventTbl.cambionDrift.type." + el.start.type) }}
                </td>
                <td
                  v-bind:class="{ tblEventsTdMonthShift: el.start.monthClass }"
                >
                  {{ $t("month." + el.start.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ $t("day." + el.start.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.start.dayClass }">
                  {{ el.start.hour }}
                </td>
                <td v-bind:class="{ tblEventsTdMonthShift: el.end.monthClass }">
                  {{ $t("month." + el.end.month) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ $t("day." + el.end.day) }}
                </td>
                <td v-bind:class="{ tblEventsTdDayShift: el.end.dayClass }">
                  {{ el.end.hour }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </v-tab-item>
        <!-- 
        --------------------------------------------------------------------------------
        Sortie 
        -->
        <v-tab-item value="tab-4">
          <table class="tblSortie">
            <caption>
              {{
                $t("Ts.sortieTbl.caption")
              }}
              <br />
              Boss :
              {{
                this.sortieContext.boss
              }}
              <br />
              Faction :
              {{
                this.sortieContext.faction
              }}
              <br />
            </caption>
            <thead>
              <tr>
                <!-- <td>id</td> -->
                <td>{{ $t("Ts.sortieTbl.c1") }}</td>
                <td>{{ $t("Ts.sortieTbl.c2") }}</td>
                <td>{{ $t("Ts.sortieTbl.c3") }}</td>
                <td>{{ $t("Ts.sortieTbl.c4") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="el in this.sortie" :key="el.idx">
                <td>{{ el.idx }}</td>
                <td>{{ el.missionType }}</td>
                <td>{{ el.modifier }}</td>
                <td>{{ el.modifierDescription }}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </v-tab-item>

        <!-- 
        --------------------------------------------------------------------------------
        Fissures 
        -->
        <v-tab-item value="tab-5">
          {{ $t("Ts.waiting") }}
          <br />

          <table class="tblFissures">
            <caption>
              {{
                $t("Ts.fissuresTbl.captionNormal")
              }}
            </caption>
            <thead>
              <tr>
                <!-- <td>id</td> -->
                <td>{{ $t("Ts.fissuresTbl.c1") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c2") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c3") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c4") }}</td>
                <td class="tblFissuresTdRight">
                  {{ $t("Ts.fissuresTbl.c5") }}
                </td>
                <td>{{ $t("Ts.fissuresTbl.c6") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c7") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in orderedFissuresNormal"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.appeal }"
              >
                <!-- <td>{{el.id}}</td> -->
                <td>{{ el.appeal }}</td>
                <td>{{ $t("Ts.fissuresTbl.missionType." + el.type) }}</td>
                <td>{{ el.tier }}</td>
                <td>{{ $t("Ts.fissuresTbl.enemy." + el.enemy) }}</td>
                <td class="tblFissuresTdRight">
                  <Timer :targetDate="el.targetDate" />
                </td>
                <td>{{ el.endTime }}</td>
                <td>{{ el.node }}</td>
              </tr>
            </tbody>
          </table>
          <br>

          <table class="tblFissures">
            <caption>
              {{
                $t("Ts.fissuresTbl.captionVoid")
              }}
            </caption>
            <thead>
              <tr>
                <!-- <td>id</td> -->
                <td>{{ $t("Ts.fissuresTbl.c1") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c2") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c3") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c4") }}</td>
                <td class="tblFissuresTdRight">
                  {{ $t("Ts.fissuresTbl.c5") }}
                </td>
                <td>{{ $t("Ts.fissuresTbl.c6") }}</td>
                <td>{{ $t("Ts.fissuresTbl.c7") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in orderedFissuresVoid"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.appeal }"
              >
                <!-- <td>{{el.id}}</td> -->
                <td>{{ el.appeal }}</td>
                <td>{{ $t("Ts.fissuresTbl.missionType." + el.type) }}</td>
                <td>{{ el.tier }}</td>
                <td>{{ $t("Ts.fissuresTbl.enemy." + el.enemy) }}</td>
                <td class="tblFissuresTdRight">
                  <Timer :targetDate="el.targetDate" />
                </td>
                <td>{{ el.endTime }}</td>
                <td>{{ el.node }}</td>
              </tr>
            </tbody>
          </table>





          <br />
        </v-tab-item>
        <!-- --------------------------------------------------------------------------------
        Bounties Ostrons
        -->
        <v-tab-item value="tab-6">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.ostronsBounties.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td>{{ $t("Ts.eventTbl.ostronsBounties.c1") }}</td>
                <td>{{ $t("Ts.eventTbl.ostronsBounties.c2") }}</td>
                <td>{{ $t("Ts.eventTbl.ostronsBounties.c3") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in bountiesDefinitions.ostrons.table"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td>{{ el.type }}</td>
                <td>{{ el.standingStages }}</td>
                <td>{{ el.enemyLevels }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>
        <!-- --------------------------------------------------------------------------------
        Bounties Solaris
        -->
        <v-tab-item value="tab-7">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.solarisBounties.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td>{{ $t("Ts.eventTbl.solarisBounties.c1") }}</td>
                <td>{{ $t("Ts.eventTbl.solarisBounties.c2") }}</td>
                <td>{{ $t("Ts.eventTbl.solarisBounties.c3") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in bountiesDefinitions.solarisUnited.table"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td>{{ el.type }}</td>
                <td>{{ el.standingStages }}</td>
                <td>{{ el.enemyLevels }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>
        <!-- --------------------------------------------------------------------------------
        Bounties Entrati
        -->
        <v-tab-item value="tab-8">
          <table class="tblEvents">
            <caption>
              {{
                $t("Ts.eventTbl.entratiBounties.caption")
              }}
            </caption>
            <thead>
              <tr>
                <td>{{ $t("Ts.eventTbl.entratiBounties.c1") }}</td>
                <td>{{ $t("Ts.eventTbl.entratiBounties.c2") }}</td>
                <td>{{ $t("Ts.eventTbl.entratiBounties.c3") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="el in bountiesDefinitions.entrati.table"
                :key="el.id"
                v-bind:class="{ tblEventsTrShift: el.even }"
              >
                <td>{{ el.type }}</td>
                <td>{{ el.standingStages }}</td>
                <td>{{ el.enemyLevels }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>
      </v-tabs>
      <br />
    </div>
  </div>
</template>

<script>
// ----------------------------------------
// Notes:
// *  The switch console part requires CORS/Access-Control-Allow-Origin header.
//    The code is non the less present but commented in case of a change.
import _ from "lodash";
import Timer from "@/components/Timer.vue";

export default {
  name: "TerrysSchedule",
  data() {
    return {
      // Button state managment
      tdListActive: {
        pc: true,
        ps4: false,
        xb1: false,
        // switch: false,
      },

      // Tabs
      dbg: "My name is TerrysSchedule.vue",
      tab: null,
      text: "",
      icons: false,
      centered: false,
      grow: true,
      vertical: false,
      prevIcon: true,
      nextIcon: true,
      right: false,
      tabs: 8,

      // Envent schedules
      SelectedPlatform: "pc",
      updatedFetch: false,
      localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      PlanetEventDefinitions: {
        cetus: {
          planetEntry: "cetusCycle",
          stateEntryName: "isDay",
          nbrLines: 30,
          showBothPeriod: false,
          modeMgmt: "trueFalse",
          ObjTarget: "huntEidolonSchedule",
          periodA: 100 * 60 * 1000,
          periodB: 50 * 60 * 1000,
        },
        orbVallis: {
          planetEntry: "vallisCycle",
          stateEntryName: "isWarm",
          nbrLines: 15,
          showBothPeriod: true,
          modeMgmt: "trueFalse",
          ObjTarget: "orbVallisSchedule",
          periodA: 400 * 1000,
          periodB: 20 * 60 * 1000,
        },
        cambionDrift: {
          planetEntry: "cambionCycle",
          stateEntryName: "active",
          nbrLines: 10,
          showBothPeriod: true,
          modeMgmt: "cambionDrift",
          ObjTarget: "cambionDriftSchedule",
          periodA: 50 * 60 * 1000,
          periodB: 100 * 60 * 1000,
        },
      },

      huntEidolonSchedule: {},
      orbVallisSchedule: {},
      cambionDriftSchedule: {},
      WfData: {
        pc: { lastUpdate: 0, data: {} },
        ps4: { lastUpdate: 0, data: {} },
        xb1: { lastUpdate: 0, data: {} },
        // switch: { lastUpdate: 0, data: {} },
      },

      // Fissures
      // Apeal is function of the expexted time spent to open the relic.
      appealTable: {
        missionType: {
          Capture: 6,
          Extermination: 5,
          Rescue: 5,
          Sabotage: 5,
          Hive: 4,
          Disruption: 3,
          Excavation: 3,
          Spy: 3,
          Defense: 2,
          "Mobile Defense": 2,
          Survival: 2,
          Defection: 1,
          Assault: 1,
          Hijack: 1,
          Interception: 1,
          Volatile: 3,
          Skirmish: 3,
          CrewBattleNode519: 3,
          CrewBattleNode533: 3,
        },
        enemy: {
          Infested: 1.2,
          Corpus: 1.1,
          Crossfire: 1,
          CrewBattleNode519: 1,
          CrewBattleNode533: 1,
          Orokin: 0.9,
          Grineer: 0.8,
        },
        // 1 lith, 2 Meso, 3 neo, 4 axi, 5 requiem
        tier: {
          1: 1.2,
          2: 1.1,
          3: 1,
          4: 0.9,
          5: 0.8,
        },
      },
      sortieContext: {},
      sortie: {},
      fissuresNormal: {},
      fissuresVoid: {},
      // Bounties
      bountiesDefinitions: {
        ostrons: {
          table: {},
        },
        solarisUnited: {
          table: {},
        },
        entrati: {
          table: {},
        },
      },
    };
  },
  // Use of Lo(w)dash orderBy as the VueJs docs recommend it. Another dependency...
  computed: {
    orderedFissuresNormal: function () {
      return _.orderBy(
        this.fissuresNormal,
        ["appeal", "tier", "type"],
        ["desc", "asc", "asc"]
      );
    },
    orderedFissuresVoid: function () {
      return _.orderBy(
        this.fissuresVoid,
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

    createTableEntry(t, d, mode) {
      var currentday = 99;
      switch (mode) {
        case 0:
          currentday = t.getDay() != d.lastStartTuple.day ? t.getDay() : 99;
          break;
        case 1:
          currentday = t.getDay() != d.lastEndTuple.day ? t.getDay() : 99;
          break;
      }

      return {
        type: d.mode,
        monthClass: d.startMonthTrack,
        month: t.getMonth() != d.lastStartTuple.month ? t.getMonth() : 99,
        dayClass: mode == 0 ? d.startDayTrack : d.endDayTrack,
        day: currentday,
        hour:
          this.nDigitNbr(t.getHours(), 2) +
          ":" +
          this.nDigitNbr(t.getMinutes(), 2),
      };
    },
    tupleTrack(d, s, e) {
      if (s.getMonth() != d.lastStartTuple.month) {
        d.startMonthTrack = !d.startMonthTrack;
      }
      if (s.getDay() != d.lastStartTuple.day) {
        d.startDayTrack = !d.startDayTrack;
      }
      if (e.getMonth() != d.lastEndTuple.month) {
        d.endMonthTrack = !d.endMonthTrack;
      }
      if (e.getDay() != d.lastEndTuple.day) {
        d.endDayTrack = !d.endDayTrack;
      }
    },

    endLineWork(d, s, e) {
      d.lastStartTuple = { month: s.getMonth(), day: s.getDay() };
      d.lastEndTuple = { month: e.getMonth(), day: e.getDay() };
      switch (d.modeMgmt) {
        case "cambionDrift":
          d.mode = d.mode == "vome" ? "fass" : "vome";
          break;
        default:
          d.mode = !d.mode;
          break;
      }
      d.idx++;
    },
    async computeEvents(objDef) {
      var val = this.SelectedPlatform;

      var objDataSrc = this.WfData[val].data[objDef.planetEntry];
      var objTarget = this[objDef.ObjTarget];

      var d = {
        idx: 0,
        mode: objDataSrc[objDef.stateEntryName],
        modeMgmt: objDef.modeMgmt,
        lastStartTuple: { month: 1000, day: 1000 },
        lastEndTuple: { month: 1000, day: 1000 },
        startMonthTrack: true,
        startDayTrack: true,
        endMonthTrack: true,
        endDayTrack: true,
      };

      let huntStart = null;
      switch (objDef.planetEntry) {
        case "cetusCycle":
          huntStart =
            objDataSrc[objDef.stateEntryName] == true
              ? new Date(objDataSrc.expiry).getTime()
              : new Date(objDataSrc.activation).getTime(); // Depending on the day/night state we take expiry or activation timestamp as starting point
          break;
        case "vallisCycle":
          huntStart = new Date(objDataSrc.activation).getTime();
          break;
        case "cambionCycle":
          huntStart = new Date(objDataSrc.activation).getTime();
          break;
      }

      for (let n = 0; n < objDef.nbrLines; n++) {
        let s = new Date(huntStart);
        let e = new Date(huntStart + objDef.periodB);
        this.tupleTrack(d, s, e);
        objTarget[d.idx] = {
          id: d.idx,
          even: d.idx % 2 == 0 ? true : false,
          start: this.createTableEntry(s, d, 0),
          end: this.createTableEntry(e, d, 1),
        };
        this.endLineWork(d, s, e);

        if (objDef.showBothPeriod == true) {
          let e2 = new Date(huntStart + objDef.periodA + objDef.periodB);
          this.tupleTrack(d, e, e2);

          objTarget[d.idx] = {
            id: d.idx,
            even: d.idx % 2 == 0 ? true : false,
            start: this.createTableEntry(e, d, 0),
            end: this.createTableEntry(e2, d, 1),
          };
          this.endLineWork(d, e, e2);
        }
        huntStart = huntStart + (objDef.periodA + objDef.periodB);
      }
    },

    async computeSortie() {
      let src = this.WfData[this.SelectedPlatform].data.sortie.variants;
      this.sortie = {};
      let dst = this.sortie;
      let dstIdx = 1;
      for (let elm in src) {
        dst[dstIdx] = {
          idx: dstIdx,
          missionType: src[elm].missionType,
          modifier: src[elm].modifier,
          modifierDescription: src[elm].modifierDescription,
        };
        dstIdx++;
      }
      let ctxt = this.WfData[this.SelectedPlatform].data.sortie;
      this.sortieContext = {
        boss: ctxt.boss,
        faction: ctxt.faction,
      };
    },

    async computeFissures() {
      let src = this.WfData[this.SelectedPlatform].data.fissures;
      this.fissuresNormal = {};
      this.fissuresVoid = {};
      let dstN = this.fissuresNormal;
      let dstV = this.fissuresVoid;
      let dstIdx = 0;
      for (let elm in src) {
        let dateExpiry = new Date(src[elm].expiry);
        if (src[elm].active == true && dateExpiry > Date.now()) {
          // console.log(
          //   "Scores ; missionType=" +
          //     this.appealTable.missionType[src[elm].missionType] +
          //     "; enemy=" +
          //     this.appealTable.enemy[src[elm].enemy] +
          //     "; Tier=" +
          //     this.appealTable.tier[src[elm].tier]+
          //     "; ref="+
          //     src[elm].missionType+
          //     "-"+
          //     src[elm].tier+
          //     "-"+
          //     src[elm].enemy
          // );
          this.fissuresTmp = {
            realm : src[elm].isStorm,
            id: dstIdx,
            // appeal: this.appealTable[src[elm].missionType],
            appeal:
              Math.round(
                this.appealTable.missionType[src[elm].missionKey] *
                  this.appealTable.enemy[src[elm].enemyKey] *
                  this.appealTable.tier[src[elm].tierNum] *
                  100
              ) / 100,
            tier: src[elm].tierNum,
            type: src[elm].missionKey,
            endTime:
              this.nDigitNbr(dateExpiry.getHours(), 2) +
              this.$t("unitsShort.hour") +
              this.nDigitNbr(dateExpiry.getUTCMinutes(), 2),
            targetDate: dateExpiry,
            node: src[elm].nodeKey,
            enemy: src[elm].enemyKey,
          };
          if ( src[elm].isStorm == true) { dstV[dstIdx] = this.fissuresTmp; }
          else { dstN[dstIdx] = this.fissuresTmp; }
        }
        dstIdx++;
      }
    },

    async computeBounties(objDef) {
      let idx = 0;
      let t = {};
      for (let j in objDef.jobs) {
        let standingStages = 0;
        for (let s in objDef.jobs[j].standingStages) {
          standingStages += objDef.jobs[j].standingStages[s];
        }

        t[idx] = {
          id: idx,
          type: objDef.jobs[j].type,
          enemyLevels:
            objDef.jobs[j].enemyLevels[0] +
            " - " +
            objDef.jobs[j].enemyLevels[1],
          standingStages: standingStages,
        };
        idx++;
      }
      objDef.table = t;
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
        // https://api.warframestat.us/pc (where platform : pc,ps4,xb1,switch)
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

        // We supposed to have an object now
        // We still have to find some specific entries as they are 'thrown in the bucket like that'
        // We link those jobs section for conveninence
        let sm = this.WfData[val].data.syndicateMissions;
        let compTable = {
          0: { name: "Ostrons", target: "ostrons" },
          1: { name: "Entrati", target: "entrati" },
          2: { name: "Solaris United", target: "solarisUnited" },
        };
        for (let elm in sm) {
          for (let c in compTable) {
            if (sm[elm].syndicate == compTable[c].name) {
              this.bountiesDefinitions[compTable[c].target].jobs = sm[elm].jobs;
            }
          }
        }

        // Now we're talking
        await this.computeEvents(this.PlanetEventDefinitions.cetus);
        await this.computeEvents(this.PlanetEventDefinitions.orbVallis);
        await this.computeEvents(this.PlanetEventDefinitions.cambionDrift);
        await this.computeSortie();
        await this.computeFissures();
        await this.computeBounties(this.bountiesDefinitions.ostrons);
        await this.computeBounties(this.bountiesDefinitions.solarisUnited);
        await this.computeBounties(this.bountiesDefinitions.entrati);
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
