<script lang="ts" setup>
import { userProfileUpdateApi } from '@/api/user_api';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';


const store = useUserStore();

interface iptType {
	label: string
	val: boolean
	key: "secureLink" | "savePwd"
	help: string
}

const list = ref<iptType[]>(
	[
		{
			label: "安全链接",
			val: store.userProfile.secureLink,
			key: "secureLink",
			help: "拦截所有外部链接，跳转至安全链接"
		},
		{
			label: "密码",
			val: store.userProfile.savePwd,
			key: "savePwd",
			help: "记住密码"
		}
	]
)
watch(() => store.userProfile, () => {
	list.value[0].val = store.userProfile.secureLink
	list.value[1].val = store.userProfile.savePwd
}, { deep: true })

async function change(index: number) {
	let res = await userProfileUpdateApi({
		[list.value[index].key]: list.value[index].val
	})
	if (res.code) {
		ElMessage.error(res.msg)
		return
	}
	ElMessage.success(list.value[index].label + "配置修改成功！")
}
</script>
<template>
	<div class="safe_info_view">
		<el-form-item :label="item.label" v-for="(item, index) in list" :key="index">
			<el-checkbox v-model="item.val" :label="item.help" @change="change(index)"></el-checkbox>
		</el-form-item>
	</div>

</template>

<style lang="scss" scoped>
.safe_info_view {}
</style>
