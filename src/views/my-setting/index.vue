<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="180px" style="height: 100vh; background-color: rgb(238, 241, 246);">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1">
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>

      <el-main>
        <div v-show="activeMenuIndex==='1'">
          <PersonalInformation />
        </div>
        <div v-show="activeMenuIndex==='2'">
          <ChangePassword />
        </div>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import ChangePassword from './components/ChangePassword'
import PersonalInformation from './components/PersonalInformation'
export default {
  components: { ChangePassword, PersonalInformation },
  data() {
    return {
      activeMenuIndex: '1'
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenuIndex = index
    }
  }
}
</script>

