<script setup lang="ts">
import type { listResponse } from '@/api';
import { friendListApi, type frinedType } from '@/api/user_api';
import { computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
const friendData = reactive<listResponse<frinedType>>({
	list: [],
	count: 0,
})
async function getFriendList() {
	let res = await friendListApi({
		limit: -1
	})
	if (res.code !== 0) {
		ElMessage.error(res.msg)
		return
	}
	friendData.list = res.data.list
	friendData.count = res.data.count
}
const friendOnlineCount = computed(() => {
	return friendData.list.filter(item => item.isOnline === true).length
})
getFriendList()
</script>
<template>
	<div class="contact_view">
		<div class="contact_slide">
			<div class="head">
				<span><i class="iconfont icon-sousuo"></i>搜索</span>
				<span><i class="iconfont icon-chuangjianqunliao"></i>添加群聊</span>
			</div>
			<div class="contact_menu">
				<el-scrollbar height="100%">
					<el-menu :default-openeds="['3']">
						<el-sub-menu index="1">
							<template #title>
								<span>我创建的群聊</span>
							</template>
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>
								<span>我加入的群聊</span>
							</template>
						</el-sub-menu>
						<el-sub-menu index="3">
							<template #title>
								<span>在线/好友数 {{ friendOnlineCount }}/{{ friendData.count }}</span>
							</template>
							<div class="friend_list">
								<div class="item" v-for="(item, index) in friendData.list" v-bind:key="index">
									<div class="avatar">
										<img :src="item.avatar" alt="">
										<div class="online_status online"></div>
									</div>
									<div class="info">
										<div class="nickname">
											<el-text style="width: 5rem" truncated>
												{{ item.nickname }}
											</el-text>

											<el-text style="width: 4rem" truncated>
												（{{ item.notice === "" ? "-" : item.notice }}）
											</el-text>

										</div>
										<div class="abstract">
											<el-text class="w-150px mb-2" truncated>
												{{ item.abstract }}
											</el-text>
										</div>
									</div>
								</div>
							</div>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</div>
		</div>
		<div class="contact_main">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss">
.contact_view {
	width: 100%;
	display: flex;
	height: 100%;

	.contact_slide {
		width: 240px;
		border-right: 1px solid #e7e7e7;
		height: 100%;

		.head {
			height: 40px;
			padding: 0 10px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e7e7e7;
			color: #555;

			span {
				cursor: pointer;
			}

			i {
				margin-right: 5px;
			}
		}

		.contact_menu {
			height: calc(100% - 40px);
			//overflow-y: auto;

			.el-menu {
				.el-sub-menu__title {
					height: 40px;
					font-weight: 600;
					padding: 0 10px;
				}

				.friend_list {
					width: 100%;

					.item {
						height: 50px;
						display: flex;
						padding: 10px;
						align-items: center;
						cursor: pointer;

						&:hover {
							background-color: #f6f6f6;
						}

						.avatar {
							position: relative;
							width: 40px;
							display: flex;
							align-items: center;

							img {
								width: 35px;
								height: 35px;
								border-radius: 5px;
								object-fit: cover;
							}

							.online_status {
								position: absolute;
								right: 6px;
								bottom: 0px;
								width: 10px;
								height: 10px;
								border-radius: 50%;
								background-color: #737373;

								&.online {
									background-color: #5af50e;
								}
							}
						}

						.info {
							width: calc(100% - 45px);
							font-size: 14px;

							.nickname {
								font-weight: 600;
								display: flex;
								align-items: center;
								color: var(--el-text-color-regular);
							}

							.abstract {
								color: #555;
							}
						}
					}
				}
			}
		}
	}

	.contact_main {
		width: calc(100% - 240px);
	}
}
</style>
