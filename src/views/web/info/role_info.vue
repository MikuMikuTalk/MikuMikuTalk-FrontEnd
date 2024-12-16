<script lang="ts" setup>
import {IVerificationQuestionType, userProfileUpdateApi} from '@/api/user_api';
import {useUserStore} from '@/stores';
import {reactive, watch} from 'vue';
import {ElMessage} from "element-plus";


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

async function save() {
  console.log(store.userProfile.verificationQuestion)
  let res = await userProfileUpdateApi({
    searchUser: store.userProfile.searchUser,
    verification: store.userProfile.verification,
    verificationQuestion: verificationQuestion,
  })
  if (res.code) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success("防骚扰设置修改成功")
  //更新成功后刷新数据
  await store.setUserProfile()
}

watch(() => store.userProfile.verificationQuestion, () => {
  Object.assign(verificationQuestion, store.userProfile.verificationQuestion)
}, {deep: true,immediate: true})

</script>
<template>
  <div class="role_info_view">
    <el-form-item label="防骚扰:">
      <div>
        <div>
          <div class="label">请选择允许别人查找到你的方式：</div>
          <el-radio-group v-model="store.userProfile.searchUser">
            <el-radio :value="0">不允许别人查找到我</el-radio>
            <el-radio :value="1">只能通过用户号查找到我</el-radio>
            <el-radio :value="2">可以通过昵称搜索到我</el-radio>
          </el-radio-group>
        </div>
        <div>
          <div class="label">请选择适合你的验证方式：</div>
          <el-radio-group v-model="store.userProfile.verification">
            <el-radio :value="0">不允许任何人添加</el-radio>
            <el-radio :value="1">允许任何人添加</el-radio>
            <el-radio :value="2">需要验证消息</el-radio>
            <el-radio :value="3">需要回答问题</el-radio>
            <el-radio :value="4">需要正确回答问题</el-radio>
          </el-radio-group>
          <div class="verification" v-if="store.userProfile.verification === 3 || store.userProfile.verification === 4">
            <div class="item">
              <div class="question">
                <span>问题1：</span>
                <el-input placeholder="问题1" v-model="verificationQuestion.problem1"></el-input>
              </div>
              <div class="answer" v-if="store.userProfile.verification === 4">
                <span>答案:</span>
                <el-input placeholder="答案" v-model="verificationQuestion.answer1"></el-input>
              </div>
            </div>
            <div class="item">
              <div class="question">
                <span>问题2：</span>
                <el-input placeholder="问题2" v-model="verificationQuestion.problem2"></el-input>
              </div>
              <div class="answer" v-if="store.userProfile.verification === 4">
                <span>答案:</span>
                <el-input placeholder="答案" v-model="verificationQuestion.answer2"></el-input>
              </div>
            </div>

            <div class="item">
              <div class="question">
                <span>问题3：</span>
                <el-input placeholder="问题3" v-model="verificationQuestion.problem3"></el-input>
              </div>
              <div class="answer" v-if="store.userProfile.verification === 4">
                <span>答案:</span>
                <el-input placeholder="答案" v-model="verificationQuestion.answer3"></el-input>
              </div>
            </div>

          </div>
        </div>
      </div>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
.role_info_view {
  .el-radio-group {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  ::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }

  scrollbar-width: none; /* 隐藏滚动条 */
  -ms-overflow-style: none; /* 隐藏滚动条 */
  .question, .answer {
    display: flex;
    width: 500px;
    margin-bottom: 10px;

    .el-input {
      width: 300px;
    }

    > span {
      width: 4rem;
    }
  }
}
</style>
