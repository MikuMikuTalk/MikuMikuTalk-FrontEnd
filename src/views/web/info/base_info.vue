<script setup lang="ts">
import { baseResponse } from '@/api';
import { IUserProfileUpdateType, userProfileUpdateApi } from '@/api/user_api';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';

const store = useUserStore();

interface iptType {
	label: string
	val: boolean
	key: "friendOnline" | "enableSound"
	help: string
}

const list = ref<iptType[]>([
	{
		label: "提醒",
		val: store.userProfile.friendOnline,
		key: "friendOnline",
		help: "开启好友上线提醒"
	},
	{
		label: "声音",
		val: store.userProfile.enableSound,
		key: "enableSound",
		help: "关闭所有声音"
	}
])



watch(() => store.userProfile, () => {
	list.value[0].val = store.userProfile.friendOnline
	list.value[1].val = store.userProfile.enableSound
}, { deep: true })

async function change(index: number) {
	let data: IUserProfileUpdateType = {
		[list.value[index].key]: list.value[index].val
	}
	let res: baseResponse<string> = await userProfileUpdateApi(data);
	if (res.code) {
		ElMessage.error(res.msg)
		return
	}
	ElMessage.success(list.value[index].label + "设置修改成功！")
}
</script>
<template>
	<div class="my_info_view">
		<el-form-item :label="item.label" v-for="(item, index) in list" v-bind:key="index">
			<el-checkbox v-model="item.val" :label="item.help" @change="change(index)"></el-checkbox>
		</el-form-item>
	</div>
</template>

<style lang="scss" scoped></style>
