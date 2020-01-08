<template>
  <div class="login">
    <van-nav-bar
      title="登录"
    />
    <van-cell-group>
      <van-field
        clearable
        required
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        required
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="login-btn-box">
      <van-button type="info" @click="toLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        code: '',
        mobile: ''
      }
    }
  },
  methods: {
    async toLogin () {
      // const user = this.user
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })
      try {
        // console.log(login())
        await login(this.user)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    }
  }

}
</script>

<style scoped lang="less">
.login{
  .login-btn-box{
    padding: 20px;
    .van-button {
      background-color: #6db4fb;
      width: 100%;
    }
  }
}

</style>
