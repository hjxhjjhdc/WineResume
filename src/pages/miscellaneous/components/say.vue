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
        <htz-image-upload
            :max="9"
            :chooseNum="9"
            :add="false"
            :disabled="true"
            :dataType="1"
            v-model="imageList"
            :uploadSuccess="imageSuccess">
        </htz-image-upload>
        <view class="input-controller">
          <view class="input-controller-content">
            <view :class="['input-controller-item']" @click="inputButton('emoji')">
              <view class="iconfont icon-biaoqing"></view>
              <view>表情</view>
              <div class="emoji" v-show="emojiShow" @blur="inputButton('closeEmoji')">
                <scroll-view
                    style="height: 100%;"
                    :scroll-y="true"
                    :show-scrollbar="false"
                >
                  <view v-for="item in emojiList" :title="item.name" class="emoji-item" @click.stop="emojiSelected(item.name)">
                    <huangLian v-model="item.name"></huangLian>
                  </view>
                </scroll-view>
              </div>
            </view>
            <view :class="['input-controller-item']" @click="inputButton('image')">
              <view class="iconfont icon-icon"></view>
              <view>图片</view>
            </view>
            <view :class="['input-controller-item']"  @click="inputButton('video')">
              <view class="iconfont icon-shipin"></view>
              <view>视频</view>
            </view>
            <view :class="['input-controller-item']">
              <view class="iconfont icon-huati"></view>
              <view>话题</view>
            </view>
            <view :class="['input-controller-item']">
              <view class="iconfont icon-didian_xianxing"></view>
              <view>地点</view>
            </view>
            <view :class="['input-controller-item']" title="暂未开放登录权限~~敬请期待">
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
import {computed, onMounted, reactive, ref} from "vue";
import huangLian  from '@/static/emoji/huanglian.vue'
import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'

import  emojiModel from './emoji'
/**
 * 表单
 * @type {UnwrapNestedRefs<{value: string}>}
 */
const baseFormData = reactive({
  value:'',
  checkBox:[0],
  range:[{value:0,text:'游客'}],
  ip:{},
  imageList:[]
})
const computedBtnDisabled = computed(()=>{
  return baseFormData.value || imageList.length>0
})
/**
 * 表单发送
 */
const uploadFile = () =>{
  return new Promise((resolve, reject) => {
    for (const item of imageList) {
      uniCloud.uploadFile({
        filePath:item.filePath,
        cloudPath: item.cloudPath,
        fileType: item.fileType
      }).then(res=>{
        console.log(res)
        baseFormData.imageList.push(res.fileID)
        resolve(res)
      }).catch(rej=>{
        reject(rej)
      })
    }
  })
}
const getIp = () =>{
  return new Promise((resolve, reject) => {
    uni.request({
      url:'https://qifu-api.baidubce.com/ip/local/geo/v1/district?',
      success:({data})=>{
        baseFormData.ip = data.data
        console.log(baseFormData)
        resolve()
      },
      fail:(rej)=>{
        reject(rej)
      }
    })
  })
}
const send = async () =>{
  if(!!baseFormData.value){

    try {
      await uploadFile()
      await getIp()
      console.log(baseFormData)
      uniCloud.callFunction({
        name: 'addSay',
        data:{
          data:baseFormData
        }
      }).then((res)=>{
        console.log(res)
        initFormData()
      })
    }catch (e) {
      console.log(e)
    }
    // todo 登录权限
    /* if(store.token){

     }else{
       uni.navigateTo({
         "url":"/uni_modules/uni-id-pages/pages/login/login-withpwd"
       })
     }*/
  }else{
    uni.showToast({
      title:'你得说点啥吧.....',
      icon:"none",
      duration:1000
    })
  }
}
/**
 * emoji list
 */
const emojiList = reactive([
 ...emojiModel
])
const emojiShow=ref(false)
const emojiRef =ref()
const emojiSelected =(name)=>{
  emojiShow.value = false
  baseFormData.value += `[${name}] `
}
/**
 * input button
 * @param type
 */
const inputButton =(type='') =>{
  const  typeStrategy = {
    'emoji':()=>{
      emojiShow.value = true
    },
    'cloneEmoji':()=>{
      emojiShow.value = false
    },
    'image':()=>{
      uni.chooseImage({
        success:(res)=>{
          console.log(res)
          for (const re of res.tempFiles) {
            imageList.push({
              type:0,
              url:re.path,
              file:re,
              cloudPath:re.name,
              fileType:'image'
            })
          }
        }
      })
    },
    'video':()=>{
      uni.chooseVideo({
        success:(res)=>{
          // console.log(res)
          imageList.push({
            type:1,
            url:res.tempFilePath,
            file:res.tempFile,
            cloudPath:res.tempFile.name,
            fileType:'video'
          })
        }
      })
    }
  }
  typeStrategy[type]()
}

const imageList =reactive([])

/**
 *
 */
const initFormData =()=>{
  imageList.length = 0
  baseFormData.value = ''
  baseFormData.checkBox = [0]
  baseFormData.range = [{value:0,text:'游客'}]
  baseFormData.ip = {}
  baseFormData.imageList = []
}
onMounted(()=>{
})
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
            cursor: default;
            position: absolute;
            top: 60rpx;
            width: 1000rpx;
            height: 500rpx;
            background: #fff;
            border-radius: 20rpx;
            padding: 30rpx;
            overflow: hidden;
            box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
            z-index: 10;
            .emoji-item{
              margin: 5rpx;
              padding: 10rpx;
              border-radius: 15rpx;
              &:hover{
                background: #e8a4a4;
                cursor: pointer;
              }
            }
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
::v-deep .uni-scroll-view-content{
  display: flex;
  flex-wrap: wrap;
}
</style>