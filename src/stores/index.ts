import { defineStore } from 'pinia';
import { ITokenPayload, parseToken } from '@/utils/parseToken.ts';

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

export const useUserStore = defineStore('user', {
	state: () => ({
		userInfo: userInfo,
	}),
	getters: {},
	actions: {
		setUserInfo(token: string) {
			const payload: ITokenPayload = parseToken(token);
			this.userInfo.token = token;
			this.userInfo.nickname = payload.nickname;
			this.userInfo.role = payload.role;
			this.userInfo.userID = payload.userID;
			this.userInfo.exp = payload.exp;
			this.userInfo.jti = payload.jti;
			//持久化
			this.saveUserInfo();
		},
		saveUserInfo() {
			localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
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
				localStorage.removeItem('userInfo');
				return;
			}
		},
	},
});
