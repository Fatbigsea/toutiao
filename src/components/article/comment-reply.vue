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

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
       class="write-btn"
       type="default"
       round
       size="small"
       @click="isPostShow=true"
      >
        写评论
      </van-button>
    </div>

    <!-- 弹窗写评论 -->
    <van-popup
     v-model="isPostShow"
     position="bottom"
    >
      <post-comment v-model="postMessage" @click-post="onPost"/>
    </van-popup>
  </div>
</template>
<script>
import { getComments, addComments } from '@/api/comment'
import CommentItem from '@/components/article/comment-item'
import PostComment from '@/components/article/post-comment'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      isPostShow: false,
      postMessage: ''
    }
  },
  components: {
    CommentItem,
    PostComment
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
    },
    async onPost (val) {
      this.postMessage = val
      if (!this.postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0,
        message: '发布中。。。',
        forbidClick: true
      })
      try {
        const { data } = await addComments({
          target: this.comment.com_id.toString(),
          content: this.postMessage,
          art_id: this.articleId.toString()
        })
        this.isPostShow = false
        this.list.unshift(data.data.new_obj)
        this.comment.reply_count++
        this.postMessage = ''
        this.$toast.success('发布成功！')
      } catch (error) {
        this.$toast.fail('发布失败')
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
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn{
      width: 160px;
    }
  }
}

</style>
