<template>
<view class="externalBox">
  <say />
  <view class="balabala" v-for="item in contentList">
    <image class="head-sculpture" src="/static/icon/headerico.png" mode="aspectFill" />
    <view>
      <view class="header">
        <view>
          <h2>Wine</h2>
          <view class="time">
            <uni-dateformat :title="'2020/10/20 20:20:20'" :date="'2020/10/20 20:20:20'" :threshold="[[60000, 3600000]]"></uni-dateformat>
            <view style="margin-left: 30rpx">来自：{{item.ip.country=='中国'?'':item.ip.country}}{{item.ip.prov}}</view>
          </view>
        </view>
      </view>
      <view class="content">
        <view v-if="item" >
          <render :item=item></render>
        </view>
        <view></view>
      </view>
    </view>
  </view>
</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {computed, onMounted, provide, reactive, ref, h} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";
import say from './components/say.vue'
import {emojiDictionary} from './components/emoji'
import huangLian from '@/static/emoji/huanglian.vue'

const store = useGetUserInfo()

const contentList = reactive([])

const render = (props) =>{
  let reg = /\[(.+?)\]/g
  return h(
      'div',
      {},
        [
          props.item.value.split(reg).map(item=>{
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

const getContentList = () =>{
  uniCloud.callFunction({
    name:'getSayList'
  }).then(({result})=>{
    contentList.length = 0
    contentList.push(...result.data)
  })
}
onLoad(({name})=>{
  uni.setNavigationBarTitle({
    title: name
  })
})
onMounted(()=>{
  getContentList()
})


</script>

<style scoped lang="scss">
.externalBox {
  position: relative;
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
    }
  }
}
</style>