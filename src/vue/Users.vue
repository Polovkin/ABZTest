<template lang="pug">
  #users
    .users__content
      template(v-for="user of GET_USERS")
        UserItem(:user-data="user")
    button.users__button.button-primary(
      v-if="BUTTON_SHOW",
      @click="GET_MORE_USERS",
      :class="{'button-primary--disabled':GET_BUTTON_STATUS}") Show more


</template>

<script>
import UserItem from './components/app/User-item.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Users',
  components: {UserItem},
  computed: mapGetters(["GET_USERS", "GET_BUTTON_STATUS","BUTTON_SHOW"]),
  methods: mapActions(["GET_MORE_USERS", "GET_USERS_DATA"]),
  async mounted() {
    this.GET_USERS_DATA();
  },
};

</script>

<style lang="scss">

</style>
