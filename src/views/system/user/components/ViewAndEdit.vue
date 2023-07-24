<template>
  <el-dialog v-model="showModal" title="用户编辑" width="40%">
    <el-form ref="ruleFormRef" :model="form" label-width="100px" :rules="rules" v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户姓名" prop="">
            <el-input v-model="form.nickName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门" prop="">
            <el-input v-model="form.deptId" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="用户性别" prop="">
            <el-select v-model="form.sex" placeholder="请选择性别" class="w-full">
                <el-option
                  v-for="item in dictStore.dictData['sys_user_sex']"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="">
            <el-radio-group v-model="form.status" class="ml-4">
              <el-radio v-for="(item, index) in dictStore.dictData['sys_normal_disable']" :label="item.dictValue" size="large" :key="index">{{ item.dictLabel }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位" prop="">
            <el-input v-model="form.sex" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="">
            <el-input v-model="form.status" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="">
            <el-input v-model="form.sex" placeholder="请输入用户姓名"></el-input>
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
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import type { SysUser } from '@/api/system/user'
import type { SysDictData } from '@/api/system/dict/data'
import { useDictStore } from '@/store/dict'

let loading = ref<boolean>(false)
const showModal = ref<boolean>(true)
let form = ref<SysUser>({})

const dictStore = useDictStore()
dictStore.use('sys_normal_disable', 'sys_user_sex')

const ruleFormRef = ref<FormInstance>()
const rules = reactive<any>({
  menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
  orderNum: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }],
  path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }]
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
