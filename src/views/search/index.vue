<template>
  <div class="search-page">
    <!-- 搜索 -->
    <form action="/" class="search-from">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @input="onSug"
      />
    </form>

      <!-- 搜索内容列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-if="isResultShow"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>

       <!-- 搜索推荐 -->
        <van-cell-group v-else-if="value">
          <van-cell
            icon="search"
            v-for="(item,index) in suggestion"
            :key="index"
            >
            <div slot="title" v-html="highlight(item)"></div>
          </van-cell>
        </van-cell-group>

             <!-- 浏览历史 -->
        <van-cell-group v-else >
          <van-cell title="历史记录" >
          <van-icon
            slot="right-icon"
            name="delete"
            style="line-height: inherit;"
          />
          </van-cell>
          <van-cell title="单元格">
            <van-icon
            slot="right-icon"
            name="close"
            style="line-height: inherit;"
            />
          </van-cell>
          <van-cell title="单元格">
            <van-icon
            slot="right-icon"
            name="close"
            style="line-height: inherit;"
            />
          </van-cell>
        </van-cell-group>

  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  name: 'SearchName',
  data () {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      isResultShow: false,
      suggestion: []
    }
  },
  methods: {
    onCancel () {
      this.$router.push('/')
    },
    onSearch () {
      console.log('search')
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 获取搜索推荐列表
    async onSug () {
      const searchText = this.value
      if (!searchText) {
        return
      }
      const { data } = await getSuggestion(searchText)
      this.suggestion = data.data.options
    },
    // 高亮显示
    highlight (str) {
      return str.toLowerCase().replace(this.value.toLowerCase(),
        `<span style="color:red;">${this.value}</span>`
      )
    }
  }

}
</script>

<style scoped lang="less">
.search-page{
  padding-top:54px;
  .search-from{
    position: fixed;
    z-index:2;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}

</style>
