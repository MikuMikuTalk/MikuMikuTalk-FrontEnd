<script setup lang="ts">
import { reactive } from "vue";
import { authLoginApi, type authLoginRequest } from "./api/index";
import { ElMessage } from "element-plus";
import { parseToken } from "./utils/parseToken";

// 表单数据结构
const form = reactive<authLoginRequest>({
  userName: "",
  password: "",
});

// 打印环境变量
//console.log(import.meta.env);

async function login() {
  try {
    // 调用登录 API
    let res = await authLoginApi(form);
    
    // 检查返回结果中的 code
    if (res.code !== 0) { // 假设 0 表示成功
      ElMessage.error(res.msg);
      return;
    }

    // 拿到的是 token，前端要对它进行解码
    console.log(res.data);
    const payload = parseToken(res.data.token);
    console.log(payload);
    ElMessage.success(res.msg);
    
  } catch (error) {
    // 处理请求错误
    console.error(error);
    ElMessage.error("登录请求失败，请重试。");
  }
}
</script>

<template>
  <el-form>
    <el-form-item>
      <!-- 添加表单的 label 属性可以增强可访问性 -->
      <el-input v-model="form.userName" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="item_btn">
      <el-button style="width: 100%" @click="login" type="primary">登陆</el-button>
    </el-form-item>
  </el-form>
  <div class="other_login"></div>
</template>
