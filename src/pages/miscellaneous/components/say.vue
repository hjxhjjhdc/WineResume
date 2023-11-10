<template>
  <view class="say">
    <view class="title">
      <h3>巴啦啦能量 · 乌卡拉卡</h3>
    </view>
    <uni-forms ref="baseForm" :modelValue="baseFormData">
      <view class="balabalaInput">
        <uni-easyinput
            type="textarea"
            autoHeight
            :trim="true"
            :maxlength="-1"
            v-model="baseFormData.value"
            placeholder="阿巴阿巴阿巴······"
        >
        </uni-easyinput>
        <view class="input-controller">
          <view class="input-controller-content">
            <view class="input-controller-item">
              <view class="iconfont icon-biaoqing"></view>
              <view>表情</view>
              <view class="emoji"></view>
            </view>
            <view class="input-controller-item">
              <view class="iconfont icon-icon"></view>
              <view>图片</view>
            </view>
            <view class="input-controller-item">
              <view class="iconfont icon-shipin"></view>
              <view>视频</view>
            </view>
            <view class="input-controller-item">
              <view class="iconfont icon-huati"></view>
              <view>话题</view>
            </view>
            <view class="input-controller-item">
              <view class="iconfont icon-didian_xianxing"></view>
              <view>地点</view>
            </view>
            <view class="input-controller-item" title="暂未开放登录权限~~敬请期待">
              <uni-data-checkbox disabled="" selectedColor="#e8a4a4" multiple v-model="baseFormData.checkBox" :localdata="baseFormData.range"></uni-data-checkbox>
            </view>
          </view>
          <view class="input-controller-button">
            <view :class="['btn', computedBtnDisabled?'enabled':'disabled']" @click="send">发送</view>
          </view>
        </view>
      </view>
    </uni-forms>
  </view>
</template>

<script setup>
import {computed, reactive} from "vue";

/**
 * 表单
 * @type {UnwrapNestedRefs<{value: string}>}
 */
const baseFormData = reactive({
  value:'',
  checkBox:[0],
  range:[{value:0,text:'游客'}]
})
const computedBtnDisabled = computed(()=>{
  return baseFormData.value
})

/**
 * 表单发送
 */
const send =() =>{
  if(!!baseFormData.value){
    // todo 登录权限
    /* if(store.token){

     }else{
       uni.navigateTo({
         "url":"/uni_modules/uni-id-pages/pages/login/login-withpwd"
       })
     }*/
  }
}

</script>

<style scoped lang="scss">
.say{
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  border-radius: 15rpx;
  padding: 40rpx;
  .title{
    margin-bottom: 20rpx;
  }
  .balabalaInput{
    ::v-deep .is-focused{
      border:1px solid #dcdfe6 !important;
    }
    .input-controller{
      margin-top: 30rpx;
      display: flex;
      justify-content: space-between;
      .input-controller-content{
        display: flex;
        .input-controller-item{
          position: relative;
          margin-right: 20rpx;
          display: flex;
          align-items: center;
          cursor: pointer;
          .iconfont{
            padding: 10rpx;
          }
          &:hover{
            color: #e8bebe;
            .iconfont{
              padding: 10rpx;
              border-radius: 50%;
              background: rgba(232, 190, 190, 0.25);
            }
          }
          .emoji{
            position: absolute;
            top: 60rpx;
          }
        }
      }
      .input-controller-button{
        .btn{
          background: #e8bebe;
          color: #ffffff;
          text-shadow: 0 0 15rpx rgba(148, 142, 142, 0.2);
          padding:15rpx  40rpx;
          border-radius: 30rpx;
        }
        .disabled{
          background: rgba(232, 190, 190, 0.6);
        }
        .enabled{
          background: #e8bebe;
          cursor: pointer;
          &:hover{
            background: #e8a4a4
          }
        }
      }
    }
  }
}
</style>