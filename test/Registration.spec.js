import Vue from 'vue'
import {shallow, mount} from 'vue-test-utils'
import Registration from '@/components/Registration.vue'

describe('Registration.vue', () => {
    it('button disabled by default', () => {
        const wrapper = shallow(Registration);
        const button = wrapper.find('button');
        expect(button.element.getAttribute('disabled')).toBe("disabled");
    });

    it('button will be enabled when we input correct data', (
        done
    ) => {
        const wrapper = mount(Registration);

        const button = wrapper.find('button');
        expect(button.element.getAttribute('disabled')).toBe("disabled");

        wrapper.find('input#login').element.value = 'login12';
        wrapper.find('input#login').trigger('input');

        wrapper.find('input#email').element.value = 'login12@google.com';
        wrapper.find('input#email').trigger('input');

        wrapper.find('input#password').element.value = 'password123';
        wrapper.find('input#password').trigger('input');

        Vue.nextTick(()=>{
            console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).not.toBe("disabled")
            done();
        })
    });

    it('button will be disabled when we input incorrect data', (
        done
    ) => {
        const wrapper = mount(Registration);

        const button = wrapper.find('button');
        expect(button.element.getAttribute('disabled')).toBe("disabled");

        wrapper.find('input#login').element.value = 'login12';
        wrapper.find('input#login').trigger('input');

        wrapper.find('input#email').element.value = 'login12_google.com';
        wrapper.find('input#email').trigger('input');

        wrapper.find('input#password').element.value = 'password123';
        wrapper.find('input#password').trigger('input');

        Vue.nextTick(()=>{
            console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).toBe("disabled");
            done();
        })
    });


});
