'use strict';
exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ', event)
    const db = uniCloud.database();
    const dbCmd = db.command
    const {id, uuid, type} = event

    if (type === 'add') {
//返回数据给客户端
        return await db.collection('user-message').where({
            _id: id
        }).update({
            like: dbCmd.inc(1),
            likeUser: dbCmd.push([uuid])
        })
    } else {
        const res = await db.collection('user-message').where({
            _id: id
        }).get()
        console.log(res)
        const likeUser =res.data[0].likeUser.filter((item)=>{
            return item!==uuid
        })
       return await db.collection('user-message').where({
           _id: id
       }).update({
           likeUser,
           like:likeUser.length
       })
    }
};
