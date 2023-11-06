<template>
  <view class="menu">
    <view
        v-for="item in store.menu"
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
const store = useMenu()
/**
 * 单击menu
 * @param itemMenu
 */
const handleActive =(itemMenu) =>{
  if(itemMenu.active){
    return
  }
  console.log(itemMenu)
  for (const item of menu) {
    item.active = false
  }
  itemMenu.active = true
  uni.reLaunch({
    url:`${itemMenu.url}?name=${itemMenu.name}`
  })
}
onMounted(()=>{
  store.getMenuList()
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
    box-shadow: 3rpx 3rpx 15rpx rgba(136, 136, 136, 0.5);
  }
}
</style>