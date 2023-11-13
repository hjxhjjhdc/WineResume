/**
 *
 * @param url
 * @param method
 * @param header
 * @param data
 * @returns {Promise<unknown>}
 */
export const api = ({url,method='get',header='',data=null}) => {
    let handleUrl = import.meta.env.VITE_APP_URL+url
    return new Promise((resolve, reject) => {
        uni.request({
            url:handleUrl,
            data,
            method,
            header,
            success: ({data, statusCode}) => {
                let msg = data.message||'诶呀，网络请求错误~ 请稍后重试~'
                if (statusCode == 200) {
                    resolve(data)
                }else{
                    console.log(data)
                    uni.showToast({
                        title:msg,
                        icon:'none'
                    })
                    reject({data,statusCode})
                }
            },
            fail: (rej) => {
                console.log(rej)
                uni.showToast({
                    title:'诶呀，网络请求错误~ 请稍后重试~',
                    icon:'none'
                })
                reject(rej)
            }
        })
    })
}