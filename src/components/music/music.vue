<template>
  <view class="box" v-show="!isRetract">
    <view class="wine-music-title">
      <image :src="musicData.al.picUrl" class="logo" mode="aspectFill"></image>
      <view class="theme" v-show="!musicLoading">
        <view class="title" :title="musicData.name">{{ musicData.name }}</view>
        <view class="author">{{ musicData.al.name }}</view>
      </view>
      <view style="cursor: pointer" @click="audioController('open')">more</view>
      <view class="more" v-show="musicListShow">
        <view class="wine-music-list" >
          <view class="cloneMusicList" @click="audioController('open')">X</view>
          <scroll-view
              style="height: 100%"
              :scroll-y="true"
              :show-scrollbar="false"
          >
            <view
                v-for="item in musicLists"
                :key="item.id"
                :class="['wine-music-list-item',item.active?'wine-music-list-item-active':'']"
                @click="getDetail(item)">
              <view>
                <image :src="item.al.picUrl" class="wine-music-list-item-logo"  mode="aspectFill"></image>
              </view>
              <view>
                <view>{{item.name}}</view>
                <view>{{item.al.name}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <view class="theme" style="position: relative" v-show="musicLoading">
        <loading style="margin: 0 auto"></loading>
      </view>
    </view>
    <view class="wine-music-progress"
          @mousedown="musicMouseDown"
          @mousemove="musicMouseMove"
          @mouseup="musicMouseUp"
          ref="progress"
    >
      <view ref="line" class="wine-music-line" :style="`width:${pos.percentage}%;`">
        <view class="wine-music-progress-btn"></view>
      </view>
      <view class="wine-music-time">
        <view class="wine-music-start">{{ musicData.startTime }}</view>
        <view class="wine-music-end">{{ musicData.endTime }}</view>
      </view>
    </view>
    <view class="wine-music-controller">
      <view class="iconfont icon-shangyishou"  title="上一首" @click="audioController('prov')"></view>
      <view class="iconfont icon-bofang" v-show="!playFlag" title="播放"
            @click="audioController('play')"></view>
      <view class="iconfont icon-zanting" v-show="playFlag" title="暂停"
            @click="audioController('pause')"></view>
      <view class="iconfont icon-tingzhi" title="停止" @click="audioController('stop')"></view>
      <view class="iconfont icon-xiayishou" title="下一首" @click="audioController('next')"></view>
<!--      <view class="iconfont icon-dakai" title="打开列表" @click="audioController('open')"></view>-->
      <view class="iconfont icon-dakai" title="收起" @click="audioController('retract')"></view>
    </view>
    <view
        ref="wineMusicContainerLyric"
        class="wine-music-lyric"
        :style="musicLyric?'height: 40vh;':''"
    >
       <ul ref="wineMusicLyric" :style="[`transform:translateY(-${offSet}px)`]">
         <li
             v-for="(item,index) in musicLyricList"
             :ref="'li'+playIndex"
             :key="item"
             :class="playIndex==index?'active':''"
         >
           {{item.word}}
         </li>
       </ul>
    </view>
  </view>
  <view class="retract" v-show="isRetract" :title="'展开'" @click="audioController('expand')">
    <image class="audio"   src="/static/icon/audio1.png"></image>
  </view>
</template>

<script setup>
import {onMounted, reactive, ref, nextTick} from "vue";
import {secondToMinuteTime} from "@/util/util";
import * as _ from "lodash";
import loading from "@/uni_modules/Sansnn-uQRCode/components/w-loading/loading7";
import * as marked from "marked";
import {musicLyricFun} from "./lyric";
import {api} from "@/http/http";

/**
 *  is 收起
 */
const isRetract =ref(false)
/**
 * music控制器
 */
const line = ref(null)
const progress = ref(null)
const pos = reactive({x: 0, percentage: 0})
const musicMouseDown = (e) => {
  e.preventDefault()
  pos.active = true
  pos.x = e.pageX - line.value.$el.getBoundingClientRect().left;
  pos.percentage = (pos.x / progress.value.$el.clientWidth * 100).toFixed(2)
}
const musicMouseMove = (e) => {
  if (pos.active) {
    pos.x = e.pageX - line.value.$el.getBoundingClientRect().left < 0 ? 0 : e.pageX - line.value.$el.getBoundingClientRect().left;
    pos.percentage = (pos.x / progress.value.$el.clientWidth * 100).toFixed(2)
  }
}
const musicMouseUp = (e) => {
  pos.active = false
  audioController('seek')
}
/**
 * 控制Audio
 */
const audioController = (type = '') => {
  const typeStrategy = {
    'play': () => {
      playFlag.value = true
      audio.play()
      console.log(audio.duration)
      if (endTimerOrder.value === 0) {
        endTimerOrder.value = parseInt(audio.duration)
      }
      if (Timer.value) {
        clearInterval(Timer.value)
      }
      Timer.value = setInterval(() => {
        startTimerOrder.value = startTimerOrder.value + 1
        endTimerOrder.value = endTimerOrder.value - 1
        musicData.value.startTime = secondToMinuteTime(startTimerOrder.value)
        musicData.value.endTime = secondToMinuteTime(endTimerOrder.value)
        pos.percentage = (parseInt(audio.currentTime) / parseInt(audio.duration) * 100).toFixed(2)
        musicLyricList.push(...musicLyricFun(musicLyric.value,startTimerOrder.value))
        setOffset(musicLyricList)
      }, 1000)
      musicData.value.autoNextFlag = true
    },
    'pause': () => {
      playFlag.value = false
      audio.pause()
      clearInterval(Timer.value)
    },
    'stop': () => {
      playFlag.value = false
      audio.stop()
      clearInterval(Timer.value)
      startTimerOrder.value = 0
    },
    'seek': () => {
      audioController('pause')
      playFlag.value = true
      let s = audio.duration * pos.percentage / 100
      audio.seek(s)
      audio.play()
      if (Timer.value) {
        clearInterval(Timer.value)
      }
      startTimerOrder.value = parseInt((parseInt(audio.duration) * pos.percentage) / 100)
      endTimerOrder.value = parseInt(parseInt(audio.duration) - startTimerOrder.value)
      Timer.value = setInterval(() => {
        startTimerOrder.value = startTimerOrder.value + 1
        endTimerOrder.value = endTimerOrder.value - 1
        musicData.value.startTime = secondToMinuteTime(startTimerOrder.value)
        musicData.value.endTime = secondToMinuteTime(endTimerOrder.value)
        pos.percentage = (parseInt(audio.currentTime) / parseInt(audio.duration) * 100).toFixed(2)
        musicLyricList.push(...musicLyricFun(musicLyric.value,startTimerOrder.value))
        setOffset(musicLyricList)
      }, 1000)
    },
    'next': () => {
      audio.stop()
      playFlag.value = false
      clearInterval(Timer.value)
      musicLyricList.length=0
      nextGetMusicUrl()
    },
    'prov':()=>{
      audio.stop()
      playFlag.value = false
      clearInterval(Timer.value)
      musicLyricList.length=0
      previousGetMusicUrl()
    },
    'open':()=>{
      musicListShow.value = !musicListShow.value
    },
    'retract':()=>{
      isRetract.value = true
    },
    'expand':()=>{
      isRetract.value = false
    }
  }
  if (musicData.value['url']) {
    typeStrategy[type]()
    audio.onEnded(() => {
      if (musicData.value.autoNextFlag) {
        musicData.value.autoNextFlag = false
        clearInterval(Timer.value)
        // getMusicUrl('next')
        nextGetMusicUrl()
      }
    })
  } else {
    uni.showToast({
      title: '获取音乐中~~  请稍后重试',
      icon: "none"
    })
  }
}

/**
 * 获取音频url
 */
let musicData = ref({
  startTime: '0:00',
  endTime: '0:00',
  al:{name:'暂无数据',picUrl:'/static/icon/headerico.png'},
  autoNextFlag: true,
})
/**
 * music 列表
 */
//播放列表
const playlists = reactive([])
//歌曲列表
const musicLists = reactive([])
//显示
const musicListShow = ref(false)

const playFlag = ref(false);
const musicLoading = ref(true);
/**
 * 默认获取歌曲url
 * @param type
 */
const getMusicUrl = () => {
return new Promise(resolve => {
  musicLoading.value = true
  api({
    url:'/song/url',
    data:{id:musicLists[0].id}
  }).then(({data})=>{
    console.log(data)
    musicLoading.value = false
    musicData.value = {...musicLists[0],...data[0]}
    console.log(musicData.value)
    audio.src = data[0].url
    resolve()
  }).catch(()=>{
    musicLoading.value = false
  })
})
}
/**
 * 获取歌区列表
 */
const getMusicList = () =>{
  return new Promise(resolve => {
    api({
      url:'/top/playlist/highquality',
      data:{
        cat:'流行'
      }
    }).then(({playlists})=>{
      api({
        url:'/playlist/detail',
        data:{
          // 默认第一个歌单id
          id:playlists[0].id
        }
      }).then(({playlist})=>{
        musicLists.length=0
        musicLists.push(...playlist.tracks)
        musicLists[0].active = true
        resolve()
      })
    })
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
 * 根据音乐，获取音乐url
 * @param item
 */
const getDetail = (item)=>{
  for (const index in musicLists) {
    musicLists[index].active = false
  }
  item.active=true
  api({
    url:'/song/url',
    data:{
      id:item.id
    }
  }).then(({data})=>{
    resetLyric(data[0].id)
    musicData.value = {...item,...data[0]}
    startTimerOrder.value=0
    endTimerOrder.value=0
    audio.src = data[0].url
    setTimeout(()=>{
      audioController('play')
    },500)
  })
}
/**
 * 获取下一个music url
 */
const nextGetMusicUrl = ()=>{
  let index = 0
  for (const i in musicLists) {
    if(musicLists[i].active){
      index = parseInt(i)+1
      musicLists[i].active = false
    }
  }
  musicLists[index]['active'] = true
  api({
    url:'/song/url',
    data:{
      id:musicLists[index].id
    }
  }).then(({data})=>{
    resetLyric(data[0].id)
    musicData.value = {...musicLists[index],...data[0]}
    startTimerOrder.value=0
    endTimerOrder.value=0
    audio.src = data[0].url
    setTimeout(()=>{
      audioController('play')
    },500)
  })
}
/**
 * 获取上一个music url
 */
const previousGetMusicUrl = ()=>{
  let index = 0
  let flag = false
  for (const i in musicLists) {
    if(musicLists[i].active){
      if(parseInt(i)!==0){
        index = parseInt(i)-1
        musicLists[i].active = false
      }else{
        flag = true
      }
    }
  }
  if(flag){
    return
  }
  musicLists[index]['active'] = true
  api({
    url:'/song/url',
    data:{
      id:musicLists[index].id
    }
  }).then(({data})=>{
    resetLyric(data[0].id)
    musicData.value = {...musicLists[index],...data[0]}
    startTimerOrder.value=0
    endTimerOrder.value=0
    audio.src = data[0].url
    setTimeout(()=>{
      audioController('play')
    },500)
  })
}

/**
 * 获取歌词
 * @param id
 */
const musicLyric = ref('')
const musicLyricList = reactive([])
const getMusicLyric = (id)=>{
  api({
    url:'/lyric',
    data:{id}
  }).then(({lrc})=>{
    musicLyric.value=lrc.lyric
  })
}
/**
 * 滑动歌词
 * @param result
 */
const offSet = ref(0)
const playIndex = ref(0)
const wineMusicLyric= ref(null)
const wineMusicContainerLyric= ref(null)
const setOffset = (result) =>{
  if(wineMusicLyric.value.children.length){
    let liHeight = wineMusicLyric.value.children[0].clientHeight;
    let containerHeight = wineMusicContainerLyric.value.$el.clientHeight;
    let minOffset = 0;
    let maxOffset =  containerHeight-liHeight ;
    const getIndex = () =>{
      let Time = startTimerOrder.value;
      for (let i = 0; i < result.length; i++) {
        if (result[i].time > Time) {
          return i - 1;
        }
      }
    }
    playIndex.value =  getIndex();

    // 计算滚动距离
    offSet.value = liHeight * playIndex.value - containerHeight / 2 + liHeight / 2;
   /* if (offSet.value < minOffset) {
      offSet.valuet = minOffset;
    }
    if (offSet.value > maxOffset) {
      offSet.value = maxOffset;
    }*/
    console.log(offSet.value)
  }
}
/**
 * 重置歌词
 */
const resetLyric = (id) =>{
  offSet.value = 0
  musicLyric.value=''
  musicLyricList.length=0
  getMusicLyric(id)
}
onMounted(async () => {
  await getMusicList()
  await getMusicUrl()
  window.addEventListener('onmouseup', musicMouseUp)
})
</script>

<style scoped lang="scss">
@keyframes auto {
  0% {

  }
  100% {
    transform: rotate(360deg);
  }
}
.retract{
  position: fixed;
  top: 180rpx;
  left: 20rpx;
  //top:30vh;
  width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  padding: 10rpx;
  overflow: hidden;
  cursor: pointer;
  z-index: 9999;
  .audio{
    width: 100%;
    height: 100%;
    animation: auto 2s linear infinite;

  }
}
.box {
  padding: 50rpx;
  margin-bottom: 50rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);

  .wine-music-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .more{
      position: absolute;
      right: -59vw;
      top: -100rpx;
      width: 55vw;
      height: 70vh;
      background: #fff;
      border-radius: 10rpx;
      padding: 20rpx;
      box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
      .wine-music-list{
        padding-top: 50rpx;
        height: 97%;
        position: relative;
        .cloneMusicList{
          cursor: pointer;
          position: absolute;
          right: 20rpx;
          top: 0;
        }
        .wine-music-list-item{
          display: flex;
          padding: 10rpx;
          border-radius: 20rpx;
          cursor: pointer;
          margin: 20rpx 0;
          &:hover{
            background: rgba(53, 75, 105, 0.4);
          }
          .wine-music-list-item-logo{
            width: 100rpx;
            height: 100rpx;
            border-radius: 20rpx;
            margin-right: 50rpx;
          }
        }
        .wine-music-list-item-active{
          background: rgba(53, 75, 105, 0.4);
        }
      }
    }
    .logo {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
    }

    .theme {
      width: 60%;

      .title {
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

      .wine-music-progress-btn {
        position: absolute;
        right: -10rpx;
        top: 50%;
        transform: translate(0, -50%);
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
        background: #3f536e;

        &:hover {
          transition: .2s;
          scale: 1.1;
        }
      }
    }

    .wine-music-time {
      display: flex;
      justify-content: space-between;
      color: #bfbfc4;
      font-size: 25rpx;
      padding-top: 15rpx;
    }
  }

  .wine-music-controller {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-between;

    .iconfont {
      cursor: pointer;

      &:hover {
        position: relative;
        transition: .2s;
        scale: 1.3;
      }
    }
  }
  .wine-music-lyric{
    margin-top: 20rpx;
    overflow: hidden;
    ul{
      list-style: none;
      transition: all 0.6s;
      text-align: center;
      padding: 0;
      li {
        color: #666;
        height: 50rpx;
        line-height: 50rpx;
      }
      .active{
        transform: scale(1.5); // 歌词放大效果
        color: #e8bebe;
        //background: #e8bebe;
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
