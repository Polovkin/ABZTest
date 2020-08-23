<template lang="pug">
  #registration
    form#form.registration__form(@submit.prevent="submitHandler")
      .registration__item
        label(for='email') Email
          input#email(
            type='text',
            name="email",
            form="form",
            v-model.trim="email",
            :class="{'invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
          )
          span.error(v-if="($v.email.$dirty && !$v.email.required)")
            | The Email field must not be empty
          span.error(v-else-if="($v.email.$dirty && !$v.email.email)")
            | Please enter a valid email address
          span.error(v-else-if="($v.email.$dirty && !$v.email.minLength)")
            | Email must be at least {{$v.email.$params.minLength.min}} characters.
          span.error(v-else-if="($v.email.$dirty && !$v.email.maxLength)")
            | Email should be no more than {{$v.email.$params.maxLength.min}} characters.
      .registration__item
        label(for='name') Name
          input#name(
            type='text',
            name="name",
            form="form",
            v-model.trim="name",
            :class="{'invalid': ($v.name.$dirty && !$v.name.required)}"
          )
          span.error(v-if="($v.name.$dirty && !$v.name.required)")
            | The Name field must not be empty
          span.error(v-else-if="($v.name.$dirty && !$v.name.minLength)")
            | Name must be at least {{$v.name.$params.minLength.min}} characters.
          span.error(v-else-if="($v.name.$dirty && !$v.name.maxLength)")
            | Name should be no more than {{$v.name.$params.maxLength.min}} characters.
      .registration__item
        label(for='phone') Phone
          input#phone(
            placeholder='+380 XX XXX XX XX',
            v-mask="mask"
            type='tel',
            name="phone",
            form="form",
            v-model.trim="phone",
            :class="{'invalid': (($v.phone.$dirty && !$v.phone.required) || ($v.phone.$dirty && !$v.phone.isPhone))}"
          )
          span.error(v-if="($v.phone.$dirty && !$v.phone.required)")
            | The Name field must not be empty
          span.error(v-if="($v.phone.$dirty && !$v.phone.isPhone)")
            | Please enter a valid phone number
      .registration__item.registration__item-radio
        p {{radioSelected}}
        template(v-for="(radio,index) in radioItems")
          input(
            type='radio',
            form="form",
            v-model="radioSelected",
            :value="radio"
            :key="radio.id"
            :id="`radio-${index}`",
            :name="`radio-${index}`",
           )
          label(:for="`radio-${index}`") {{radio}}

      .registration__item.registration__item-file
        p Photo
        .registration__item-wrap
          input#file(type="file")
          label(for="file") Browse
      button.button-primary.registration__submit(type='submit')
        | Sing up now

</template>

<script>
import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'


export default {
  name: "Login",
  data() {
    return {
      email: '',
      name: '',
      phone: '',
      radioSelected: 'Frontend developer',
      mask: ['+380 (', /\d/, /\d/, ') ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
      radioItems: ['Frontend developer', 'Backend developer', 'Designer', 'QA']
    }
  },
  validations: {
    email: {email, required, minLength: minLength(2), maxLength: maxLength(100)},
    name: {required, minLength: minLength(2), maxLength: maxLength(60)},
    phone: {
      required,
      isPhone(phone) {
        const regex = /^[\+]{0,1}380([0-9]{9})$/;
        return regex.test(phone.replace(/\s/g, '').replace(/[\])}[{(]/g, ''));
      }
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      const formData = {
        email: this.email,
        name: this.name,
        phone: this.phone
      };
      try {
        console.log(formData)
      } catch (e) {
      }
    }
  },
  mounted() {

  }
}

</script>

<style lang="scss">

</style>

