<template>
  <div class="article-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>

    <!-- 加载中 -->
    <van-loading
      v-if="isLoading"
      size="24px"
      vertical
      color="#1989fa"
      >加载中...
    </van-loading>

    <!-- 文章详情页 -->
    <div class="article-content"  v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="content">
        <van-image
          class="img"
          round
          fit="cover"
          :src="article.aut_photo"
          />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeTime}}</p>
        </div>
        <van-button
          v-if="!$store.state.user || article.aut_id!==$store.state.user.id"
          :type="article.is_followed?'default':'info'"
          round
          size="small"
          :loading="isLoadingFollow"
          @click="isFollow">
          {{article.is_followed?'已关注':'+ 关注'}}
        </van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
    </div>

    <!-- 加载失败提醒 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="getArticle"
      >点击重试</van-button>
    </div>

    <van-divider>正文结束</van-divider>
     <!-- 评论列表 -->
    <van-list
      v-model="articleComment.loading"
      :finished="articleComment.finished"
      finished-text="没有更多评论了"
      @load="onLoad"
      >
      <comment-item
        v-for="(comment,index) in articleComment.list"
        :key="index"
        :comment="comment"
      />
    </van-list>

    <!-- 评论弹窗 -->
    <van-popup
      v-model="isPopupShow"
      round
      position="bottom"
    >
      <!-- 写评论组件 -->
      <post-comment
      :articleComment="articleComment"
      :popupShow="isPopupShow"
      />
    </van-popup>
    <!-- 底部标签栏 -->
    <van-tabbar>
      <van-tabbar-item class="article-commit">
        <van-button
          round
          size="small"
          @click="isPopupShow=true"
        >
          写评论
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" :info="articleComment.totalCount">
      </van-tabbar-item>
      <van-tabbar-item
        class="start"
        @click="isCollect"
        :icon="article.is_collected? 'star':'star-o'">
      </van-tabbar-item>
      <van-tabbar-item
        class="good"
        :icon="article.attitude===1 ?'good-job': 'good-job-o'"
        @click="isLike"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="share"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticlesById,
  addCollection,
  deleteCollection,
  addLike,
  deleteLike
} from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import CommentItem from '@/components/article/comment-item'
import PostComment from '@/components/article/post-comment'
import { getComments } from '@/api/comment'

export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  components: {
    CommentItem,
    PostComment
  },
  data () {
    return {
      article: {},
      isLoading: true,
      isLoadingFollow: false,
      articleComment: {
        list: [],
        loading: false,
        finished: false,
        offset: null,
        totalCount: 0
      },
      isPopupShow: false
    }
  },
  methods: {
    // 获取文章评论
    async onLoad () {
      // 获取数据
      const { data } = await getComments({
        type: 'a',
        source: this.articleId,
        offset: this.articleComment.offset,
        limit: 10
      })

      // 将数据添加到列表中
      const { results } = data.data
      this.articleComment.list.push(...results)
      // 更新总数据条数
      this.articleComment.totalCount = data.data.total_count

      // 加载状态结束
      this.articleComment.loading = false

      // 判断数据是否全部加载完成
      if (results.length) {
        this.articleComment.offset = data.data.last_id
      } else {
        this.articleComment.finished = true
      }
    },
    // 获取文章详情
    async getArticle () {
      this.isLoading = true
      try {
        const { data } = await getArticlesById(this.articleId)
        this.article = data.data
      } catch (error) {

      }
      this.isLoading = false
    },
    // 是否收藏
    async isCollect () {
      try {
        if (this.article.is_collected) {
          await deleteCollection(this.articleId)
          this.article.is_collected = false
          this.$toast('取消收藏')
        } else {
          await addCollection(this.articleId)
          this.article.is_collected = true
          this.$toast('收藏成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 是否点赞
    async isLike () {
      try {
        if (this.article.attitude === -1) {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast('点赞成功')
        } else if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast('取消点赞')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 是否关注
    async isFollow () {
      this.isLoadingFollow = true
      const userId = this.article.aut_id
      try {
        if (this.article.is_followed) {
          await deleteFollow(userId)
          this.article.is_followed = false
          this.$toast('取消关注')
        } else {
          await addFollow(userId)
          this.article.is_followed = true
          this.$toast('关注成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isLoadingFollow = false
    }
  },
  created () {
    this.getArticle()
  }
}

</script>

<style scoped lang="less">

  .article-container{
    // 顶部导航
    padding:50px 20px;
    .van-nav-bar{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
    // 加载区域
    .van-loading{
      margin-top: 100px;
    }
    // 内容区域
    .article-content{
      .title{
        font-size: 20px;
        color: #3A3A3A;
      }
      .content{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        margin: 30px 0;
        .img{
          width: 60px;
          height: 60px;
          margin-right: 20px;
          padding: 20px 0;
        }
        .text{
          display: flex;
          flex-direction: column;
          .name{
            font-size: 14px;
            margin: 0;
          }
          .time{
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
        .van-button{
          position: absolute;
          width: 85px;
          right: 30px;
        }
      }
    }

    // 加载失败提示
    .error {
    padding-top: 100px;
    text-align: center;
      .text {
        font-size: 15px;
      }
      .btn {
        width: 30%;
      }
    }
  }
  // 底部标签
  .van-hairline--top-bottom{
    position: fixed;
    border-top:1px solid #ccc;
    display: flex;
    align-items: center;
      .article-commit{
      ::v-deep .van-tabbar-item__text{
        display: flex;
        align-items: center;
        justify-content: center;
        .van-button{
          width: 150px;
          margin-left: 20px;
        }
      }
    }
    .start{
      ::v-deep .van-icon{
        color:orange;
      }
    }
    .good{
      ::v-deep .van-icon{
        color:red;
      }
    }
  }
</style>
