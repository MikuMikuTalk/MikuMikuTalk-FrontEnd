import { type baseResponse, useAxios } from '@/api/index';

//IVerificationQuestionType 验证问题类型
export type IVerificationQuestionType = {
	problem1?: string;
	problem2?: string;
	problem3?: string;
	answer1?: string;
	answer2?: string;
	answer3?: string;
};

// IUserProfileType 用户个人资料类型
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

// IUserProfileUpdateType 更新用户个人资料类型
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
 *
 * userInfoApi(string)  获取指定用户的用户信息
 * @returns Promise<baseResponse<IUserInfoType>>
 */
export function userProfileApi(): Promise<baseResponse<IUserProfileType>> {
	return useAxios.get('/api/user/info');
}


/**
 * Updates the user's profile with the provided data.
 * Sends a PUT request to the server with the user's updated profile information.
 * @param data - The updated profile data adhering to the IUserProfileUpdateType interface.
 * @returns A promise resolving to a baseResponse containing a string indicating the result of the update operation.
 */
export function userProfileUpdateApi(data: IUserProfileUpdateType): Promise<baseResponse<string>> {
	return useAxios.put('/api/user/info',data)
}