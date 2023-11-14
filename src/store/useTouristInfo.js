import { defineStore } from 'pinia'

export const useTouristInfo = defineStore('useTouristInfo',{
    state: () => {
        return {
            touristInfo:null,
            flag:false
        }
    },
    getters:{
        getTouristInfo(){
            return this.touristInfo
        }
    },
    actions:{
        setTouristInfo(data){
            console.log(data)
            this.touristInfo = data
            this.flag = true
        }
    }
})