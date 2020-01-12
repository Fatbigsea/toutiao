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
          @click="isEditShow=!isEditShow"
          >
          {{isEditShow?'完成':'编辑'}}
        </van-button>
      </van-cell>
      <van-cell>
        <van-grid :gutter="10">
        <van-grid-item
          v-for="(channel,index) in userChannel"
          :key="channel.id"
          @click="changeOrDel(index)"
        >
        <span
          slot="text"
          :class="{active : value === index}"
          class="text"
          >
          {{channel.name}}</span>
        <van-icon
        class="close-icon"
        slot="icon"
        name="close"
        v-if="isEditShow===true && index !== 0"
        size="24"/>
        </van-grid-item>
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
          v-for="channel in remainChannels"
          :key="channel.id"
          :text="channel.name"
          @click="addChannel(channel)"
        />
      </van-grid>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  props: {
    userChannel: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  methods: {
    async getAll () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    addChannel (channel) {
      this.userChannel.push(channel)
    },
    changeOrDel (index) {
      if (this.isEditShow && index !== 0) {
        // 当isEditShow为true时编辑状态，是删除
        this.userChannel.splice(index, 1)
      } else {
        // 不是编辑状态时，是跳转浏览
        this.$emit('input', index)
        this.$emit('close')
      }
    }
  },
  computed: {
    remainChannels () {
      const otherChannels = []
      this.allChannels.forEach(item => {
        if (!this.userChannel.find(my => my.id === item.id)) {
          otherChannels.push(item)
        }
      })
      return otherChannels
    }
  },
  watch: {
    userChannel () {
      setItem('user-channel', this.userChannel)
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
  .van-cell__value{
    padding-top: 10px;
  }
  ::v-deep .van-grid-item__icon-wrapper{
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .wap-nav{
    font-size: 24px;
  }
  .active{
    color: red;
  }
</style>
