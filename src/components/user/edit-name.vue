<template>
  <div class="edit-name">
    <van-nav-bar
      title="编辑名字"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="$emit('confirm',message)"
    />
    <van-field
     class="field"
     :value="name"
     @input="message=$event"
     placeholder="请输入昵称"
     rows="2"
     autosize
     type="textarea"
     maxlength="20"
     show-word-limit
    />
  </div>
</template>

<script>
export default {
  name: 'EditName',
  data () {
    return {
      message: ''
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
  .van-nav-bar{
    background: #fff;
    .van-nav-bar__title{
      color: #333;
    }
  }
  .field {
    background: #fff;
    /deep/ .van-cell__value {
      background: #f5f5f5;
      padding: 10px;
    }
  }

</style>
