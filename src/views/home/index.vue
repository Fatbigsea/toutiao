<template>
  <div class="home-container">
    <van-nav-bar title="首页" />
    <van-tabs v-model="activeName">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        {{ item.name }}
        <ArticleList :channel="channel"></ArticleList>
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

<style>

</style>
