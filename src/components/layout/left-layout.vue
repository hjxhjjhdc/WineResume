<template>
  <view
      :class="['externalBox',scrollFlag?'fix-all':'']"
      :style="scrollFlag?`width:${widthScroll}px`:''"
  >
    <view>
      <personInfo v-show="menuStore.computedIsActive=='about-me'&&!isRetract" v-model="userStore.userInfo"></personInfo>
      <Music @isRetract="handleRetract"></Music>
    </view>
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

const isRetract = ref(false)
const handleRetract =(flag)=>{
    isRetract.value = flag
    const dom = document.querySelector('uni-left-window')
    dom.style.transition='0.3s'
    dom.style.width=flag?'0':'30%'
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