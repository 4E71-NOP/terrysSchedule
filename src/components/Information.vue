<template>
  <div id="Information" class="RouterViewBlock">
    <p>
      {{$t('information.p01T01')}}
      <a href="http://www.warframe.com" target="_blank">WarFrame</a>
      {{$t('information.p01T02')}}
    </p>
    <br/>
    <br/>
    <br/>
    <p>
      {{$t('information.p02')}}<br/>
      <ul>
      <li v-for="el in externalLinks" :key="el.id">
        <a v-bind:href="el.url">{{el.face}}</a><br/>
      </li>
      </ul>
    </p>
    <!-- <p>{{ getCurrentRoute }}</p> -->
  </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      dbg: "My name is Information.vue",
      currentRoute: this.$route.path,
      externalLinks: [
        { id: 0, url: "https://24timezones.com/", face: "24timezones.com" },
        { id: 1, url: "https://www.timeanddate.com/", face: "timeanddate.com" },
        {
          id: 2,
          url: "https://www.thetimezoneconverter.com/",
          face: "thetimezoneconverter.com",
        },
        { id: 3, url: "https://warframe.fandom.com/wiki/Plains_of_Eidolon", face: "Wiki - Plains of Eidolon"},
      ],
    };
  },
  computed: {
    getCurrentRoute() {
      return "route = '" + this.$route.name + "'";
    },
  },
};
</script>

