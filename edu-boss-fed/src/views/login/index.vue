<template>
    <div class="login">
  <el-form
  :rules="rules"
  ref="form"
  :model="form"
  label-width="80px"
  labelPosition="top">
    <el-form-item
    label="手机号"
    prop="phone"
    >
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item
    label="密码"
    prop="password"
    >
      <el-input
      v-model="form.password"
      type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
      type="primary"
      :loading="isLoginLoading"
      @click="onSubmit"
      >登录</el-button>
    </el-form-item>
</el-form>
    </div>
  </template>

<script>
// import request from '@/utils/request'
// 安装并引入 qs
// import qs from 'qs'
// 引入封装的接口功能组件
import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的对象
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6到18位', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      // this.$refs.form.validate(valid => {  下面用异步的方式，也可以获取结果
      // console.log(valid)  true
      // this.$store.commit('jia')
      this.$store.commit('jia', 5)
      try {
        // 1.设置校验
        // 设置校验成功后的功能
        await this.$refs.form.validate()
        // console.log('通过了校验')

        // 2.发送请求
        this.isLoginLoading = true
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',

        // urlencoded 格式：名=值 & 名=值
        // data: {
        //   phone: this.form.phone,
        //   password: this.form.password
        // }

        //   data: qs.stringify(this.form)
        // })
        const { data } = await login(this.form)
        this.isLoginLoading = false
        // 3.响应处理
        if (data.state === 1) {
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        // 设置校验成功后的功能
        console.log('没有通过校验')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content:center ;
  align-items: center;
}
.el-form {
background-color: #fff;
padding: 20px;
width: 300px;
border-radius: 10px;
}
.el-button{
  width: 100%;
}
</style>
