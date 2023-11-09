<template>
  <content v-model="store.userInfo"></content>
</template>

<script setup>

import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive, ref, provide, computed} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import {useGetUserInfo} from "@/store/useGetUserInfo"


/**
 * 获取userInfo
 * @type {Ref<UnwrapRef<{}>>}
 */
const store = useGetUserInfo()

onLoad(({name}) => {
  uni.setNavigationBarTitle({
    title: name
  })
})
</script>

<style lang="scss" scoped>
.fix {
  position: fixed;
  top: 27vh;
  opacity: 1;
  min-width: 500rpx;
}

.fixHide {
  position: fixed;
  opacity: 0;
}

.transparent {
  opacity: 0;
}
</style>
