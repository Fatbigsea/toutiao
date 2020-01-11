<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell-group>
      <van-cell title="我的频道">
        <van-button
          slot="right-icon"
          type="danger"
          round
          size="mini"
          >
          编辑
        </van-button>
      </van-cell>
      <van-cell>
        <van-grid :gutter="10">
        <van-grid-item
          v-for="channel in userChannel"
          :key="channel.id"
          :text="channel.name"
        />
      </van-grid>
      </van-cell>
    </van-cell-group>

    <!-- 频道推荐 -->
    <van-cell-group>
      <van-cell title="频道推荐">
      </van-cell>
      <van-cell>
        <van-grid :gutter="10">
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字"
        />
      </van-grid>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'channelEdit',
  props: {
    userChannel: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  methods: {
    async getAll () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  created () {
    this.getAll()
  }

}
</script>

<style scoped lang="less">
  .van-cell-group{
    margin-top: 50px;
  }

</style>
