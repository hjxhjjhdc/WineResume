// todo 节流 （暂）
import { toRaw } from 'vue'

// 来个持久化存储的函数
const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
// 来个取的函数
const getStorage = (key) => {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
: {}
}

const __piniaKey__ = 'piniaKey'

const piniaToLocalStoragePlugin = (options) => {
    const { key, needKeepIds = [] } = options
    //使用函数柯里化
    return (context) => {

        const { store } = context
        if (needKeepIds.length === 0) {
            //没有指定存全部
            // 有个监听是$subscribe  1. 先监听是否改变了store的内容 改变了就存
            store.$subscribe(() => {
                console.log(' change' )
                //无论哪个 state  所有的改变都走这个函数  所以我们可以在这里搞一些动作
                setStorage(`${key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
            })
        } else {
            //有指定要存哪些
            //使用短路运算
            needKeepIds.includes(store.$id) &&
            store.$subscribe(() => {
                setStorage(`${key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
            })
        }

        //2. 获取本地存储的localStorage 有就放在页面上
        const data = getStorage(`${key ?? __piniaKey__}-${store.$id}`)
        // console.log('data', data) //取到data了 怎么送给store呢
        return {
            ...data,
        }
    }
}

export default piniaToLocalStoragePlugin