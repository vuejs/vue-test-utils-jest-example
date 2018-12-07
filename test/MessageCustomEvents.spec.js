import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

const vm = {
  template: '<message :msg="msg" @custom-event="onCustomEvent"></message>',
  components: {
    Message
  },
  name: 'message-container',
  data: () => ({
    msg: 'new message',
    output: null
  }),
  methods: {
    onCustomEvent(msg) {
      this.output = msg
    }
  }
}

describe('Message with custom events', () => {
  it('pass msg to container when the h1 elment in the message component is clicked', () => {
    const wrapper = mount(vm);
    expect(wrapper.vm.$data.output).toBeNull()
    wrapper.find('h1').trigger('click')
    expect(wrapper.vm.$data.output).toEqual(wrapper.vm.$data.msg)
  })
})
