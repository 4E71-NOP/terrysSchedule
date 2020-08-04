<template>
  <div id="title" class="title">
    <h1>{{msg}}</h1>
  </div>
</template>



<script>
export default {
  name: "Title",
  data() {
    return {
      msg: "Title in Engeulish",
      header: "",
      invite: "",
    };
  },
};
</script>

