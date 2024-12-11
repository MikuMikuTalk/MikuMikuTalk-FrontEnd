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
	recallMessage?: string;
	friendOnline: boolean;
	sound: boolean;
	secureLink: boolean;
	savePwd: boolean;
	searchUser: number;
	verification: number;
	verificationQuestion: IVerificationQuestionType;
}

/**
 *
 * userInfoApi(string)  获取指定用户的用户信息
 * @param username string
 * @returns Promise<baseResponse<IUserInfoType>>
 */
export function userProfileApi(username: string): Promise<baseResponse<IUserProfileType>> {
	return useAxios.get('/api/user/info', {
		params: {
			username: username,
		},
	});
}
