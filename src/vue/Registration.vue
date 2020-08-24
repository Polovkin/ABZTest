<template lang="pug">
  #registration
    Modal
    form#form.registration__form(@submit.prevent="submitHandler")

      .registration__item
        label.registration__item-label(for='name') Name
          input#name.registration__item-input(
            placeholder='Your name',
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
        label.registration__item-label(for='email') Email
          input.registration__item-input#email(
            placeholder='Your email',
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
        label.registration__item-label(for='phone') Phone
          input#phone.registration__item-input(
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
          span.error(v-else-if="($v.phone.$dirty && !$v.phone.isPhone)")
            | Please enter a valid phone number

      .registration__item.registration__item-position
        p.registration__item-title Select your position
        template(v-for="(radio,index) in positions")

          .registration__item-radio.custom-radio

            label(:for="`radio-${index}`") {{radio.name}}
              input(
                type='radio',
                form="form",
                v-model="radioSelected",
                :value="radio.id"
                :key="radio.id"
                :id="`radio-${index}`",
                :name="`radio-${index}`",
              )
              span.checkmark

      .registration__item.registration__item-file
        p Photo
        .registration__item-wrap
          .file-input
            input#file(type="file", @change="file", ref="file", name="file")
          .fake-input
            p {{fileName}}
            label(for="file") Browse
          span.error(v-if="fileValid") File error (jpg,png, <5mb)
      button#submit.button-primary.registration__submit(type='submit')
        | Sing up now
</template>

<script>
import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'
import Modal from './components/app/Modal.vue'


export default {
  name: "Login",
  components: {Modal},
  data() {
    return {
      email: '',
      name: '',
      phone: '',
      mask: ['+380 (', /\d/, /\d/, ') ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
      fileName: '',
      fileValid: false,
      positions: '',
      radioSelected: 1
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
  async mounted() {
    this.positions = await this.$store.dispatch('GET_POSITIONS_DATA');
    await this.$store.dispatch('GET_NEW_TOKEN');
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid || this.fileValid) {
        this.$v.$touch();
        return
      }

      if (this.$refs.file.files[0] !== undefined) {
        let formData = new FormData();

        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('phone', this.phone.replace(/\s/g, '').replace(/[\])}[{(]/g, ''));
        formData.append('position_id', this.radioSelected);
        formData.append('photo', this.$refs.file.files[0]);

        try {
          await this.$store.dispatch('SEND_FORM', formData)
        } catch (e) {
          console.log(e)
        }
      }
    },
    file() {
      const file = this.$refs.file.files[0];
      this.fileName = file.name;
      this.fileValid = (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg') || file.size > 5242880;
    },
  },
}

</script>

<style lang="scss">

</style>
