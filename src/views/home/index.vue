<template>
  <div class="home-container">
    <van-nav-bar title="首页" />
    <van-tabs v-model="activeName">
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      activeName: 0
    }
  }

}
</script>

<style>

</style>
