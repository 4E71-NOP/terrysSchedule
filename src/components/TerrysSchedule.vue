<template>
  <div id="terrrySchedule" class="terrrySchedule">
    <!-- <HubPanelWrap :title="headertext"> -->
    <h1>{{header}}</h1>
    <p>{{invite}}</p>
    <!-- </HubPanelWrap> -->
  </div>
</template>

<script>
export default {
  name: "TerrysSchedule",
  data() {
    return {
      header: "Ceci est l'entête du cadre",
      invite: "Ce texte d'invite sera a remplacer dynamiquement par une localisation (i18n) qui n'est pas implémentée pour le moment. En bref : Tagol!",
    };
  },
};
</script>