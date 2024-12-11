<script setup lang="ts">
import { reactive, ref } from "vue";
import { authRegisterApi, IAuthLoginRequest, IAuthRegisterResponse } from "@/api/auth_api.ts";
import { baseResponse } from "@/api";
import { ElMessage, type FormRules } from "element-plus";
//引入useRouter
import { useRouter } from "vue-router";


//使用router进行跳转，router文档请查看 https://router.vuejs.org/zh/guide/essentials/navigation.html
const router = useRouter()

// 创建一个响应式对象，类型为 IAuthLoginRequest
interface RuleForm extends IAuthLoginRequest {
}
const form = reactive<RuleForm>({
    username: "",
    password: "",
})

// 定义表单规则 文档:https://element-plus.org/zh-CN/component/form.html
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})

const formRef = ref()


async function register() {
    let val = await formRef.value.validate()
    if (!val) {
        return
    }
    let res: baseResponse<IAuthRegisterResponse> = await authRegisterApi(form);
    if (res.code) {
        ElMessage.error(res.msg)
        return
    }
    ElMessage.success("注册成功")
    //重定向: 重定向是自动将访问者发送到另一个页面（条目或者条目的章节）的页面
    await router.push({
        name: "login"
    })
}


</script>

<template>
    <div class="miku_register">
        <div class="banner">

        </div>
        <div class="register_form">
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名">

                    </el-input>
                </el-form-item>

                <el-form-item prop="password" class="item_password">
                    <el-input v-model="form.password" placeholder="密码" type="password">

                    </el-input>
                </el-form-item>

                <el-form-item class="item_btn">
                    <el-button style="width: 100%" type="primary" @click="register">注册</el-button>
                </el-form-item>
                <!-- 添加注册超链接 -->
                <div class="login_link">
                    <router-link to="/login">有账号了？登录-v-</router-link>
                </div>
            </el-form>

        </div>
    </div>
</template>

<style scoped lang="scss">
.miku_register {
    width: 500px;
    height: 400px;
    background-color: whitesmoke;
    border-radius: 10px;
    overflow: hidden;
    /* box-shadow: offset-x offset-y blur-radius spread-radius color; */
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);

    .banner {
        height: 200px;
        width: 100%;
        background-image: url("https://blog.meowrain.cn/api/i/2024/12/11/emeoFj1733886699479520138.webp");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        text-align: center;
        position: relative;

        &::after {
            content: "MikuMikuTalk";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 2rem;
        }
    }

    .register_form {
        padding: 20px 80px;

        .item_btn {
            margin-bottom: 10px;
        }
    }

    .login_link {
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