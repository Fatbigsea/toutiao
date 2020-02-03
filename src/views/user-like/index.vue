<template>
  <div class="my-like">
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-tabs v-model="active">
      <van-tab title="收藏">
        <user-collect/>
      </van-tab>
      <van-tab title="历史">
        <user-history/>
      </van-tab>
      <van-tab title="作品">
        <user-article/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from '@/components/user-like/article'
import UserCollect from '@/components/user-like/collect'
import UserHistory from '@/components/user-like/history'
export default {
  name: 'UserLike',
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active
    }
  },
  components: {
    UserArticle,
    UserCollect,
    UserHistory
  },
  props: {
    type: {
      type: String
    }
  }

}
</script>

<style scoped lang='less'>
  .my-like{
    padding-top: 90px;
    padding-bottom: 50px;
    ::v-deep .van-tabs__wrap{
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }

</style>
