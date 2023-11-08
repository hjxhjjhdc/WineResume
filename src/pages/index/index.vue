<template>
<!--  <PageLayout>
    <template #fixed="fixedProps">
      <person-info :class="fixedProps.class" v-model="store.userInfo"></person-info>
    </template>
    <template #default="defaultProps">
      <person-info :class="defaultProps.class" v-model="store.userInfo"></person-info>
    </template>
    <template #rightContent>
    </template>
  </PageLayout>-->
      <content v-model="store.userInfo"></content>
</template>

<script setup>

import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive, ref, provide, computed} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import * as _ from 'lodash'
import {useGetUserInfo} from "@/store/useGetUserInfo"
import PageLayout from '@/components/layout/pageLayout.vue'


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
