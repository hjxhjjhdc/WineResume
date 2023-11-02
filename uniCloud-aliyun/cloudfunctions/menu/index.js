'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	const res = await db.collection('opendb-admin-menus').where(
		{
			permission:'tourist',
			enable:true
		}
	).get()
	//返回数据给客户端
	return res
};
