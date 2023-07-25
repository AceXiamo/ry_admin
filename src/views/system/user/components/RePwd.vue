<template>
  <el-dialog v-model="showModal" title="重置密码" width="40%">
    <el-form ref="ruleFormRef" :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">返 回</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import type { SysUser } from '@/api/system/user'

const showModal = ref<boolean>(false)
let form = ref<SysUser>({})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<any>({
  password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['confirm', 'cancel'])

let curentType = ref<'add' | 'update'>('add')
const show = (data: SysUser, type: 'add' | 'update') => {
  curentType.value = type
  showModal.value = true
  form.value = {}

  if (type === 'update') {
    form.value = JSON.parse(JSON.stringify(data))
  }
}

const cancel = () => {
  showModal.value = false
  emit('cancel')
}

const submit = () => {
  ruleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      emit('confirm', form.value, curentType.value)
      cancel()
    }
  })
}

defineExpose({
  show
})
</script>
