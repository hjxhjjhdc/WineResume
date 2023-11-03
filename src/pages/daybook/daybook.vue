<template>

</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {onMounted, provide, ref} from "vue";
import {useGetUserInfo} from "@/store/useGetUserInfo";

onLoad(({name})=>{
  uni.setNavigationBarTitle({
    title: name
  })
})

const store = useGetUserInfo()


</script>

<style scoped>

</style>