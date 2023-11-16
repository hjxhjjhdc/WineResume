<template>
<view class="externalBox">
  <say @send="getContentList"/>
  <view class="balabala" v-for="item in contentList">
    <image class="head-sculpture" :src="item.touristData.imageUrl" mode="aspectFill" />
    <view style="width: 100%">
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
          <text>{{item.like||0}}</text>
          <view
              :class="[
                  item.likeUser?item.likeUser.indexOf(uuidStore.uuid)===-1?'':'active':'',
                  'iconfont',
                  'icon-dianzan-'
                  ]"
              title="点赞"
              @click="handleBtn(item,'like')"
          >
          </view>
        </view>
        <view class="handleBtn">
          <text>{{item.comment||0}}</text>
          <view
              class="iconfont icon-pinglun"
              title="评论"
              @click="handleBtn(item,'comment')"
          >
          </view>
        </view>
        <view class="handleBtn">
          <view
              v-if="touristStore.touristInfo?touristStore.touristInfo.uuid ===item.touristData.uuid:false"
              class="iconfont icon-shanchu"
              title="删除"
              @click="handleBtn(item,'remove')"
          >
          </view>
        </view>
      </view>
      <view class="comment">
        <view>
          <uni-easyinput
              type="textarea"
              autoHeight
              :trim="true"
              :maxlength="-1"
              v-model="value"
              placeholder="阿巴阿巴阿巴······"
          >
          </uni-easyinput>
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
import {useUUID} from "@/store/useUUID";

const store = useGetUserInfo()
const uuidStore = useUUID()

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

const handleBtn =(item,type='')=>{
  const typeDict ={
    'comment':()=>{},
    'like':()=>{
      let flag = 'remove'
      if(!item.like){
        item.likeUser = []
        item.like = 0
      }
        if(item.likeUser.indexOf(uuidStore.uuid)===-1){
          flag='add'
          item.likeUser.push(uuidStore.uuid)
          item.like +=1
        }else{
          item.likeUser = item.likeUser.filter((item)=>{
            return item!==uuidStore.uuid
          })
          item.like -=1
        }
      uniCloud.callFunction({
        name:'addLike',
        data:{
          id:item._id,
          uuid:uuidStore.uuid,
          type:flag
        }
      }).then(res=>{
      })
    },
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
        display: flex;
        align-items: center;
        .iconfont{
          &:hover{
            scale: 1.2;
            color: #e8bebe;
          }
        }
        .active{
          scale: 1.2;
          color: #e8bebe;
        }
      }
    }
    .comment{
      width: 100%;
      margin-top: 30rpx;
      ::v-deep .is-focused{
        border:1px solid #dcdfe6 !important;
      }
    }
  }
}
</style>