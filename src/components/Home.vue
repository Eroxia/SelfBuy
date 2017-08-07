<template>
  <div>
    <homeHeader></homeHeader>
    <homeContent></homeContent>
    <homeFooter></homeFooter>
  </div>
</template>


<script>
  import homeHeader from './HomeHeader.vue'
  import homeContent from './HomeContent.vue'
  import homeFooter from './HomeFooter.vue'
  export default {
    name: 'Home',
    components: {
      homeHeader,
      homeContent,
      homeFooter
    }
  }
</script>
<style scoped>
  @import '/static/main.css';
  @import '/static/all.css';
</style>
