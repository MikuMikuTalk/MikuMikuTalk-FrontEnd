<script setup lang="ts">
import {useUserStore} from '@/stores';
import {nextTick, ref, watch} from 'vue';
import {IUserProfileUpdateType, userProfileUpdateApi} from '@/api/user_api.ts';
import {ElMessage} from 'element-plus';


const store = useUserStore();

const list = ref([
  {
    label: "昵称",
    isShowIpt: false,
    maxLength: 13,
    val: store.userProfile.nickname,
    type: "text",
    old: "",
    key: "nickname"
  },
  {
    label: "个性签名",
    isShowIpt: false,
    maxLength: 1000,
    val: store.userProfile.abstract,
    type: "text",
    rows: 5,
    old: "",
    key: "abstract"
  }
]);

const editRefList = ref();

function edit(index: number) {
  list.value[index].isShowIpt = true;
  list.value[index].old = list.value[index].val;
  nextTick(() => {
    if (editRefList.value.length) {
      editRefList.value[0].focus();
    }
  });
}

async function blur(index: number) {
  list.value[index].isShowIpt = false;
  if (list.value[index].old === list.value[index].val) {
    return;
  }

  let data: IUserProfileUpdateType = {
    [list.value[index].key]: list.value[index].val
  };
  let res = await userProfileUpdateApi(data);

  if (res.code) {
    ElMessage.error(res.msg);
    return;
  }
  ElMessage.success(list.value[index].label + "修改成功");
  //修改成功后 更新store
  await store.setUserProfile()
}

watch(() => store.userProfile, () => {
  list.value[0].val = store.userProfile.nickname
  list.value[1].val = store.userProfile.abstract
}, {deep: true, immediate: true})

</script>

<template>
  <div class="miku_my_info_view">
    <el-form-item label="头像">
      <el-avatar :src="store.userProfile.avatar"></el-avatar>
    </el-form-item>
    <el-form-item label="用户id">
      <span>{{ store.userProfile.userID }}</span>
    </el-form-item>
    <el-form-item :label="item.label" v-for="(item, index) in list" :key="item.key">
      <span v-if="!item.isShowIpt">{{ item.val }}</span>
      <el-input v-else ref="editRefList" :maxlength="item.maxLength" :rows="item.rows" :type="item.type"
                @blur="blur(index)" class="edit_ipt" v-model="item.val" :placeholder="'修改' + item.label"></el-input>
      <el-button @click="edit(index)">修改</el-button>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
.edit_ipt {
  display: inline-flex;
  width: 200px;
}
</style>
