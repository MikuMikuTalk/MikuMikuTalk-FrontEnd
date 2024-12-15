<script setup lang="ts">
import {baseResponse} from '@/api';
import {IUserProfileUpdateType, userProfileUpdateApi} from '@/api/user_api';
import {useUserStore} from '@/stores';
import {ElMessage} from 'element-plus';
import {onMounted, ref, watch} from 'vue';

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

const isRecallMessage = ref<boolean>(false)
//旧的撤回消息信息
const oldRecallMessage = ref<string>("")
const recallMessage = ref<string>("撤回了一条消息")
// 初始化数据
function initializeValues() {
  isRecallMessage.value = !!store.userProfile.recallMessage; // 根据 recallMessage 是否有值初始化状态
  oldRecallMessage.value = store.userProfile.recallMessage;
  recallMessage.value = store.userProfile.recallMessage || "撤回了一条消息";
  list.value[0].val = store.userProfile.friendOnline;
  list.value[1].val = store.userProfile.enableSound;
  console.info("初始化数据调用")
}
onMounted(()=>{
  initializeValues(); // 页面加载时同步初始值
})
watch(() => store.userProfile.recallMessage, () => {
  initializeValues();
}, {deep: true})

async function change(index: number) {
  let data: IUserProfileUpdateType = {
    [list.value[index].key]: list.value[index].val
  }
  let res: baseResponse<string> = await userProfileUpdateApi(data);
  if (res.code) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success(list.value[index].label + "设置修改成功！");
  //修改成功后 更新store
  await store.setUserProfile()

}

async function recallMessageUpdate(val: boolean) {
  console.log("new" ,recallMessage.value)
  console.log("oldRecallMessage", oldRecallMessage.value)
  if (!val) {
    return
  }
  //如果关闭消息撤回提示，那么就清空撤回消息
  if (!isRecallMessage.value) {
    //  取消设置撤回信息
    recallMessage.value = ""
  }
  if(recallMessage.value === oldRecallMessage.value ) {
    console.log("两值相等")
    return
  }
  let res = await userProfileUpdateApi({
    recallMessage: recallMessage.value,
  })
  if (res.code) {
    ElMessage.error(res.msg)
    return
  }
  //如果获取成功，那就更新store存储的值
  store.userProfile.recallMessage = recallMessage.value
  ElMessage.success("撤回信息反馈设置成功！")
}
</script>
<template>
  <div class="my_info_view">
    <el-form-item label="会话">
      <div>
        <el-checkbox v-model="isRecallMessage" @change="recallMessageUpdate(true)" label="撤回消息设置"></el-checkbox>
        <div>
          <el-input v-if="isRecallMessage" style="width: 300px" @blur="recallMessageUpdate(true)" maxlength="12"
                    placeholder="撤回消息提示词" v-model="recallMessage">
          </el-input>
        </div>
      </div>
    </el-form-item>
    <el-form-item :label="item.label" v-for="(item, index) in list" v-bind:key="index">
      <el-checkbox v-model="item.val" :label="item.help" @change="change(index)"></el-checkbox>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped></style>
