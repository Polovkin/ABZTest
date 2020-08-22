<template lang="pug">
  .lds-ring
    div
    div
    div
    div
    p(v-if="msg") {{msg}}
</template>

<script>
  export default {
    name: "loader",
      props: {
          msg: {
              type: String,
              default: 0
          },
      },
  }
</script>

<style scoped
       lang="scss">
  .lds-ring {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    p {
        color: red;
        text-align: center;
        position: relative;
        top: -60px;
        font-weight: bold;
    }
    & div {
      width: 100%;
      height: 100%;
    }
  }
</style>
