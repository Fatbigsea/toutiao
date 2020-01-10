<template>
  <div class="tabbar-container">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="records">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o">{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style>

</style>
