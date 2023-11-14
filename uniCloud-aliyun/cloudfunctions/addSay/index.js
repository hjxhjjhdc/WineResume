'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	//say
	const {imageList,ip,value} =event.data
	//tourist
	const {imageUrl,touristIp,name,uuid}= event.touristData
	const formData = {
		headSculpture:'',
		userName:'',
		createTime:Date.now(),
		ip,
		content:value,
		imageList,
		touristData:{
			imageUrl,
			name,
			touristIp,
			uuid
		}
	}
	const db = uniCloud.database();
//返回数据给客户端
	return await db.collection('user-message').add(formData)
};
