<template>
  <view>
    <!--  Professional Skills-->
    <view class="content-box">
      <skeleton
          :loading="skeleton.contentLoading"
          :row="skeleton.contentRow"
          :showAvatar="skeleton.contentShowAvatar"
          :showTitle="skeleton.contentShowTitle"
          :titleWidth="skeleton.contentTitleWidth"
      >
        <view class="content-title">
          <keCheng class="icon"/>
          <view>Professional Skills</view>
        </view>
        <view class="content">
          <view v-html="professionalSkills"></view>
        </view>
      </skeleton>
    </view>
    <!--  Project Experience-->
    <view class="content-box">
      <skeleton
          :loading="skeleton.contentLoading"
          :row="skeleton.contentRow"
          :showAvatar="skeleton.contentShowAvatar"
          :showTitle="skeleton.contentShowTitle"
          :titleWidth="skeleton.contentTitleWidth"
      >
        <view class="content-title">
          <bianCheng class="icon"/>
          <view>Project Experience</view>
        </view>
        <view class="content">
          <view v-html="projectExperience"></view>
        </view>
      </skeleton>
    </view>
    <!--  Work Experience-->
    <view class="content-box">
      <skeleton
          :loading="skeleton.contentLoading"
          :row="skeleton.contentRow"
          :showAvatar="skeleton.contentShowAvatar"
          :showTitle="skeleton.contentShowTitle"
          :titleWidth="skeleton.contentTitleWidth"
      >
        <view class="content-title">
          <shangWang class="icon"/>
          <view>Work Experience</view>
        </view>
        <view class="content">
          <view v-html="workExperience"></view>
        </view>
      </skeleton>
    </view>
  </view>
</template>

<script setup>
import * as marked from 'marked'
import {onMounted, reactive, ref, watch} from "vue";
import Skeleton from '@/components/primewind-skeleton/components/skeleton/index.vue'
import keCheng from '@/static/icon/small-icon-svg/kecheng.vue'
import bianCheng from '@/static/icon/small-icon-svg/biancheng.vue'
import shangWang from '@/static/icon/small-icon-svg/shangwang.vue'

const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

/**
 * userModel 用户模块内容
 * @type {Ref<UnwrapRef<string>>}
 */
const professionalSkills = ref(marked.parse(props.modelValue.professionalSkills))
const projectExperience = ref(marked.parse(props.modelValue.projectExperience))
const workExperience = ref(marked.parse(props.modelValue.workExperience))
/**
 * 监听props
 */
watch(() => props.modelValue, (n, o) => {
  if (n) {
    skeleton.contentLoading = false
    professionalSkills.value = marked.parse(n.professionalSkills)
    projectExperience.value = marked.parse(n.projectExperience)
    workExperience.value = marked.parse(n.workExperience)
  }
})

/**
 *  骨架屏
 */
const skeleton = reactive({
  contentLoading: true,
  contentRow: 7,
  contentShowAvatar: false,
  contentShowTitle: true,
  contentTitleWidth: '20%',
})
onMounted(()=>{
  if(props.modelValue){
    skeleton.contentLoading = false
  }
})
</script>

<style scoped lang="scss">
@import "../../uni";

* {
  padding: 0;
  margin: 0;
}

.content-box {
  width: 100%;
  height: 50vh;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  margin-bottom: 50rpx;

  .content-title {
    font-size: $title-font-size;
    padding: 40rpx 0 0 40rpx;
    display: flex;
    align-items: center;

    .icon {
      width: 50rpx;
      height: 50rpx
    }
  }

  .content {
    line-height: 1.5;
    padding: 50rpx;
  }
}
</style>