<template>
  <div class="my-like">
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
    />
    <van-tabs v-model="active">
      <van-tab title="收藏">内容 1</van-tab>
      <van-tab title="历史">内容 2</van-tab>
      <van-tab title="作品">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'UserLike',
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style>

</style>
