<template>
  <div class="dashboard-container">
    <br><br><br><br>
    <img class="logo" src="@/assets/img/logo.png" alt="logo">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.logo{
    margin-left: 290px;
}
</style>
