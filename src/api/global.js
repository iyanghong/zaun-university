import request from '@/providers/request.js'

/**
 * 上传文件
 * @param {Object} file 文件
 * @param {Object} data 数据
 * @param {Object} uploadProgress
 */
export function uploadFile(file,data,uploadProgress) {
	if (typeof data == 'object') {
		if (!data.type) {
			data.fileRandom = true;
		}
	} else {
		data = {
			fileRandom: true
		};
	}
	let postData = new FormData();
	postData.append('file',file);
	for(let key in data){
		postData.append(key,data[key]);
	}
	return request({
		url:'image/upload',
		// url: process.env.VUE_APP_UPLOAD_API_URL,
		data : postData,
		onUploadProgress : uploadProgress,
		retry : 0,
		timeout : 0,
		notTansJsonParams:true,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

