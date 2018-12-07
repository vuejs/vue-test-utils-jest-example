<template>
  <h1 @click="$emit('custom-event', msg)"> {{ msg || 'default message' }}</h1>
</template>

<script>
export default {
  name: 'message',
  props: [
    'msg'
  ]
}
</script>
