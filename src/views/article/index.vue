<template>
  <div class="article-container">
    文章详情页
  </div>
</template>

<script>
export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  }
}
</script>

<style>

</style>
