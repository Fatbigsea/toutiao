<template>
  <div class="post-comment">
    <van-field
      class="comment"
      v-model="inputMessage"
      rows="2"
      autosize
      @input="$emit('input',$event)"
      type="textarea"
      maxlength="50"
      placeholder="请输入文明评论"
      show-word-limit
    />
    <van-button
      type="info"
      size="small"
      @click="$emit('click-post',inputMessage)"
    >发布</van-button>
  </div>
</template>

<script>
// import { addComments } from '@/api/comment'
export default {
  name: 'PostComment',
  data () {
    return {
      inputMessage: '',
      list: []
    }
  },
  props: {
    // articleComment: {
    //   type: Object,
    //   required: true
    // }
  },
  methods: {
    // async inputComment () {
    //   const articleComment = this.articleComment
    //   if (!this.inputMessage.length) {
    //     return
    //   }
    //   const { data } = await addComments({
    //     target: this.$route.params.articleId,
    //     content: this.inputMessage
    //   })

    //   this.$emit('click-close')

    //   articleComment.list.unshift(data.data.new_obj)

    //   articleComment.totalCount++

    //   this.inputMessage = ''
    // }

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
