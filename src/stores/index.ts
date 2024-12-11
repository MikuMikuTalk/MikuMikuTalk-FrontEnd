import { defineStore } from 'pinia';
import { ITokenPayload, parseToken } from '@/utils/parseToken.ts';
import { userProfileApi, IUserProfileType } from '@/api/user_api';
import { ElMessage } from 'element-plus';

//继承ITokenPayload接口中的类型
interface IUserInfo extends ITokenPayload {
	token: string;
}

const userInfo: IUserInfo = {
	userID: 0,
	nickname: '',
	role: 0,
	exp: 0,
	token: '',
	jti: '',
};
const userProfile: IUserProfileType = {
	userID: 0,
	nickname: '',
	abstract: '',
	avatar: '',
	recallMessage: '',
	friendOnline: true,
	sound: true,
	secureLink: false,
	savePwd: false,
	searchUser: 2,
	verification: 2,
	verificationQuestion: {},
};

export const useUserStore = defineStore('user', {
	state: () => ({
		userInfo: userInfo,
		userProfile: userProfile,
	}),
	getters: {
		// 返回是否登陆的状态
		isLogin(): boolean {
			// exp的时间戳-现在的时间戳  为正就是没有过期
			return this.userInfo.token != '' && this.userInfo.exp > 0;
		},
	},
	actions: {
		async setUserInfo(token: string) {
			const payload: ITokenPayload = parseToken(token);
			Object.assign(this.userInfo, {
				token: token,
				nickname: payload.nickname,
				role: payload.role,
				userID: payload.userID,
				exp: payload.exp,
				jti: payload.jti,
			});
			//获取用户profile
			const res = await userProfileApi(this.userInfo.nickname);
			if (res.code) {
				ElMessage.error(res.msg);
				return;
			}

			Object.assign(this.userProfile, {
				userID: res.data.userID,
				nickname: res.data.nickname,
				abstract: res.data.abstract,
				avatar: res.data.avatar,
				recallMessage: res.data.recallMessage,
				friendOnline: res.data.friendOnline,
				sound: res.data.sound,
				secureLink: res.data.secureLink,
				savePwd: res.data.savePwd,
				searchUser: res.data.searchUser,
				verification: res.data.verification,
				verificationQuestion: res.data.verificationQuestion,
			});
			//持久化
			this.saveUserInfo();
			this.saveUserProfile();
		},
		saveUserInfo() {
			localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
		},
		saveUserProfile() {
			localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
		},
		loadUserInfo() {
			const val = localStorage.getItem('userInfo');
			if (!val) {
				//没登录或者登录失效
				return;
			}
			try {
				this.userInfo = JSON.parse(val);
			} catch (err) {
				console.error(err);
				localStorage.removeItem('userInfo');
				return;
			}
		},
		loadUserProfile() {
			const val = localStorage.getItem('userProfile');
			if (!val) {
				//没登陆或者登录失效
				return;
			}
			try {
				this.userProfile = JSON.parse(val);
			} catch (err) {
				console.error(err);
				localStorage.removeItem('userProfile');
				return;
			}
		},
	},
});
