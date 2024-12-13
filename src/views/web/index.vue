<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ChatLineRound, Menu, Notification, User } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
const route = useRoute();
const router = useRouter();
function checkMenu(menu: string) {
	router.push({ path: menu });
}
const store = useUserStore()

</script>
<template>
	<div class="miku_web">
		<div class="miku_slide">
			<div class="avatar">
				<img :src="store.userProfile.avatar" alt="" />
			</div>
			<div class="miku_menus">
				<div class="icon" :class="{ active: route.name === 'session' }" @click="checkMenu('session')">
					<el-icon>
						<ChatLineRound />
					</el-icon>
				</div>
				<div class="icon" :class="{ active: route.name === 'contacts' }" @click="checkMenu('contacts')">
					<el-icon>
						<User />
					</el-icon>
				</div>
				<div class="icon" :class="{ active: route.name === 'notice' }" @click="checkMenu('notice')">
					<el-icon>
						<Notification />
					</el-icon>
				</div>
				<div class="other icon" :class="{ active: route.name === 'info' }" @click="checkMenu('info')">
					<el-icon>
						<Menu />
					</el-icon>
				</div>
			</div>
		</div>
		<div class="miku_main">
			<RouterView />
		</div>

	</div>
</template>
<style lang="scss" scoped>
.miku_web {
	width: 1000px;
	height: 600px;
	background-color: white;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	display: flex;
}

.miku_slide {
	width: 80px;
	height: 100%;
	background-color: #e0e0e0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0;

	.avatar {
		width: 46px;
		height: 46px;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.miku_menus {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;

		>div {
			margin-bottom: 20px;
		}
	}

	.icon {
		cursor: pointer;
		font-size: 20px;
		width: 40px;
		height: 40px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s;

		&:hover {
			background-color: #d9d9d9;
		}

		&.active {
			color: #1684fc;
			background-color: #d9d9d9;
		}
	}

	.other {
		position: absolute;
		bottom: 20px;
	}

	.miku_main {
		width: calc(100% - 80px);
	}
}
</style>
