<template>
  <PageLayout>
    <template #rightContent>

    </template>
  </PageLayout>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {onMounted, provide, ref} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import PageLayout from '@/components/layout/pageLayout.vue'

onLoad(({name}) => {
  uni.setNavigationBarTitle({
    title: name
  })
})
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