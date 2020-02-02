<template>
  <div class="user-chat">
   <van-nav-bar
    title="小智同学"
    left-arrow
    @click-left="$router.back()"
  />
  <!-- 消息列表 -->
  <div class="message-list" ref="message-list">
    <div class="message-item"
      v-for="(item,index) in 20"
      :key="index"
      :class="{ reverse: index % 2 === 0 }"
    >
      <van-image
       class="avatar"
       slot="icon"
       round
       width="30"
       height="30"
       src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="title">
        <span>{{`hello${index}`}}</span>
      </div>
    </div>
  </div>

  <!-- 发送消息 -->
  <van-cell-group class="send-message">
    <van-field v-model="message" center clearable="" >
      <van-button slot="button" size="small" type="primary">发送</van-button>
    </van-field>
  </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data () {
    return {
      message: ''
    }
  }

}
</script>

<style lang="less" scoped>
  .user-chat {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }

    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }

</style>
