<template lang="pug">

  .modal(v-if="modal")
    .modal__bg
    .modal__content
      span.modal__cross(@click="modalHide")
      h2.modal__title Congratulations
      p.modal__text You have successfully passed the registration
      .modal__button
        button.button-primary(@click="modalHide") Great
</template>

<script>
export default {
  name: "Modal.vue",
  computed: {
    modal() {
      return this.$store.getters.GET_MODAL_STATUS
    }
  },
  methods: {
    modalHide() {
      this.$store.commit('SET_MODAL_STATUS', false)
    }
  },

}
</script>

<style>

</style>

