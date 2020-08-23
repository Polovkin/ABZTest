<template lang="pug">
  .user__card
    header.user__header
      img.user__photo(:src="UserData.photo", alt="user-avatar")
      h4.user__name {{UserData.name}}
    section.user__body
      p.user__position {{UserData.position}}
      .user__email(:data-email="UserData.email")
        p.user__email-text {{UserData.email}}
      p.user__phone {{UserData.phone}}



</template>

<script>
export default {
  name: "User-item.vue",
  props: {
    UserData: {},
  },
}
</script>

<style scoped>

</style>
