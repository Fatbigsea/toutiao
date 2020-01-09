<template>
  <div class="login">
    <van-nav-bar
      title="登录"
    />
    <!-- ValidationProvider把需要校验的整个表单包起来 -->
    <!-- ValidationObserver把需要校验的具体表单元素包起来 -->
    <!-- 登录表单 -->
    <ValidationObserver ref="loginForm">
      <van-cell-group>
        <validationProvider
          name="手机号"
          rules="required|mobile"
          >
          <van-field
          clearable
          v-model="user.mobile"
          label="手机号"
          placeholder="请输入手机号"
          >
            <i class="iconfont icon-shouji" slot="left-icon"></i>
          </van-field>
          <!-- 错误信息展示区域,错误信息是一个数组，显示第一个错误信息就行 -->
          <!-- <span>{{errors[0]}}</span> -->
        </validationProvider>
        <validationProvider
          name="验证码"
          rules="required|code"
          >
          <van-field
            v-model="user.code"
            label="验证码"
            placeholder="请输入验证码"
          >
            <i class="iconfont icon-mima" slot="left-icon"></i>
          <van-count-down
            :time="1000*60"
            slot="button"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow=false"
            />
            <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            @click="onSendSmsCode"
            >发送验证码</van-button>
          </van-field>
        </validationProvider>
      </van-cell-group>
    </ValidationObserver>

    <div class="login-btn-box">
      <van-button type="info" @click="toLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        code: '',
        mobile: ''
      },
      isCountDownShow: false
    }
  },
  methods: {
    async toLogin () {
      // const user = this.user
      const success = await this.$refs.loginForm.validate()
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.loginForm.errors
          const item = Object.values(errors).find(item => {
            return item[0]
          })
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })
      try {
        // console.log(login())

        const res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    async onSendSmsCode () {
      const { mobile } = this.user
      const validateRes = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateRes.valid) {
        this.$toast(validateRes.errors[0])
        return
      }
      try {
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('验证码发送失败')
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
