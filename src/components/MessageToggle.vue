<template>
  <div>
    <message :msg="msg"></message>
    <button id="toggle-message" @click="toggleMessage">
      Change message
    </button>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'message-toggle',
  data: () => ({
    msg: null
  }),
  methods: {
    toggleMessage () {
      this.msg = this.msg === 'message' ? 'toggled message' : 'message'
    }
  },
  components: {
    Message
  }
}
</script>
