<template>
  <div class="post-comment">
    <van-field
      class="comment"
      v-model="inputMessage"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入文明评论"
      show-word-limit
    />
    <van-button
      type="info"
      size="small"
      @click="inputComment"
    >发布</van-button>

  </div>
</template>

<script>
import { addComments } from '@/api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      inputMessage: '',
      list: []
    }
  },
  props: {
    articleComment: {
      type: Object,
      required: true
    },
    popupShow: {
      type: Boolean,
      required: true
    }

  },
  methods: {
    async inputComment () {
      if (!this.inputMessage.length) {
        return
      }
      const { data } = await addComments({
        target: this.$route.params.articleId,
        content: this.inputMessage
      })

      this.popupShow = false

      this.articleComment.list.unshift(data.data.new_obj)

      this.articleComment.totalCount++

      this.inputMessage = ''
    }

  }

}
</script>

<style lang="less" scoped>
  .post-comment{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
    ::v-deep .comment{
      .van-cell__value{
      background-color: #eee;
     }
   }
   .van-button{
     margin-right: 15px;
   }
  }

</style>
