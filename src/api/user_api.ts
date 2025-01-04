import { type baseResponse, useAxios,type paramsType,listResponse } from '@/api/index';

/**
 * 验证问题类型接口
 * @interface IVerificationQuestionType
 * @property {string} [problem1] - 第一个验证问题
 * @property {string} [problem2] - 第二个验证问题
 * @property {string} [problem3] - 第三个验证问题
 * @property {string} [answer1] - 第一个验证问题的答案
 * @property {string} [answer2] - 第二个验证问题的答案
 * @property {string} [answer3] - 第三个验证问题的答案
 */
export type IVerificationQuestionType = {
	problem1?: string;
	problem2?: string;
	problem3?: string;
	answer1?: string;
	answer2?: string;
	answer3?: string;
};

/**
 * 用户个人资料类型接口
 * @interface IUserProfileType
 * @property {number} userID - 用户ID
 * @property {string} nickname - 用户昵称
 * @property {string} abstract - 用户简介
 * @property {string} avatar - 用户头像
 * @property {string} recallMessage - 撤回消息设置
 * @property {boolean} friendOnline - 好友在线状态
 * @property {boolean} enableSound - 启用声音设置
 * @property {boolean} secureLink - 安全链接设置
 * @property {boolean} savePwd - 保存密码设置
 * @property {number} searchUser - 搜索用户设置
 * @property {number} verification - 验证设置
 * @property {IVerificationQuestionType} [verificationQuestion] - 验证问题设置
 */
export interface IUserProfileType {
	userID: number;
	nickname: string;
	abstract: string;
	avatar: string;
	recallMessage: string;
	friendOnline: boolean;
	enableSound: boolean;
	secureLink: boolean;
	savePwd: boolean;
	searchUser: number;
	verification: number;
	verificationQuestion?: IVerificationQuestionType;
}

/**
 * 更新用户个人资料类型接口
 * @interface IUserProfileUpdateType
 * @property {string} [nickname] - 用户昵称
 * @property {string} [abstract] - 用户简介
 * @property {string} [avatar] - 用户头像
 * @property {string} [recallMessage] - 撤回消息设置
 * @property {boolean} [friendOnline] - 好友在线状态
 * @property {boolean} [enableSound] - 启用声音设置
 * @property {boolean} [secureLink] - 安全链接设置
 * @property {boolean} [savePwd] - 保存密码设置
 * @property {number} [searchUser] - 搜索用户设置
 * @property {number} [verification] - 验证设置
 * @property {IVerificationQuestionType} [verificationQuestion] - 验证问题设置
 */
export interface IUserProfileUpdateType {
	nickname?: string;
	abstract?: string;
	avatar?: string;
	recallMessage?: string;
	friendOnline?: boolean;
	enableSound?: boolean;
	secureLink?: boolean;
	savePwd?: boolean;
	searchUser?: number;
	verification?: number;
	verificationQuestion?: IVerificationQuestionType;
}

/**
 * 好友类型接口
 * @interface frinedType
 * @property {number} friendID - 好友ID
 * @property {string} nickname - 好友昵称
 * @property {string} abstract - 好友简介
 * @property {string} avatar - 好友头像
 * @property {number} notice - 好友通知
 * @property {boolean} isOnline - 好友是否在线
 */
export interface frinedType {
    friendID: number;
    nickname: string;
    abstract: string;
    avatar: string;
    notice: number;
    isOnline: boolean;
}
/**
 *
 * userInfoApi(string)  获取指定用户的用户信息
 * @returns Promise<baseResponse<IUserInfoType>>
 */
export function userProfileApi(): Promise<baseResponse<IUserProfileType>> {
	return useAxios.get('/api/user/info');
}

/**
 * 更新用户的个人资料
 * @param {IUserProfileUpdateType} data - 要更新的用户资料数据
 * @returns {Promise<baseResponse<string>>} 返回一个包含更新结果的 Promise
 */
export function userProfileUpdateApi(data: IUserProfileUpdateType): Promise<baseResponse<string>> {
    // 发送 PUT 请求到服务器更新用户资料
    return useAxios.put('/api/user/info', data);
}

/**
 * 获取好友列表
 * @param {paramsType} params - 查询参数
 * @returns {Promise<baseResponse<listResponse<frinedType>>>} 返回一个包含好友列表的 Promise
 */
export function friendListApi(params: paramsType): Promise<baseResponse<listResponse<frinedType>>> {
    // 发送 GET 请求到服务器获取好友列表
    return useAxios.get('/api/user/friend_list', {
		params: params,
		headers: {
			Role: '2'
		},
	});
}