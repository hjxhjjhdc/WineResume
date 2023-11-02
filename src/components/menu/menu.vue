<template>
  <view class="menu" v-if="!skeleton.loading">
    <view v-for="item in menu" class="menu-item">
      {{ item.name }}
    </view>
  </view>
</template>

<script setup>
import {onMounted, reactive} from 'vue'

/**
 * menu
 * @type {UnwrapNestedRefs<[{menuTag: string},{menuTag: string},{menuTag: string}]>}
 */
const menu = reactive([])
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
 * 获取menu
 */
const getMenuList = () => {
  uniCloud.callFunction({
    name: 'menu',
  }).then(({result}) => {
    menu.length = 0
    menu.push(...result.data)
    skeleton.loading = false
  }).catch((err) => {
    console.log(err)
  })
}
onMounted(() => {
  getMenuList()
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
}
</style>