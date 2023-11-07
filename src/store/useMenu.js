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
        async getMenuList(route){
            try {
                // todo 节流 （暂）
                if(!this.menu.length || updateStoreData().update){
                    const {result} = await uniCloud.callFunction({
                        name: 'menu',
                    })
                    this.menu = []
                    this.menu.push(...result.data)
                }else{
                    console.log(route)
                    if(route.length){
                        for (const item of this.menu) {
                            item.active = item.url === `/${route[0].route}`;
                        }
                    }else{
                        for (const item of this.menu) {
                            item.active = false;
                        }
                        this.menu[0].active=true
                    }
                }
            }
            catch (err){
                console.log(err)
            }

        }
    }

})