<template>
  <view class="externalBox">
    <Music></Music>
    <personInfo v-if="menuStore.computedIsActive=='about-me'" v-model="userStore.userInfo"></personInfo>
  </view>
</template>

<script setup>
import Music from '@/components/music/music.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
import {useMenu} from "@/store/useMenu";
import {useGetUserInfo} from "@/store/useGetUserInfo";

/**
 * menu-store
 */
const menuStore = useMenu()
/**
 * user-store
 */
const userStore = useGetUserInfo()
</script>

<style scoped lang="scss">
.externalBox{
  padding: 10rpx;
}
</style>