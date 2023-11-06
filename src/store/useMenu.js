import { defineStore } from 'pinia'
import {updateStoreData} from './updateStoreData'

export const useMenu = defineStore('useMenu', {
    state: () => {
        return {
            menu:[]
        }
    },
    getters:{

    },
    actions:{
        async getMenuList(){
            try {
                // todo 节流 （暂）
                if(!this.menu.length || updateStoreData().update){
                    const {result} = await uniCloud.callFunction({
                        name: 'menu',
                    })
                    this.menu = []
                    this.menu.push(...result.data)
                }
            }
            catch (err){
                console.log(err)
            }

        }
    }

})