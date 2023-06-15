<template>
  <div class="bg-blue-300 h-screen w-screen flex justify-center items-center">
    <div class="bg-white w-400px rounded-md flex flex-col py-40px px-20px gap-30px">
      <div class="flex justify-center">
        <img
          src="https://mrd.oss-cn-shenzhen.aliyuncs.com/wxapp/639292cfd9d50231ecd2e5c4.png"
          class="h-70px"
        />
      </div>
      <div class="flex flex-col gap-20px">
        <div class="flex px-10 items-center gap-5">
          <el-input
            v-model="form.username"
            class="w-full h-35px"
            placeholder="请输入账号"
          />
        </div>
        <div class="flex px-10 items-center gap-5">
          <el-input
            type="password"
            v-model="form.password"
            class="w-full h-35px"
            placeholder="请输入密码"
          />
        </div>
        <div class="flex px-10 items-center gap-5">
          <el-input
            v-model="form.code"
            class="w-full h-35px"
            placeholder="请输入验证码"
          />
          <div class="h-35px" style="aspect-ratio: 93.33 / 35" @click="loadCodeImg">
            <img
              :src="codeImg"
              class="h-full w-full rounded-sm"
              style="aspect-ratio: 93.33 / 35"
            />
          </div>
        </div>
      </div>
      <div
        @click="handleLogin"
        :class="[
          `rounded-md bg-blue-500 text-white text-sm text-center py-8px mx-10 cursor-pointer select-none hover:opacity-70 transition duration-200`,
          `active:opacity-100`,
        ]"
      >
        登陆
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { login, getCodeImg } from "@/api/login";
import router from "@/router";
import { setToken } from '@/utils/auth'
import type { LoginForm, LoginRes, CodeImgRes } from "@/api/login";
import { reloadRouter } from "@/router";

let form: any = ref<LoginForm>({
  username: <string>"",
  password: <string>"",
  code: <string>"",
  uuid: <string>"",
});

let codeImg = ref<string>("");

onMounted(() => {
  loadCodeImg();
});

const loadCodeImg = () => {
  getCodeImg().then((res: CodeImgRes) => {
    codeImg.value = "data:image/png;base64," + res.img;
    form.value.uuid = res.uuid;
  });
};

const handleLogin = () => {
  if (!form.value.username || !form.value.password || !form.value.code) {
    ElMessage.error("请输入完整！");
    return;
  }

  login(form.value).then((res: LoginRes) => {
    if (res.code === 200) {
      ElMessage.success("登陆成功！");
      setToken(res.token);
      reloadRouter();
      router.push('/');
    } else {
      ElMessage.error(res.msg);
    }
  }); 
};
</script>
