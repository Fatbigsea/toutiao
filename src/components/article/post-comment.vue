<template>
  <div class="post-comment">
    <van-field
      class="comment"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入文明评论"
      show-word-limit
    />
    <van-field>
      <van-button slot="button" type="info" size="small">发布</van-button>
    </van-field>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  data () {
    return {
      message: ''
    }
  }

}
</script>

<style lang="less" scoped>
  .post-comment{
    padding: 10px;
    ::v-deep .comment{
      .van-cell__value{
      background-color: #eee;
     }
   }

  }

</style>
