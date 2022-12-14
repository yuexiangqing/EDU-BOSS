<template>
  <div class="app-header">
    <!-- 左侧面包屑导航 -->
  <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 右侧用户信息展示 -->
  <el-dropdown>
     <span class="el-dropdown-link">
        <!-- 用户头像 -->
        <el-avatar
        :src="userInfo.portrait || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
        :size="30"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
     </span>
     <el-dropdown-menu slot="dropdown">
       <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
       <el-dropdown-item
       divided
       @click.native="handleLogout"
       >退出</el-dropdown-item>
       <!-- 注意：这里的退出并不是一个按钮，而是一个组件，在组件操作时给组件绑定的事件都是自定义事件，这里的click事件并不是原生的 DOM 事件，如果想要完成普通的原生的dom事件 -->
      <!-- 可以给当前这个事件设置一个修饰符，可以通过.名称的方式来书写，.native表示当前的是原生事件，从而设置给根元素，就可以操作成功了 -->
     </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script>
// 引入用户信息接口功能
import { getUsrInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo () {
      const { data } = await getUsrInfo()
      this.userInfo = data.content
    },
    // 退出功能
    handleLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.清除 store 中的用户信息
        this.$store.commit('setUser', null)
        // 2.跳转到登录页
        this.$router.push('./login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style>
.app-header{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.el-dropdown-link{
        display: flex;
        align-items: center
}
</style>
