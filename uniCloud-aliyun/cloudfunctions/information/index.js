'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { id } = event
	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	//返回数据给客户端
	//todo 暂时获取自己id
	return await db.collection('user-info').doc(id).get()
};
