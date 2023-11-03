import {onMounted, reactive} from 'vue'

export const useMenu =(skeleton)=>{
    /**
     * menu
     */
    const menu = reactive([])
    /**
     * 获取menu
     */
    const getMenuList = () => {
        uniCloud.callFunction({
            name: 'menu',
        }).then(({result}) => {
            menu.length = 0
            menu.push(...result.data)
            menu[0].active = true
            skeleton.loading = false
        }).catch((err) => {
            console.log(err)
        })
    }
    /**
     * 执行一次
     */
    getMenuList()
    return {
        menu
    }
}