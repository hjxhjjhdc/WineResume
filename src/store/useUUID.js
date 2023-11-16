import { defineStore } from 'pinia'
export const useUUID  =  defineStore('useUUID',{
    state:()=>{
        return {
            uuid:''
        }
    },
    actions:{
        setUUID(){
            if(this.uuid){

            }else{
                uniCloud.callFunction({
                    name:'uuid'
                }).then(({result})=>{
                    console.log(result)
                    this.uuid = result
                })
            }
        }
    }
})