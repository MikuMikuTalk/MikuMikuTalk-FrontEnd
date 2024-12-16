<script lang="ts" setup>
import {IUserProfileUpdateType, IVerificationQuestionType} from '@/api/user_api';
import { useUserStore } from '@/stores';
import { reactive } from 'vue';


const store = useUserStore();
// 0 不允许别人查找到我， 1  通过用户号找到我 2 可以通过昵称搜索到我
// 0 不允许任何人添加  1 允许任何人添加  2 需要验证消息 3 需要回答问题  4  需要正确回答问题
const verificationQuestion = reactive<IVerificationQuestionType>({
	problem1: '',
	problem2: '',
	problem3: '',
	answer1: '',
	answer2: '',
	answer3: '',
});
</script>
<template>
  <div class="role_info_view">
    <el-form-item label="防骚扰:">
      <div>
        <div>
      <div class="label">请选择允许别人查找到你的方式：</div>
          <el-radio-group v-model="userProfile.searchUser">
            <el-radio :value="0">不允许别人查找到我</el-radio>
            <el-radio :value="1">只能通过用户号查找到我</el-radio>
            <el-radio :value="2">可以通过昵称搜索到我</el-radio>
          </el-radio-group>
      </div>
      <div>
        <div class="label">请选择适合你的验证方式：</div>
        <el-radio-group v-model="userProfile.verification" >
          <el-radio :value="0">不允许任何人添加</el-radio>
          <el-radio :value="1">允许任何人添加</el-radio>
          <el-radio :value="2">需要验证消息</el-radio>
          <el-radio :value="3">需要回答问题</el-radio>
          <el-radio :value="4">需要正确回答问题</el-radio>
        </el-radio-group>
      </div>
      </div>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped></style>
