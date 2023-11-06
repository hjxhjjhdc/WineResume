<template>
  <view class="externalBox">
    <uni-row class="content">
      <!--      fixed-->
      <uni-col xs="" sm="" :md="6" :lg="6" :xl="6" v-show="computedScrollFlag">
        <person-info :class="[computedScrollFlag?'fix':'fixHide']" v-model="store.userInfo"></person-info>
      </uni-col>
      <!--      default-->
      <uni-col xs="" sm="" :md="6" :lg="6" :xl="6" v-show="!computedScrollFlag">
        <person-info :class="[computedScrollFlag?'transparent':'']" v-model="store.userInfo"></person-info>
      </uni-col>
      <!--      right content-->
      <uni-col xs="" sm="" :md="17" :lg="17" :xl="17">
        <content v-model="store.userInfo"></content>
      </uni-col>
    </uni-row>
  </view>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive, ref, provide, computed} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import * as _ from 'lodash'
import {useGetUserInfo} from "@/store/useGetUserInfo"


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
  }
}
</style>
