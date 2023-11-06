<template>
  <view class="externalBox">
    <uni-row class="content">
      <!--      fixed-->
      <uni-col xs="" sm="" :md="6" :lg="6" :xl="6" v-show="computedScrollFlag">
        <slot name="fixed" :class="[computedScrollFlag?'fix':'fixHide']"></slot>
      </uni-col>
      <!--      default-->
      <uni-col xs="" sm="" :md="6" :lg="6" :xl="6" v-show="!computedScrollFlag">
        <slot name="default" :class="[computedScrollFlag?'transparent':'']"></slot>
      </uni-col>
      <!--      right content-->
      <uni-col xs="" sm="" :md="17" :lg="17" :xl="17">
        <slot name="rightContent"></slot>
      </uni-col>
    </uni-row>
  </view>
</template>

<script setup>
import {onMounted, reactive, ref, provide, computed} from 'vue'
import * as _ from 'lodash'


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

  }
}
</style>
