import { shallow } from 'vue-test-utils'
import Message from '@/components/Message'

describe('Message', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallow(Message, {
      context: { props: { msg } }
    })
    expect(wrapper.text()).toBe(msg)
  })

  it('renders default message if not passed a prop', () => {
    const defaultMessage = 'default message'
    const wrapper = shallow(Message, {context: {}})
    expect(wrapper.text()).toBe(defaultMessage)
  })
})
