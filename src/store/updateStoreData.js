import { defineStore } from 'pinia'

export const updateStoreData = defineStore('updateStoreData', {
    state: () => {
        return {
            lastDate:'',
            update:true
        }
    },
    getters:{

    },
    actions:{
         async getDate(){
             try {
                 if(!this.lastDate || Date.now()-this.lastDate>200000){
                     this.update = true
                     const {result} = await uniCloud.callFunction({
                         name: 'nowDate',
                     })
                     this.lastDate =  result
                 }else{
                     this.update = false
                 }
             }
             catch (err){
                 console.log(err)
             }

        }
    }

})