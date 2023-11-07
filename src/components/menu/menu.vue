<template>
  <view class="menu">
    <view
        v-for="item in storeMenu.menu"
        :class="['menu-item',item.active?'menu-item-active':'']"
        @click="handleActive(item)"
    >
      {{ item.name }}
    </view>
  </view>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import {useMenu} from "@/store/useMenu";
import {useGetUserInfo} from "@/store/useGetUserInfo";
/**
 * 骨架屏
 */
const skeleton = reactive({
  loading: true,
  row: 1,
  showAvatar: false,
  showTitle: false,
  titleWidth: '20%',
})
/**
 * store pinia
 */
const storeMenu = useMenu()
const storeUser = useGetUserInfo()
/**
 * 单击menu
 * @param itemMenu
 */
const handleActive =(itemMenu) =>{
  if(itemMenu.active){
    return
  }
  for (const item of storeMenu.menu) {
    item.active = false
  }
  itemMenu.active = true
  uni.reLaunch({
    url:`${itemMenu.url}?_id=${storeUser.userInfo._id}&&name=${itemMenu.name}`
  })
}
onMounted(()=>{
    setTimeout(()=>{
      storeMenu.getMenuList(getCurrentPages())
    },100)
})
</script>

<style scoped lang="scss">
.menu {
  padding-top: 50rpx;
  display: flex;

  .menu-item {
    margin-right: 20rpx;
    padding: 10rpx 20rpx;
    cursor: pointer;

    &:hover {
      border-radius: 10rpx;
      background: #e8bebe;
      color: white;
    }
  }

  .menu-item-active {
    border-radius: 10rpx;
    box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5) inset;
  }
}
</style>