<template>
  <PageLayout>
    <template #fixed="fixedProps">
      <Music :class="fixedProps.class"></Music>
    </template>
    <template #default="defaultProps">
      <Music :class="defaultProps.class"></Music>
    </template>
    <template #rightContent>
      <view style="height: 100vh">
        111
      </view>
    </template>
  </PageLayout>
</template>

<script setup>
import {onMounted, provide, ref} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import PageLayout from '@/components/layout/pageLayout.vue'
import Music from '@/components/music/music.vue'

/**
 * 获取userInfo
 */
const store = useGetUserInfo()


</script>

<style scoped lang="scss">
.externalBox {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rpx;

  .content {
    //margin-top: 120rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 50rpx;
    position: relative;
    max-width: 1200px;
    width: 90%;
    height: 10vh;
  }
}
</style>