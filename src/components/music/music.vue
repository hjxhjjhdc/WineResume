<template>
  <view class="box">
    <view class="wine-music-title">
      <image src="/static/icon/headerico.png" class="logo" mode="aspectFill"></image>
      <view class="theme">
        <view class="title" :title="musicData.album_description">{{ musicData.album_description }}</view>
        <view class="author" >{{musicData.album_name}}</view>
      </view>
    </view>
    <view class="wine-music-progress"
          @mousedown="musicMouseDown"
          @mousemove="musicMouseMove"
          @mouseup="musicMouseUp"
    >
      <view ref="line" class="wine-music-line" :style="`width: ${pos.x}px;`">
        <view ref="button" class="wine-music-progress-btn" ></view>
      </view>
      <view class="wine-music-time">
        <view class="wine-music-start">{{ musicData.startTime }}</view>
        <view class="wine-music-end">{{ musicData.endTime }}</view>
      </view>
    </view>
    <view class="wine-music-controller">
      <view class="iconfont icon-bofang" title="播放" @click="audioController('play')"></view>
      <view class="iconfont icon-zanting" title="暂停" @click="audioController('pause')"></view>
      <view class="iconfont icon-shangyishou" title="上一首"></view>
      <view class="iconfont icon-tingzhi" title="停止" @click="audioController('stop')"></view>
      <view class="iconfont icon-xiayishou" title="下一首"></view>
      <view class="iconfont icon-dakai" title="打开列表"></view>
    </view>

  </view>
</template>

<script setup>
import {onMounted, reactive, ref,nextTick} from "vue";
import {onLaunch} from '@dcloudio/uni-app'
import {secondToMinuteTime} from "@/util/util";

/**
 * music控制器
 */
const button = ref(null)
const line = ref(null)
const pos = reactive({x:0})
const musicMouseDown = (e)=>{
  e.preventDefault()
  pos.active = true
  pos.x = e.pageX - line.value.$el.getBoundingClientRect().left;
}
const musicMouseMove =(e)=>{
  if(pos.active){
    pos.x = e.pageX - line.value.$el.getBoundingClientRect().left<0?0:e.pageX - line.value.$el.getBoundingClientRect().left;
  }
}
const musicMouseUp =(e)=>{
  pos.active = false
}
/**
 * 获取音频url
 */
const musicData = ref({
  album_description:'暂无数据',
  album_name:'',
  startTime:'0:00',
  endTime:'0:00'
})
const getMusicUrl = () =>{
  uni.request({
    url:'https://dataiqs.com/api/netease/music/?type=random',
    success:({data})=>{
      if(data['data'].song_url.indexOf('/404')==-1){
        console.log(data['data'])
        audio.src=data['data'].song_url
        musicData.value = {...musicData.value,...data['data']}
      }else{
        getMusicUrl()
      }
    }
  })
}
/**
 *  音频初始化
 * @type {UniNamespace.InnerAudioContext}
 */
const audio = uni.createInnerAudioContext()
/**
 * 音频时间
 */
const Timer = ref(null)
const startTimerOrder = ref(0)
const endTimerOrder = ref(0)
/**
 * 控制Audio
 */
const audioController =(type='')=>{
  const typeStrategy = {
    'play':()=> {
      audio.play()
      console.log(audio.duration)
      endTimerOrder.value = parseInt(audio.duration)
      Timer.value = setInterval(()=>{
        startTimerOrder.value = startTimerOrder.value+1
        endTimerOrder.value = endTimerOrder.value-1
        musicData.value.startTime = secondToMinuteTime(startTimerOrder.value)
        musicData.value.endTime = secondToMinuteTime(endTimerOrder.value)
      },1000)
    },
    'pause':()=>{
      audio.pause()
      Timer.value=null
    },
    'stop':()=>audio.stop(),
  }
  typeStrategy[type]()
}

onMounted(()=>{
  getMusicUrl()
  window.addEventListener('onmouseup',musicMouseUp)
})
</script>

<style scoped lang="scss">
.box {
  padding: 50rpx;
  margin-bottom: 50rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);

  .wine-music-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
    }
    .theme{
      width: 70%;
      .title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .author {
        color: #a6a6a6;
      }
    }
  }

  .wine-music-progress {
    background: #bfbfc4;
    width: 100%;
    height: 7rpx;
    margin-top: 40rpx;
    border-radius: 3rpx;
    position: relative;
    cursor: pointer;

    .wine-music-line {
      background: #333333;
      height: 7rpx;
      border-radius: 3rpx;
      position: relative;
      max-width: 100%;
      .wine-music-progress-btn{
        position: absolute;
        right: -10rpx;
        top: 50%;
        transform: translate(0,-50%);
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
        background: #3f536e;
        &:hover{
          transition: .2s;
          scale: 1.1;
        }
      }
    }
    .wine-music-time{
      display: flex;
      justify-content: space-between;
      color: #bfbfc4;
      font-size: 25rpx;
      padding-top: 15rpx;
    }
  }
  .wine-music-controller{
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;
    .iconfont{
      cursor: pointer;
      &:hover{
        transition: .2s;
        scale: 1.3;
      }
    }
  }
}

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
</style>
