import { defineStore } from 'pinia'

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
               const {result} = await uniCloud.callFunction({
                   name: 'information',
               })
               this.userInfo = result.data[0]
           }
           catch (err){
               console.log(err)
           }

        }
    }

})