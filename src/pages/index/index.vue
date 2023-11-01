<template>
  <layout>
    <view class="content">
      <person-info v-model="contentObj"></person-info>
      <content v-model="contentObj"></content>
    </view>
  </layout>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive,ref,provide} from 'vue'
import {onShow} from '@dcloudio/uni-app'

/**
 * 获取userInfo
 * @type {Ref<UnwrapRef<{}>>}
 */
const contentObj = ref({})
/**
 * provide
 */
provide('userInfo', contentObj)
const getUserInfo = () =>{
  uniCloud.callFunction({
    name: 'information',
  }).then(({result}) => {
    contentObj.value = result.data[0]
  }).catch((err) => {
    console.error(err)
  })
}
onMounted(()=>{
  getUserInfo()
})
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  padding-bottom: 50rpx;
}
</style>
