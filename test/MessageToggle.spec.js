import { shallow } from 'vue-test-utils'
import MessageToggle from '@/components/MessageToggle.vue'
import Message from '@/components/Message'

describe('MessageToggle.vue', () => {
  it('toggles msg passed to Message when button is clicked', () => {
    const wrapper = shallow(MessageToggle)
    const button = wrapper.find('#toggle-message')
    button.trigger('click')
    const MessageComponent = wrapper.find(Message)
    expect(MessageComponent.hasProp('msg', 'message')).toBe(true)
    button.trigger('click')
    expect(MessageComponent.hasProp('msg', 'toggled message')).toBe(true)
  })
})
