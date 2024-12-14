<script setup lang="ts">
import { useUserStore } from '@/stores';
import { nextTick, ref } from 'vue';
import { userProfileUpdateApi } from '@/api/user_api.ts';
import { ElMessage } from 'element-plus';

const store = useUserStore();
const showEdit = ref(false);
const editNickNameRef = ref();
const oldNickname = ref('');

function editNickName(oldValue: string) {
	//设置为可编辑状态
	showEdit.value = true;

	oldNickname.value = oldValue;
	nextTick(() => {
		editNickNameRef.value.focus();
	});
}

async function editNickNameBlur() {
	//设置为不可编辑状态
	showEdit.value = false;

	//变化了才执行更新
	if (oldNickname.value !== store.userProfile.nickname) {
		let res = await userProfileUpdateApi({
			nickname: store.userProfile.nickname,
		});
		if (res.code) {
			ElMessage.error(res.msg);
			return;
		}
		ElMessage.success(res.msg);
	}
}
</script>
<template>
	<div class="miku_my_info_view">
		<el-form-item label="头像">
			<el-avatar :src="store.userProfile.avatar"></el-avatar>
		</el-form-item>
		<el-form-item label="用户id">
			<span>{{ store.userProfile.userID }}</span>
		</el-form-item>
		<el-form-item label="昵称">
			<span v-if="!showEdit">{{ store.userProfile.nickname }}</span>
			<el-input
				ref="editNickNameRef"
				:maxlength="16"
				@blur="editNickNameBlur"
				v-else
				class="edit_nickname_ipt"
				placeholder="修改昵称"
				v-model="store.userProfile.nickname"
			></el-input>
			<el-button @click="editNickName(store.userProfile.nickname as string)">编辑</el-button>
		</el-form-item>
		<el-form-item label="简介">
			<span>{{ store.userProfile.abstract }}</span>
			<i class="iconfont icon-bianji"></i>
		</el-form-item>
	</div>
</template>

<style lang="scss" scoped>
.miku_my_info_view {
}
.edit_nickname_ipt {
  display: inline-flex;
  width: 200px;
}
</style>
