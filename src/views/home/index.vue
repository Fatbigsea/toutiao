<template>
  <div class="home-container">
    <van-nav-bar title="首页" fixed/>
    <van-tabs v-model="activeName">
      <van-icon
      name="wap-nav"
      slot="nav-right"
      class="wap-nav" />
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from '@/components/home/article-list'
export default {
  name: 'HomePage',
  data () {
    return {
      activeName: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  methods: {
    // 获取用户频道列表
    async getChannel () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        console.log(this.channels)
      } catch (error) {
        this.$toast('用户频道信息获取失败')
      }
    }
  },
  created () {
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
  }
</style>
