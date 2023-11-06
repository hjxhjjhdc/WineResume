import { defineStore } from 'pinia'
import {updateStoreData} from './updateStoreData'
export const useGetUserInfo = defineStore('useGetUserInfo', {
    state: () => {
        return {
            userInfo:{}
        }
    },
    getters:{

    },
    actions:{
       async getUserInfo(){
           try {
               // todo 节流 （暂）
               if(!this.userInfo || updateStoreData().update){
                   const {result} = await uniCloud.callFunction({
                       name: 'information',
                   })
                   this.userInfo = result.data[0]
               }
           }
           catch (err){
               console.log(err)
           }

        }
    }

})