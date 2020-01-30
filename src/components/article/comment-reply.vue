<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
      left-arrow
      @click-left="$emit('click-close')"
    />

    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>

    <van-divider>全部评论</van-divider>

    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment,index) in list"
        :key="index"
        :comment="comment"
      />
    </van-list>

  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/components/article/comment-item'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data

      this.list.push(...results)

      // console.log(this.list)

      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-reply{
    .van-nav-bar{
      background-color: #fff;
      .van-nav-bar__title{
        color: #000;
      }
      .van-nav-bar__left{
        .van-icon{
          color: #3196fa;
        }
      }
  }
}

</style>
