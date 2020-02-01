<template>
  <div class="user">
    <van-nav-bar
      title="编辑资料"
      left-arrow
       @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell
       title="昵称"
       :value="user.name"
       is-link
       @click="isEditName=true" />
      <!-- <van-cell title="介绍" value="hello world" is-link /> -->
      <van-cell title="性别" :value="user.gender===1?'女':'男'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <van-popup
     v-model="isEditName"
     position="bottom"
    >
      <edit-name
       :name='user.name'
       @close="isEditName=false"
       @confirm="onSave"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/api/user'
import EditName from '@/components/user/edit-name'
export default {
  name: 'user',
  data () {
    return {
      user: {},
      isEditName: false
    }
  },
  components: {
    EditName
  },
  methods: {
    async userProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败！')
      }
    },
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0,
        message: '更新中',
        forbidClick: true
      })
      try {
        await editUserProfile({
          [field]: value
        })
        this.$toast.success('更新成功！')
      } catch (error) {
        console.log(error)
        this.$toast.fail('用户昵称更新失败')
      }
    },
    async onSave (name) {
      await this.saveProfile('name', name)
      this.user.name = name
      this.isEditName = false
    }
  },
  created () {
    this.userProfile()
  }

}
</script>

<style>

</style>
