import { defineStore } from 'pinia'

export const updateStoreData = defineStore('updateStoreData', {
    state: () => {
        return {
            lastDate:'',
            update:false
        }
    },
    getters:{

    },
    actions:{
         async getDate(){
             try {
                 console.log(Date.now()-this.lastDate)
                 console.log(Date.now()-this.lastDate>200000)
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