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
      />
    </form>

     <!-- 浏览历史 -->
      <van-cell title="历史记录">
        <van-icon
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell-group>
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

       <!-- 搜索推荐 -->
        <van-cell-group>
          <van-cell icon="search" title="单元格">
          </van-cell>
          <van-cell icon="search" title="单元格">
          </van-cell>
          <van-cell icon="search" title="单元格">
          </van-cell>
        </van-cell-group>

        <!-- 搜索内容列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>
  </div>
</template>

<script>

export default {
  name: 'SearchName',
  data () {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false
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
