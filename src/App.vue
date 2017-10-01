<template>
  <div id="app">
    <message-toggle />
    <list :items="['list item 1', 'listen item 2']" />
  </div>
</template>

<script>
import MessageToggle from '@/components/MessageToggle'
import List from '@/components/List'

export default {
  components: {
    MessageToggle,
    List
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
