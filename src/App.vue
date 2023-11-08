<script>
import {updateStoreData} from '@/store/updateStoreData'
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    updateStoreData().getDate()
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
