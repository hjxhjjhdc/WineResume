import { defineStore } from 'pinia'

export const useIp = defineStore('useIp',{
    state: () => {
        return {
            ip: {},
        }
    },
    getters:{
    },
    actions:{
        setIp(){
            uni.request({
                url:'https://qifu-api.baidubce.com/ip/local/geo/v1/district?',
                success:({data})=>{
                    this.ip = data
                }
            })
        }
    }
})