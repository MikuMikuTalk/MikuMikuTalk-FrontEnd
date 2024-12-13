<script setup lang="ts">
import { reactive, ref } from 'vue';
import { authLoginApi, IAuthLoginRequest, IAuthLoginResponse } from '@/api/auth_api.ts';
import { baseResponse } from '@/api';
import { ElMessage, type FormRules } from 'element-plus';
//引入useRouter
import { useRouter,useRoute } from 'vue-router';
//引入pinia 的用户存储
import { useUserStore } from '@/stores';

//使用router进行跳转，router文档请查看 https://router.vuejs.org/zh/guide/essentials/navigation.html
const router = useRouter();
const route = useRoute();
//引入pinia 的用户存储，对用户数据进行存储
const user_store = useUserStore();

// 创建一个响应式对象，类型为 IAuthLoginRequest
type RuleForm = IAuthLoginRequest;
const form = reactive<RuleForm>({
	username: '',
	password: '',
});

// 定义表单规则 文档:https://element-plus.org/zh-CN/component/form.html
const rules = reactive<FormRules<RuleForm>>({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const formRef = ref();

async function login() {
	let val = await formRef.value.validate();
	if (!val) {
		return;
	}
	let res: baseResponse<IAuthLoginResponse> = await authLoginApi(form);
	if (res.code) {
		ElMessage.error(res.msg);
		return;
	}
	//存储并设置用户 --> 读取jwt信息并解析，存储到localstorage中
	user_store.setUserInfo(res.data.token);
	ElMessage.success('登录成功');
	//重定向: 重定向是自动将访问者发送到另一个页面（条目或者条目的章节）的页面
	// 要是从其它页面过来的，登陆成功后，就跳转到那个页面
	const redirestUrl:string = route.query.redirect_url as string
	if(redirestUrl) {
		router.push({
			path: redirestUrl
		})
	}

	await router.push({
		name: 'web',
	});
}
</script>

<template>
	<div class="miku_login">
		<div class="banner"></div>
		<div class="login_form">
			<el-form ref="formRef" :model="form" :rules="rules">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="用户名"> </el-input>
				</el-form-item>

				<el-form-item prop="password" class="item_password">
					<el-input v-model="form.password" placeholder="密码" type="password"> </el-input>
				</el-form-item>

				<el-form-item class="item_action">
					<el-checkbox>记住密码</el-checkbox>
				</el-form-item>

				<el-form-item class="item_btn">
					<el-button style="width: 100%" type="primary" @click="login">登录</el-button>
				</el-form-item>
				<!-- 添加注册超链接 -->
				<div class="register_link">
					<router-link to="/register">没有账号？立即注册</router-link>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style scoped lang="scss">
.miku_login {
	width: 500px;
	height: 420px;
	background-color: whitesmoke;
	border-radius: 10px;
	overflow: hidden;
	/* box-shadow: offset-x offset-y blur-radius spread-radius color; */
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);

	.banner {
		height: 200px;
		width: 100%;
		background-image: url('https://blog.meowrain.cn/api/i/2024/11/27/eG0YiL1732691928439394898.webp');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		text-align: center;
		position: relative;

		&::after {
			content: 'MikuMikuTalk';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;
			font-size: 2rem;
		}
	}

	.login_form {
		padding: 20px 80px;

		.item_password,
		.item_action,
		.item_btn {
			margin-bottom: 6px;
		}
	}

	.register_link {
		margin-top: 5px;
		text-align: center;

		a {
			color: #409eff;
			font-size: 13px;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
