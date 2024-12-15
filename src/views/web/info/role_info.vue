<script lang="ts" setup>
import { IVerificationQuestionType } from '@/api/user_api';
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
	<div>权限设置</div>
</template>

<style lang="scss" scoped></style>
