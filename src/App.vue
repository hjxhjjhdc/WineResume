<template>
  <uni-popup>
    <loading13 v-if="loading"></loading13>
  </uni-popup>
</template>
<script>
import {updateStoreData} from '@/store/updateStoreData'
import {useGetUserInfo} from '@/store/useGetUserInfo'
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
import {useIp} from "@/store/useIp";
import {useUUID} from "@/store/useUUID";
import loading13 from "@/uni_modules/Sansnn-uQRCode/components/w-loading/loading13";
export default {
  data(){
    return{
      loading:true
    }
  },
  components: {loading13},
  onLoad:()=>{
    this.loading=false
  },
  onLaunch:async  function () {
    console.log('App Launch')
    await uniIdPageInit()
    await useIp().setIp()
    await useUUID().setUUID()
  },
  onShow: function () {
    console.log('App Show')
    updateStoreData().getDate()
    useGetUserInfo().getBomInfo()
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "static/font/font.css";
@import "static/font/iconfont.css";

body {
  font-family: "阿里妈妈刀隶体 Regular", sans-serif;
}
uni-top-window + uni-content{
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
}
uni-left-window{
  overflow:visible;
  margin-right: 10rpx;
}
.uni-top-window{
  position: relative;
}
.uni-top-window--placeholder{
  height: 50rpx !important;
}
page {
  //background:#e6e6e6;
}
</style>
