<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
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
body{
  font-family: "阿里妈妈刀隶体 Regular", sans-serif;
}
page{
  /*background: #f2f3f5;*/
}
</style>
