import Vue from 'vue'
import {shallow, mount, createLocalVue} from 'vue-test-utils'
import Registration from '@/components/Registration.vue'

describe('Registration.vue', () => {
    const $httpSuccess = {
        post(){
            return Promise.resolve({body: { message: "success" }});
        }
    };

    const $httpFail = {
        post(){
            return Promise.reject({body: { message: "internal server error" }});
        }
    };


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
            //console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).not.toBe("disabled")
            done();
        })
    });

    it('button will be disabled when we input incorrect data', (done) => {
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
            //console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).toBe("disabled");
            done();
        })
    });

    it('send ok', (done) => {
        const wrapper = mount(Registration, {
            mocks: {
                $http: $httpSuccess
            },
            propsData: {
                onSuccess(){
                    wrapper.update();
                    // console.log(wrapper.html());
                    expect(wrapper.html()).toContain("Your confirmation email successfully sent. Open your mail 'login12@google.com' and follow confirmation link.");
                    done();
                },
                onFail(){
                    console.log(wrapper.html());
                }
            }
        });

        const button = wrapper.find('button');
        expect(button.element.getAttribute('disabled')).toBe("disabled");

        wrapper.find('input#login').element.value = 'login12';
        wrapper.find('input#login').trigger('input');

        wrapper.find('input#email').element.value = 'login12@google.com';
        wrapper.find('input#email').trigger('input');

        wrapper.find('input#password').element.value = 'password123';
        wrapper.find('input#password').trigger('input');

        Vue.nextTick(()=>{
            //console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).not.toBe("disabled");

            button.trigger('click');
        })
    });


    it('send fail', (done) => {
        const wrapper = mount(Registration, {
            mocks: {
                $http: $httpFail
            },
            propsData: {
                onSuccess(){
                    console.log(wrapper.html());
                },
                onFail(){
                    wrapper.update();
                    // console.log(wrapper.html());
                    expect(wrapper.html()).toContain("internal server error");
                    done();
                }
            }
        });

        const button = wrapper.find('button');
        expect(button.element.getAttribute('disabled')).toBe("disabled");

        wrapper.find('input#login').element.value = 'login12';
        wrapper.find('input#login').trigger('input');

        wrapper.find('input#email').element.value = 'login12@google.com';
        wrapper.find('input#email').trigger('input');

        wrapper.find('input#password').element.value = 'password123';
        wrapper.find('input#password').trigger('input');

        Vue.nextTick(()=>{
            //console.log(wrapper.html());
            expect(button.element.getAttribute('disabled')).not.toBe("disabled");

            button.trigger('click');
        })
    });


});
