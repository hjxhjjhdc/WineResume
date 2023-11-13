'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {imageList,ip,value} =event.data
	const formData = {
		headSculpture:'',
		userName:'',
		createTime:Date.now(),
		ip,
		content:value,
		imageList
	}
	const db = uniCloud.database();
//返回数据给客户端
	return await db.collection('user-message').add(formData)
};
