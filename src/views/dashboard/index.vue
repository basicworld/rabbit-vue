<template>
  <div class="dashboard-customer-container">
    <div>
      <span>你好 {{ name }}，欢迎登录！ </span><br><br>
    </div>
    <div>
      <img src="@/assets/images/walking-man.gif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { areYouOk } from '@/api/router'
export default {
  name: 'DashboardCustomer',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    areYouOk()
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
  .dashboard-customer-container {
    background-color: #e3e3e3;
    min-height: calc(100vh - 50px);
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
