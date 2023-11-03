import {onMounted, ref} from "vue";

export const useGetUserInfo = () => {
    /**
     * 获取userInfo
     * @type {Ref<UnwrapRef<{}>>}
     */
    const contentObj = ref({})
    const getUserInfo = () => {
        uniCloud.callFunction({
            name: 'information',
        }).then(({result}) => {
            contentObj.value = result.data[0]
        }).catch((err) => {
            console.error(err)
        })
    }
    onMounted(()=>{
        getUserInfo()
    })
    return {
        contentObj
    };
};

