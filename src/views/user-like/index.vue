<template>
  <div class="my-like">
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
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
    return {
      active: 0
    }
  },
  components: {
    UserArticle,
    UserCollect,
    UserHistory
  }

}
</script>

<style>

</style>
