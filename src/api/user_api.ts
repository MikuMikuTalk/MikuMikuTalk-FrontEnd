import { type baseResponse, useAxios } from '@/api/index';
export type IverificationQuestionType = {
	problem1?: string;
	problem2?: string;
	problem3?: string;
	answer1?: string;
	answer2?: string;
	answer3?: string;
};

export interface IUserInfoType {
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
	verificationQuestion: IverificationQuestionType;
}
