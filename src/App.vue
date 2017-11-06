<template>
  <div id="app">
    <message-toggle />
    <list :items="['list item 1', 'listen item 2']" />
    <registration></registration>
  </div>
</template>

<script>
import Vue from 'vue'
import MessageToggle from '@/components/MessageToggle.vue'
import List from '@/components/List.vue'
import Registration from '@/components/Registration.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
  components: {
    MessageToggle,
    List,
    Registration
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
