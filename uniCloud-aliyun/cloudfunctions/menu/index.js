'use strict';
exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ', event)
    const db = uniCloud.database();
	//返回数据给客户端
    return await db.collection('opendb-admin-menus').where(
		{
			parent_id: "WineResume",
			permission: 'tourist',
			enable: true
		}
	).orderBy('sort','asc').get()
};
