<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
      left-arrow
      @click-left="$emit('click-close')"
    />

    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
  </div>
</template>

<script>
import CommentItem from '@/components/article/comment-item'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem
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
