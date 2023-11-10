import { defineStore } from 'pinia'
import {updateStoreData} from './updateStoreData'
import {browerType} from "@/util/util";
export const useGetUserInfo = defineStore('useGetUserInfo', {
    state: () => {
        return {
            userInfo:{},
            token:'',
            bom:''
        }
    },
    getters:{

    },
    actions:{
       async getUserInfo(id){
           try {
               // todo 节流 （暂）
               if(!this.userInfo || updateStoreData().update){
                   const {result} = await uniCloud.callFunction({
                       name: 'information',
                       data:{id}
                   })
                   this.userInfo = result.data[0]
               }
           }
           catch (err){
               console.log(err)
           }

        },
        getBomInfo(){
            this.bom = browerType()
        },
        async getToken(){
           try {
               const {result} = await uniCloud.callFunction({
                   name: 'information',
                   data:{id}
               })
           }
           catch (e) {

           }
        }
    }

})