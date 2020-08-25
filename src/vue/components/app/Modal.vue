<template lang="pug">

  .modal(v-if="modal")
    .modal__bg
    .modal__content
      span.modal__cross(@click="modalHide")
      h2.modal__title {{modalMsg.title}}
      p.modal__text {{modalMsg.msg}}
      .modal__button
        button.button-primary(@click="modalHide") Great
</template>

<script>
export default {
  name: "Modal.vue",
  computed: {
    modal() {
      return this.$store.getters.GET_MODAL_STATUS
    },
    modalMsg() {
      return this.$store.getters.GET_MODAL_MESSAGE
    },
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

