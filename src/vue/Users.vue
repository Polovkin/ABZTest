<template lang="pug">
  #users
    .users__content
      template(v-for="user of users")
        UserItem(:user-data="user")
    button.button-primary(
      v-if="buttonState",
      @click="showMore",
      :class="{'button-primary--disabled':buttonDisable}") Show more


</template>

<script>
import UserItem from './components/app/User-item.vue'

export default {
  name: 'Users',
  components: {UserItem},
  data() {
    return {

    }
  },
  mounted() {
    this.$store.dispatch('GET_USERS_DATA');
  },
  computed: {
    users() {
      return this.$store.getters.GET_USERS;
    },
    buttonDisable() {
      return this.$store.getters.GET_BUTTON_STATUS;
    },
    buttonState() {
      return this.$store.getters.GET_BUTTON_STATE;
    },
  },
  methods: {
     showMore() {

      this.$store.dispatch('GET_MORE_USERS')
    }
  },
};

</script>

<style lang="scss">

</style>
