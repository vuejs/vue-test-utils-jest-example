<template>
    <div>
        <div v-if="!errorMessage">
            <h1>Registration</h1>
            <div v-if="!emailSuccessfullySent">
                <vue-form-generator :schema="schema" :model="profile" :options="formOptions" @validated="onValidated"></vue-form-generator>
                <button id="submit" type="submit" @click.prevent="onSubmit" v-bind:disabled="!submitEnabled">Submit</button>
            </div>
            <div v-else>
                Your confirmation email successfully sent. Open your mail '{{profile.email}}' and follow confirmation link.
            </div>
        </div>
        <div v-else>
            {{errorMessage}}
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    import VueFormGenerator from "vue-form-generator";
    import "vue-form-generator/dist/vfg.css";

    const PASSWORD_MIN_LENGTH = 6;
    export default {
        name: 'registration', // component name
        props: ['onSuccess', 'onFail'],
        data(){
            return {
                profile: {
                    login: null,
                    email: null,
                    password: null,
                },
                submitEnabled: false,
                emailSuccessfullySent: false,

                errorMessage: '',

                schema: {
                    fields: [{
                        type: "input",
                        inputType: "text",
                        label: "Login",
                        model: "login",
                        placeholder: "Your login for enter",
                        featured: true,
                        required: true,
                        validator: VueFormGenerator.validators.string
                    },{
                        type: "input",
                        inputType: "password",
                        label: "Password",
                        model: "password",
                        min: PASSWORD_MIN_LENGTH,
                        required: true,
                        hint: `Minimum ${PASSWORD_MIN_LENGTH} characters`,
                        validator: VueFormGenerator.validators.string
                    },{
                        type: "input",
                        inputType: "email",
                        label: "E-mail",
                        id: 'email',
                        model: "email",
                        required: true,
                        placeholder: "User's e-mail address",
                        validator: VueFormGenerator.validators.email
                    }]
                },
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true
                },
            }
        },
        components: {
            "vue-form-generator": VueFormGenerator.component,
        },
        methods: {
            onSubmit() {
                this.submitEnabled = false;
                this.errorMessage = null;

                this.$http.post('/api/register', this.profile).then(response => {
                    this.submitEnabled = true;
                    this.emailSuccessfullySent = true;
                    this.onSuccess && this.onSuccess();
                }, response => {
                    this.submitEnabled = true;
                    // console.error(response);
                    this.errorMessage = response.body.message;
                    this.onFail && this.onFail();
                });
            },
            onValidated(isValid, errors) {
                //console.log("Validation result: ", isValid, ", Errors:", errors);
                this.submitEnabled = isValid;
                this.errorMessage = null;
            },

        }
    }
</script>
