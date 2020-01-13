<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.title"
          @click="$router.push('/article/'+item.art_id)"
        >
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据的时间戳
      isLoading: false
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const resultHeader = data.data.results
      // console.log(resultHeader)

      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.unshift(...resultHeader)
        }
        this.$toast(`刷新成功${resultHeader.length}条新闻`)
        this.isLoading = false
      }, 1000)
    },
    // 下滑刷新
    async onLoad () {
      // 获取文章数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const result = data.data.results
      // console.log(result)

      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(...result)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (result.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      }, 500)
    }
  }

}
</script>

<style>

</style>
