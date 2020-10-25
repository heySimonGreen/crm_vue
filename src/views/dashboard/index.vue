<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">username: {{ username }}</div>
    <div class="dashboard-text">adminid: {{ adminid }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getusername, getadminid } from '@/utils/auth'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: getusername(),
      adminid: getadminid()
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
