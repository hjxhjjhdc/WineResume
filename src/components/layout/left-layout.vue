<template>
  <view
      :class="['externalBox',scrollFlag?'fix-all':'']"
      :style="scrollFlag?`width:${widthScroll}px`:''"
  >
    <Music></Music>
    <personInfo v-if="menuStore.computedIsActive=='about-me'" v-model="userStore.userInfo"></personInfo>
  </view>
</template>

<script setup>
import Music from '@/components/music/music.vue'
import personInfo from '@/pages/index/components/about-com/side-person-info.vue'
import {useMenu} from "@/store/useMenu";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import {onMounted,ref} from "vue";
import * as _ from "lodash";

/**
 * menu-store
 */
const menuStore = useMenu()
/**
 * user-store
 */
const userStore = useGetUserInfo()

/**
 * 滚动
 */
const scrollFlag= ref(false)
const widthScroll = ref(30)
const handleScroll =()=>{
  scrollFlag.value = window.scrollY > 110;
  const leftWindow = document.getElementsByTagName('uni-left-window')
  widthScroll.value = leftWindow[0].clientWidth -10
}
onMounted(()=>{
  window.addEventListener("scroll", _.throttle(handleScroll, 100))
})
</script>

<style scoped lang="scss">
.externalBox{
  padding: 10rpx;
}
.fix-all{
  position: fixed;
  top: 180rpx;
}
</style>