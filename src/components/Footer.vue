<template>
  <transition name="fade">
    <div id="footer" class="footer">
      {{$t('footer.author')}} | 
      {{$t('footer.de')}}
    </div>
  </transition>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      dbg: "My name is Footer.vue",
    };
  },
};
</script>

