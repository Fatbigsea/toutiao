<template>
  <div class="user">
    <van-nav-bar
      title="编辑资料"
      left-arrow
       @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onSelectImg">
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <!-- 编辑头像，文件上传 -->
      <input type="file" hidden @change="onImgChange" ref="file">

      <van-cell
       title="昵称"
       :value="user.name"
       is-link
       @click="isEditName=true" />
      <van-cell
       title="性别"
       :value="user.gender===1?'女':'男'"
       is-link
       @click="isEditGender=true"
      />

      <!-- 编辑性别 -->
      <van-action-sheet
        v-model="isEditGender"
        :actions="actions"
        description="编辑性别"
        cancel-text="取消"
        @cancel="isEditGender=false"
        @select="onSelectGender"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isEditBirthday=true"
      />
    </van-cell-group>
    <!-- 编辑昵称 -->
    <van-popup
     v-model="isEditName"
     position="bottom"
    >
      <edit-name
       :name='user.name'
       @close="isEditName=false"
       @confirm="onSaveName"
      />
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
      v-model="isEditBirthday"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthday=false"
        @confirm="onSelectBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/api/user'
import EditName from '@/components/user/edit-name'
import moment from 'moment'
export default {
  name: 'user',
  data () {
    return {
      user: {},
      isEditName: false,
      isEditGender: false,
      isEditBirthday: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      currentDate: new Date(),
      minDate: new Date(1980, 0, 1),
      maxDate: new Date()
    }
  },
  components: {
    EditName
  },
  computed: {
    file () {
      return this.$refs['file']
    }
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
        this.$toast.fail('更新失败')
      }
    },
    // 昵称
    async onSaveName (name) {
      await this.saveProfile('name', name)
      this.user.name = name
      this.isEditName = false
    },
    // 性别
    async onSelectGender ({ value }) {
      await this.saveProfile('gender', value)
      this.user.gender = value
      this.isEditGender = false
    },
    // 生日
    async onSelectBirthday (value) {
      value = moment(value).format('YYYY-MM-DD')
      await this.saveProfile('birthday', value)
      this.user.birthday = value
      this.isEditBirthday = false
    },
    // 头像
    onSelectImg () {
      console.log('选择头像')
      this.file.click()
    },
    onImgChange () {
      console.log('头像选择了')
    }
  },
  created () {
    this.userProfile()
  }

}
</script>

<style>

</style>
