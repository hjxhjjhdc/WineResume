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
  <!--                  <view @click="inputButton('closeEmoji')">x</view>-->
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
            <view :class="['btn', computedBtnDisabled?'enabled':'disabled']" @click="openPopup('popup')">发送</view>
          </view>
        </view>
      </view>
    </uni-forms>
<!--    发送时弹窗-->
    <uni-popup ref="popup" :mask-click="false">
        <uni-forms ref="popupForm" :modelValue="popupFormData">
          <view class="popup-box">
            <view class="content-headSculpture">
              <view class="headSculpture" title="选择头像" @click="replaceHead('replace')">
                <image :src="popupFormData.imageUrl" style="width: 100%;height: 100%" mode="aspectFill"></image>
<!--                <view>Tip:</view>-->
              </view>
              <view  class="headSculptureList">
                <view v-for="item in headImageList" class="headSculptureListItem" @click="replaceHead(item)">
                  <image :src="item" style="width: 100%;height: 100%" mode="aspectFill"></image>
                </view>
              </view>
            </view>
            <view class="content-name">
              <view class="label">昵称：</view>
              <uni-easyinput
                  type="text"
                  :trim="true"
                  :maxlength="10"
                  :clearable="false"
                  v-model="popupFormData.name"
                  placeholder="阿巴阿巴阿巴······"
              >
              </uni-easyinput>
            </view>
            <view class="foot-btn">
              <view class="btn-item" @click="handlePopup('send')">确定</view>
              <view class="btn-item" @click="handlePopup('close')">关闭</view>
            </view>
          </view>
        </uni-forms>
    </uni-popup>
  </view>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import huangLian  from '@/static/emoji/huanglian.vue'
import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
import  emojiModel from './emoji'
import {useTouristInfo} from "@/store/useTouristInfo";
import {useIp} from "@/store/useIp";
import {generateUUID} from "@/util/util";

const emit = defineEmits(['send'])
/**
 * popup
 */
const touristStore =useTouristInfo()
const popup =ref()
const openPopup =(type='popup') =>{
  const dict ={
    'popup':()=>{
      if(touristStore.touristInfo){
        console.log('存在')
        send()
      }else{
        popupFormData.uuid= generateUUID()
        popup.value.open('center')
      }
    },
  }
  dict[type]()
}
const popupForm = ref()
const popupFormData =reactive({
  imageUrl:'/static/headSculpture/1.png',
  ...touristStore.touristInfo
})
/**
 * 头像list
 */
const headImageList = reactive([
  '/static/headSculpture/1.png',
  '/static/headSculpture/2.png',
  '/static/headSculpture/3.png',
  '/static/headSculpture/4.png',
  '/static/headSculpture/5.png',
  '/static/headSculpture/6.png',
  '/static/headSculpture/7.png',
  '/static/headSculpture/8.png',
  '/static/headSculpture/9.png',
  '/static/headSculpture/10.png',
])
const replaceHead = (item) =>{
  console.log(item)
  if(item==='replace'){
   // todo 选择本地文件
   /* uni.chooseImage({
      success:(res)=>{
        console.log(res)
        popupFormData.imageUrl = res.tempFilePaths[0]
      }
    })*/
  }else{
   popupFormData.imageUrl = item
  }
}
const handlePopup =(type)=>{
  const dict ={
    'send':()=>{
      if(popupFormData.name){
        console.log('存在')
        handlePopup('close')
        send()
      }else{
        console.log('不存在')
        uni.showToast({
          title:'请填写昵称~',
          icon:"none"
        })
      }
    },
    'close':()=>{
      popup.value.close()
    }
  }
  dict[type]()
}
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
        filePath:item.url,
        cloudPath: item.cloudPath,
        fileType: item.fileType
      }).then(res=>{
        console.log(res)
        baseFormData.imageList.push({
          fileType: item.fileType,
          url:res.fileID
        })
        resolve(res)
      }).catch(rej=>{
        reject(rej)
      })
    }
  })
}
const ipStore = useIp()

const send = async () =>{
  uni.showLoading({
    mask:true
  })
  if(!!baseFormData.value){

    try {
      if(imageList.length>0){
        await uploadFile()
      }
      baseFormData.ip = ipStore.ip.data
      popupFormData.touristIp = ipStore.ip.ip
      uniCloud.callFunction({
        name: 'addSay',
        data:{
          data:baseFormData,
          touristData:popupFormData
        }
      }).then((res)=>{
        console.log(res)
        touristStore.setTouristInfo(popupFormData)
        initFormData()
        uni.hideLoading()
        emit('send')
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
.popup-box{
  background: white;
  border-radius: 20rpx;
  width: 1500rpx;
  height: 500rpx;
  overflow: hidden;
  padding: 50rpx;
  .content-headSculpture{
    position: relative;
    display: flex;
    .headSculpture{
      cursor: pointer;
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20rpx;
    }
    .headSculptureList{
      background: white;
      border-radius: 20rpx;
      width: 90%;
      height: 100rpx;
      overflow: hidden;
      padding: 20rpx;
      box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
      display: flex;
      flex-wrap: wrap;
      .headSculptureListItem{
        margin-right: 20rpx;
        width: 105rpx;
        height: 105rpx;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .content-name{
    display: flex;
    align-items: center;
    margin-top: 50rpx;
    .label{
      width: 150rpx;
      text-align: right;
    }
    ::v-deep .is-focused{
      border:1px solid #dcdfe6 !important;
    }
  }
  .foot-btn{
    position: absolute;
    display: flex;
    bottom: 50rpx;
    right: 50rpx;
    .btn-item{
      margin-right: 20rpx;
      padding: 10rpx 20rpx;
      cursor: pointer;
      &:hover{
        background: #e8a4a4;
        border-radius: 20rpx;
        color: white;
      }
    }
  }
}
</style>