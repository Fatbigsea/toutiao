<template>
  <div class="my-container">
    <!-- 登录状态开始 -->
    <div class="my-login" v-if="$store.state.user">
      <div class="my-login-header">
        <div class="my-login-img">
          <van-image
          class="img"
          round
          :src="user.photo"
          />
          <div class="my-login-title">
            <div class="title">{{user.name}}</div>
            <!-- <van-button round size="mini" class="btn">申请认证</van-button> -->
            <van-button
             round
             size="mini"
             class="btn"
             @click="$router.push('/user')"
            >
             编辑资料
            </van-button>
          </div>
        </div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item>
            <span class="count">{{user.art_count}}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{user.fans_count}}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{user.follow_count}}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{user.like_count}}</span>
            <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
      </div>
      <van-grid clickable :column-num="3">
        <van-grid-item icon="star-o" text="收藏" to="/my-like/collect">
        </van-grid-item>
        <van-grid-item icon="clock-o" text="历史"  to="/my-like/history">
        </van-grid-item>
        <van-grid-item icon="edit" text="作品" to="/my-like/article">
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 登录状态结束 -->

    <!-- 未登录状态开始 -->
    <div v-else>
      <div class="nologin" @click="login" >
        <div class="nologin-img">
        </div>
      </div>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="star-o" text="收藏" to="/my-like/collect">
        </van-grid-item>
        <van-grid-item icon="clock-o" text="历史" to="/my-like/history">
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 未登录状态结束 -->

    <van-cell-group >
      <van-cell class="cell" title="消息通知" is-link  />
      <van-cell class="cell" title="实名认证" is-link  />
      <van-cell class="cell" title="用户反馈" is-link  />
      <van-cell class="cell" title="小智同学" is-link @click="$router.push('/user/chat')"  />
      <van-cell class="cell" title="系统设置" is-link  />
    </van-cell-group>

     <van-cell-group v-if="$store.state.user">
      <van-cell
        style="text-align: center;marginTop:20px;"
        title="退出登录"
        @click="loginOut"
        clickable
      />
    </van-cell-group>

  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'myPage',
  data () {
    return {
      user: {}

    }
  },
  methods: {
    // 获取用户信息
    async getUser () {
      try {
        const { data } = await getUserInfo()
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    // 点击登录
    login () {
      this.$router.push('/login')
    },
    // 退出登录
    loginOut () {
      this.$dialog.confirm({
        title: '标题',
        message: '你是否确认退出？'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push('/login')
      // on confirm
      }).catch(() => {
      // on cancel
        this.$toast('已取消退出')
      })
    }
  },
  created () {
    if (this.$store.state.user) {
      this.getUser()
    }
  }
}
</script>

<style lang="less" scoped>
.my-login{
  .my-login-header{
    position: relative;
    width: 375px;
    height: 200px;
    background: url('./banner.png');
    .my-login-img{
      position: absolute;
      width:160px;
      height: 70px;
      top: 50px;
      left: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .img{
        width: 70px;
        height: 100%;
      }
      .my-login-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          font-size: 16px;
          color: #fff;
          margin-bottom: 10px;
        }
        .btn{
          width: 70px;
          font-size: 10px;
          color: #46a0fa;
        }
      }
    }
    .van-grid{
      position: absolute;
      bottom: 0;
      width: 100%;
      .van-grid-item{
        ::v-deep .van-grid-item__content {
        background: none;
        color: #fff;
        font-size: 14px;
      }
      }
    }
  }
}

.nologin{
  display: flex;
  width: 375px;
  height: 200px;
  background: url('./banner.png');
  justify-content: center;
  align-items: center;
  .nologin-img{
    width: 70px;
    height: 70px;
    background: url('./mobile.png') no-repeat;
    background-size:cover;

  }
}

</style>
