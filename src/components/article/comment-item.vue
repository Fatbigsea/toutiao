<template>
    <!-- 评论作者名称 -->
    <van-cell  class="comment-item">
      <van-image
      slot="icon"
      class="img"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <!-- 作者名称 -->
      <span style="color:#466b9d;" slot="title">{{comment.aut_name}}</span>

      <div slot="label">
        <p style="color:#363636">{{comment.content}}</p>
        <p>
          <span style="margin-right:10px;">{{comment.pubdate | relativeTime}}</span>
          <van-button
            size="mini"
            @click="$emit('click-reply',comment)"
          >回复{{comment.reply_count}}
          </van-button>
        </p>
      </div>
      <div slot="right-icon" class="like-container">
        <van-icon
          @click="isLike"
          :color="comment.is_liking?'#e5645f' : ''"
          :name="comment.is_liking?'good-job':'good-job-o'" />
        <span>{{comment.is_liking?'':'赞'}}</span>
      </div>
    </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async isLike () {
      // 评论点赞参数错误
      try {
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id.toString())
          this.$toast('取消点赞')
        } else {
          await addCommentLike(this.comment.com_id.toString())
          this.$toast('点赞成功')
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .comment-item{
    display: flex;
    align-items: flex-start;
    .img{
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .like-container{
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;

    }
  }

</style>
