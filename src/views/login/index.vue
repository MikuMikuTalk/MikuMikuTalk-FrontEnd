<script setup lang="ts">
import {reactive} from "vue";
import {authLoginApi, IAuthLoginRequest, IAuthLoginResponse} from "@/api/auth_api.ts";
import {baseResponse} from "@/api";
import {ElMessage} from "element-plus";
import {parseToken} from "@/utils/parseToken.ts";

const form = reactive<IAuthLoginRequest>({
  username: "",
  password: "",
})

async function login() {
  let res: baseResponse<IAuthLoginResponse> = await authLoginApi(form);
  if (res.code) {
    ElMessage.error(res.msg)
    return
  }
  console.log("jwt token: ",res.data)
  const payload = parseToken(res.data.token)
  console.log(payload)
  ElMessage.success(res.msg)
}
</script>

<template>
  <div class="miku_login">
    <div class="banner">

    </div>
    <div class="login_form">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名">

          </el-input>
        </el-form-item>

        <el-form-item class="item_password">
          <el-input v-model="form.password" placeholder="密码" type="password">

          </el-input>
        </el-form-item>

        <el-form-item class="item_action">
          <el-checkbox>记住密码</el-checkbox>
        </el-form-item>

        <el-form-item class="item_btn">
          <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.miku_login {
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
    background-image: url("https://blog.meowrain.cn/api/i/2024/11/27/eG0YiL1732691928439394898.webp");
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

  .login_form {
    padding: 20px 80px;

    .item_password, .item_action, .item_btn {
      margin-bottom: 6px
    }
  }
}
</style>