<template>
  <div class="home-container">
    <van-nav-bar title="首页" fixed>
      <van-button
        slot="title"
        round
        size="small"
        plain
        type="info"
        @click="$router.push('/search')"
        >
        搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="activeName">
      <van-icon
        name="wap-nav"
        slot="nav-right"
        class="wap-nav"
        @click="isPopupShow = true"
      />
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="isPopupShow"
      closeable
      round
      position="bottom"
      :style="{ height: '95%' }"
    >
      <channel-edit
      :user-channel="channels"
      v-model="activeName"
      @close="isPopupShow=false"
      ></channel-edit>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from '@/components/home/article-list'
import ChannelEdit from '@/components/home/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  data () {
    return {
      activeName: 0,
      channels: [],
      isPopupShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    // 获取用户频道列表
    async getChannel () {
      // try {
      //   const { data } = await getUserChannels()
      //   this.channels = data.data.channels
      //   console.log(this.channels)
      // } catch (error) {
      //   this.$toast('用户频道信息获取失败')
      // }
      let channels = []
      const localUserChannles = getItem('user-channel')
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        const { data } = await getUserChannels()
        channels = data.data.channels
      }
      this.channels = channels
    }
  },
  created () {
    this.getChannel()
    if (this.$store.state.user) {
      this.getChannel()
    }
  }

}
</script>

<style scoped lang="less">
.home-container{
  padding: 90px 0 50px;
}
  ::v-deep .van-tabs__wrap{
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    z-index: 2;
  }
  .wap-nav{
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    font-size:24px;
  }
  .van-button{
    background-color: #5babfb;
    height:30px;
    width: 100%;
    color: #fff;
    font-size: 16px;
  }
</style>
