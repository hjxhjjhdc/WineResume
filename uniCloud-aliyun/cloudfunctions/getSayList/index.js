'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {skip} =event
	const db = uniCloud.database();
	//返回数据给客户端
	return await db.collection('user-message').limit(5).skip(skip).orderBy('createTime','desc').get()
};
