<template>
<view class="externalBox">
  <say @send="getContentList"/>
  <view class="balabala" v-for="item in contentList">
    <image class="head-sculpture" :src="item.touristData.imageUrl" mode="aspectFill" />
    <view>
      <view class="header">
        <view>
          <h2>{{ item.touristData.name }}</h2>
          <view class="time">
            <uni-dateformat :title="new Date(item.createTime).toLocaleString()" :date="item.createTime" :threshold="[[60000, 3600000]]"></uni-dateformat>
            <view style="margin-left: 30rpx">来自：{{item.ip.country=='中国'?'':item.ip.country}}{{item.ip.prov}}</view>
          </view>
        </view>
      </view>
      <view class="content">
        <view v-if="item.content" >
          <render :item=item></render>
        </view>
        <view style="display: flex" v-if="item.imageList">
          <htz-image-upload
              :max="9"
              :chooseNum="9"
              :add="false"
              :disabled="true"
              :dataType="1"
              :remove="false"
              v-model="item.imageList"
          >
          </htz-image-upload>
<!--          <view v-for="file in item.imageList">
            <view class="content-image">
&lt;!&ndash;              <image :src="file.url" v-if="file.fileType==='image'" style="width: 100%;height: 100%" mode="aspectFill"></image>&ndash;&gt;
              <htz-image-upload
                  :max="9"
                  :chooseNum="9"
                  :add="false"
                  :disabled="true"
                  :dataType="1"
                  :modelValue="[file.url]"
              >
              </htz-image-upload>
            </view>
          </view>-->
        </view>
      </view>
      <view class="handle">
        <view class="handleBtn">
          <view class="iconfont icon-dianzan-" title="点赞" @click="handleBtn('like')"></view>
        </view>
        <view class="handleBtn">
          <view class="iconfont icon-pinglun" title="评论" @click="handleBtn('comment')"></view>
        </view>
        <view class="handleBtn">
          <view
              v-if="touristStore.touristInfo?touristStore.touristInfo.uuid ===item.touristData.uuid:false"
              class="iconfont icon-shanchu"
              title="删除"
              @click="handleBtn('remove')"
          >
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="loading" v-show="loadingFlag">
    <loading></loading>
  </view>
</view>
</template>

<script setup>
import {onLoad,onReachBottom} from '@dcloudio/uni-app'
import {computed, onMounted, provide, reactive, ref, h} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import say from './components/say.vue'
import {emojiDictionary} from './components/emoji'
import huangLian from '@/static/emoji/huanglian.vue'
import loading from "@/uni_modules/Sansnn-uQRCode/components/w-loading/loading13";
import {useTouristInfo} from "@/store/useTouristInfo";

const store = useGetUserInfo()

const contentList = reactive([])

const render = (props) =>{
  let reg = /\[(.+?)\]/g
  return h(
      'div',
      {},
        [
          props.item.content.split(reg).map(item=>{
            if(emojiDictionary.includes(`[${item}]`)){
              return  h(huangLian,{
                modelValue:item
              })
            }else{
              return item
            }
          }),
        ]
      )
}

const loadingFlag =ref(true)
const getContentList = (type) =>{
  loadingFlag.value=true
  if(type!=='next'){
    contentList.length=0
  }
  uniCloud.callFunction({
    name:'getSayList',
    data:{
      skip:contentList.length
    }
  }).then(({result})=>{
      contentList.push(...result.data)
    loadingFlag.value =false
  })
}

const handleBtn =(type='')=>{
  const typeDict ={
    'comment':()=>{},
    'like':()=>{},
    'remove':()=>{
      uni.showModal({
        title: '提示',
        content: '是否确认删除？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }
  }
  typeDict[type]()
}

const touristStore = useTouristInfo()


onLoad(({name})=>{
  uni.setNavigationBarTitle({
    title: name
  })
})
onMounted(()=>{
  getContentList()
})

onReachBottom(()=>{
  getContentList('next')
})
</script>

<style scoped lang="scss">
.externalBox {
  position: relative;
  padding-bottom: 50rpx;
  .loading{
    height: 20rpx;
    padding: 20rpx;
    display: flex;
    justify-content: center;
  }
  .balabala{
    margin-top: 40rpx;
    padding: 50rpx;
    border-radius: 10rpx;
    box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
    display: flex;

    .head-sculpture{
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 40rpx;
    }
    .header{
      display: flex;
      .time{
        color: rgba(51, 51, 51, 0.5);
        display: flex;
      }
    }
    .content{
      margin-top: 50rpx;
      .content-image{
        width: 200rpx;
        height: 200rpx;
        margin-top: 20rpx;
      }
    }
    .handle{
      margin-top: 40rpx;
      display: flex;
      text-align: right;
      .handleBtn{
        margin-right: 25rpx;
        cursor: pointer;
        font-size: 30rpx;
        .iconfont{
          &:hover{
            scale: 1.2;
            color: #e8bebe;
          }
        }
      }
    }
  }
}
</style>