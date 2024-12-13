<script setup lang="ts">
import { useUserStore } from '@/stores';
const store = useUserStore();

</script>
<template>
	  <div class="miku_my_info_view">
    <el-form-item label="头像">
      <el-avatar :src="store.userProfile.avatar"></el-avatar>
    </el-form-item>
    <el-form-item label="用户号">
      <span>{{ store.userProfile.userID }}</span>
    </el-form-item>
    <el-form-item label="昵称">
      <span>{{ store.userProfile.nickname }}</span>
      <i class="iconfont icon-bianji"></i>
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

</style>
