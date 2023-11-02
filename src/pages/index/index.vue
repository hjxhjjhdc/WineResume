<template>
  <layout>
    <uni-row class="content">
<!--      fixed-->
      <uni-col  xs="" sm="" :md="6" :lg="6" :xl="6"  v-show="computedScrollFlag">
        <person-info  :class="[computedScrollFlag?'fix':'fixHide']" v-model="contentObj"></person-info>
      </uni-col>
<!--      default-->
      <uni-col  xs="" sm="" :md="6" :lg="6" :xl="6"  v-show="!computedScrollFlag">
        <person-info :class="[computedScrollFlag?'transparent':'']" v-model="contentObj"></person-info>
      </uni-col>
<!--      right content-->
      <uni-col  xs="" sm="" :md="17" :lg="17" :xl="17">
        <content v-model="contentObj"></content>
      </uni-col>
    </uni-row>
  </layout>
</template>

<script setup>
import layout from '@/components/layout/layout.vue'
import personInfo from '@/components/about-com/side-person-info.vue'
import content from '@/components/about-com/about-content.vue'
import {onMounted, reactive,ref,provide,computed} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import * as _ from 'lodash'


/**
 * 获取userInfo
 * @type {Ref<UnwrapRef<{}>>}
 */
const contentObj = ref({})
const getUserInfo = () =>{
  uniCloud.callFunction({
    name: 'information',
  }).then(({result}) => {
    contentObj.value = result.data[0]
  }).catch((err) => {
    console.error(err)
  })
}
/**
 * provide userInfo contentObj
 */
provide('userInfo', contentObj)

/**
 * 滚动
 * @type {Ref<UnwrapRef<boolean>>}
 */
const computedScrollFlag = computed(()=>{
  return scrollFlag.value && window.innerWidth>=992
})
const scrollFlag = ref(false)
const handleScroll = ()=>{
  scrollFlag.value = window.scrollY > 300;
}
onMounted(()=>{
  getUserInfo()
  window.addEventListener("scroll", _.throttle(handleScroll,100))
})
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 50rpx;
  width: 100%;
  position: relative;
  .fix{
    position: fixed;
    top: 10vh;
    opacity: 1;
    min-width: 500rpx;
  }
  .fixHide{
    position: fixed;
    opacity: 0;
  }
  .transparent{
    opacity: 0;
  }
}
</style>
