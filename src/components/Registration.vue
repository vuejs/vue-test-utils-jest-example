<template>
    <div>
    <h1>Registration</h1>
    <vue-form-generator :schema="schema" :model="profile" :options="formOptions" @validated="onValidated"></vue-form-generator>
        <button id="submit" type="submit" @click.prevent="onSubmit" v-bind:disabled="!submitEnabled">Submit</button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    Vue.use(VueResource);

    import VueFormGenerator from "vue-form-generator";
    import "vue-form-generator/dist/vfg.css";

    const PASSWORD_MIN_LENGTH = 6;
    export default {
        name: 'registration', // component name
        data(){
            return {
                profile: {
                    login: null,
                    email: null,
                    password: null,
                },
                submitEnabled: false, // is submit button enabled
                submitting: false,
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
                this.submitting = true;
                this.errorMessage = null;

                this.$http.post('/api/register', this.profile).then(response => {
                    this.submitEnabled = true;
                    this.submitting = false;
                    this.emailSuccessfullySent = true;
                }, response => {
                    this.submitEnabled = true;
                    console.error(response);
                    this.submitting = false;
                    this.errorMessage = response.body.message;
                });
            },
            onValidated(isValid, errors) {
                console.log("Validation result: ", isValid, ", Errors:", errors);
                this.submitEnabled = isValid;
                this.errorMessage = null;
            },

        }
    }
</script>
