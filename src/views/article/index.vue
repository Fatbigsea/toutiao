<template>
  <div class="article-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>

    <!-- 加载中 -->
    <van-loading
      size="24px"
      vertical
      color="#1989fa"
      >加载中...
    </van-loading>

    <!-- 文章详情页 -->
    <div class="article-content" >
      <h3 class="title">哈哈哈</h3>
      <div class="content">
        <van-image
          class="img"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        <div class="text">
          <p class="name">哈哈啊哈哈哈哈哈哈哈哈哈</p>
          <p class="time">几天前</p>
        </div>
        <van-button type="info" round size="small">+ 关注 </van-button>
      </div>
      <div class="markdown-body">
        <p></p>
        <p>哈哈哈哈哈哈哈哈哈</p>
        <p>哈哈哈哈哈哈哈哈哈</p>
        <p>哈哈哈哈哈哈哈哈哈</p>
      </div>
    </div>

    <!-- 加载失败提醒 -->
    <div class="error">
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
      >点击重试</van-button>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar>
      <van-tabbar-item class="article-commit">
        <van-button round size="small">写评论</van-button>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o"></van-tabbar-item>
      <van-tabbar-item icon="star-o"></van-tabbar-item>
      <van-tabbar-item icon="good-job-o"></van-tabbar-item>
      <van-tabbar-item icon="share"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import './github-markdown.css'
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
        justify-content: space-between;
        align-items: center;
        height: 40px;
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
          width: 85px;
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
  }

  ::v-deep .van-nav-bar__text ,.van-icon{
    color: #fff;
  }
</style>
