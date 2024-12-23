/**
 * Author: MeowRain
 * Date: 2024/12/23
 * Description: 图片上传和文件上传接口
 *
 */
import { baseResponse, useAxios } from '.';

export interface IUploadImageResponse {
	url: string;
}
export interface IUploadFileResponse {
	url: string;
}
/**
 * uploadImageApi(File,string) 上传图片
 * @param image - File类型，图片文件
 * @param string - string 类型，imageType 图片类型
 * @returns Promise<baseResponse<IUploadImageResponse>>
 */
export function uploadImageApi(image: File, imageType: string): Promise<baseResponse<IUploadImageResponse>> {
	// 向服务器发送post请求，发送form-data
	// 内容分别为image-> 图片二进制文件
	// imageType-> 图片类型
	const data = new FormData();
	data.append('image', image);
	data.append('imageType', imageType);

	return useAxios.post('/api/file/image', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}
/**
 * uploadFileApi(File[]) 上传文件
 * @param files
 * @returns Promise<baseResponse<IUploadFileResponse>>
 */
export function uploadFileApi(files: File[]): Promise<baseResponse<IUploadFileResponse>> {
	const data: FormData = new FormData();
	files.forEach((file, index) => {
		data.append(`files[${index}]`, file);
	});

	return useAxios.post('/api/file/file', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}
