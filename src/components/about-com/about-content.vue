<template>
  <view class="content-box">
    <view style="width: 100%">
      <skeleton
          :loading="skeleton.contentLoading"
          :row="skeleton.contentRow"
          :showAvatar="skeleton.contentShowAvatar"
          :showTitle="skeleton.contentShowTitle"
          :titleWidth="skeleton.contentTitleWidth"
      >
        <view class="content" v-html="content"></view>
      </skeleton>
    </view>
  </view>
</template>

<script setup>
import  * as marked from 'marked'
import {reactive, ref, watch} from "vue";
import Skeleton from '@/components/primewind-skeleton/components/skeleton/index.vue'

const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const content = ref('')
watch(()=>props.modelValue,(n,o)=>{
  if(n){
    skeleton.contentLoading=false
    content.value = marked.parse(n.professionalSkills)
  }
})

/**
 *  骨架屏
 */
const skeleton = reactive({
  contentLoading :true,
  contentRow: 7,
  contentShowAvatar: false,
  contentShowTitle: true,
  contentTitleWidth:'20%',
})

</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
}
.content-box{
  width: 100%;
  padding: 50rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  margin-left: 50rpx;
  .content{
    line-height: 1.5;
  }
}
</style>