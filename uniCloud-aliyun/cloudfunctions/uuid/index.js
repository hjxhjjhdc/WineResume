'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	/**
	 * uuid
	 * @returns {string}
	 */
	function generateUUID() {
		let d = new Date().getTime();
/*		if (window.performance && typeof window.performance.now === 'function') {
			d += performance.now();
		}*/
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}

	//返回数据给客户端
	return generateUUID()
};
