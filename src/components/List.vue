<template>
  <ul>
    <li :key="item" v-for="item in items">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list',
  props: [
    'items'
  ]
}
</script>
