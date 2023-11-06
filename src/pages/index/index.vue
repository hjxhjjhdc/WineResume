<template>
  <PageLayout>
    <template #fixed="fixedProps">
      <person-info :class="fixedProps.class" v-model="store.userInfo"></person-info>
    </template>
    <template #default="defaultProps">
      <person-info :class="defaultProps.class" v-model="store.userInfo"></person-info>
    </template>
    <template #rightContent>
      <content v-model="store.userInfo"></content>
    </template>
  </PageLayout>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive, ref, provide, computed} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import * as _ from 'lodash'
import {useGetUserInfo} from "@/store/useGetUserInfo"
import PageLayout from '@/components/layout/pageLayout.vue'


/**
 * 获取userInfo
 * @type {Ref<UnwrapRef<{}>>}
 */
const store = useGetUserInfo()

/**
 * 滚动
 * @type {Ref<UnwrapRef<boolean>>}
 */
const computedScrollFlag = computed(() => {
  return scrollFlag.value && window.innerWidth >= 992
})
const scrollFlag = ref(false)
const handleScroll = () => {
  scrollFlag.value = window.scrollY > 1;
}
onMounted(() => {
  window.addEventListener("scroll", _.throttle(handleScroll, 100))
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
