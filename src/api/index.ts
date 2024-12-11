import axios, { AxiosInstance } from 'axios';

import { ElMessage } from 'element-plus';

export const useAxios: AxiosInstance = axios.create({
	baseURL: '',
});

export interface baseResponse<T> {
	code: number;
	data: T;
	msg: string;
}

export interface listResponse<T> {
	count: number;
	list: T[];
}

//请求拦截器
useAxios.interceptors.request.use((config) => {
	return config;
});
//响应拦截器
useAxios.interceptors.response.use(
	(response) => {
		if (response.status !== 200) {
			// 失败的
			console.log('服务失败', response.status);
			ElMessage.error(response.statusText);
			return Promise.reject(response.statusText);
		}
		return response.data;
	},
	(err) => {
		console.log('服务错误', err);
		ElMessage.error(err.message);
		return Promise.reject(err.message);
	}
);
