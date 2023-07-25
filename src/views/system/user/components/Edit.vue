<template>
  <el-dialog v-model="showModal" title="用户编辑" width="40%">
    <el-form ref="ruleFormRef" :model="form" label-width="100px" :rules="rules" v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户姓名" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门" prop="">
            <el-tree-select
              v-model="form.deptId"
              :data="selectorItemHandle(prop.deptTree)"
              placeholder="请选择"
              clearable
              :check-strictly="true"
              :render-after-expand="false"
              class="w-full"
            >
              <template #default="{ data }: { data: TreeSelectorItem }">
                <div class="flex gap-[3px]">
                  <span class="text-gray-600 font-400 text-[14px]">{{ data.label }}</span>
                  <span class="text-gray-400 font-400 text-[14px]" v-if="data.children?.length">{{
                    `(${data.children?.length})`
                  }}</span>
                </div>
              </template>
            </el-tree-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="curentType === 'add'">
        <el-col :span="12">
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="用户性别" prop="">
            <el-select v-model="form.sex" placeholder="请选择性别" class="w-full">
              <el-option
                v-for="item in dictStore.dict('sys_user_sex')"
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
              <el-radio
                v-for="(item, index) in dictStore.dict('sys_normal_disable')"
                :label="item.dictValue"
                size="large"
                :key="index"
                >{{ item.dictLabel }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位" prop="">
            <el-select v-model="form.postIds" multiple class="w-full" placeholder="请选择岗位">
              <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
                :disabled="item.status === '1'"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="">
            <el-select v-model="form.roleIds" class="w-full" multiple placeholder="请选择角色">
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.status === '1'"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入"></el-input>
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
import { getUser, SysUser } from '@/api/system/user'
import type { SysRole } from '@/api/system/role'
import type { SysPost } from '@/api/system/post'
import { useDictStore } from '@/store/dict'
import type { SysDeptTree } from '@/api/system/dept'

const dictStore = useDictStore()

const prop = defineProps<{
  deptTree: SysDeptTree[]
}>()

let loading = ref<boolean>(false)
const showModal = ref<boolean>(false)
let form = ref<SysUser>({})
let postOptions = ref<SysPost[]>([])
let roleOptions = ref<SysRole[]>([])
const ruleFormRef = ref<FormInstance>()
const rules = reactive<any>({
  nickName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
  userName: [{ required: true, message: '用户账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['confirm', 'cancel'])

let curentType = ref<'add' | 'update'>('add')
const show = (data: SysUser, type: 'add' | 'update') => {
  curentType.value = type
  showModal.value = true
  form.value = {}

  if (type === 'update') {
    loading.value = true
    getUser(data.userId!).then((res) => {
      form.value = res.data!
      postOptions.value = res.posts!
      roleOptions.value = res.roles!
      form.value.postIds = res.postIds
      form.value.roleIds = res.roleIds
    }).finally(() => {
      loading.value = false
    })
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

const selectorItemHandle = (depts: SysDeptTree[]) => {
  const childHandle = (items: SysDeptTree[]): TreeSelectorItem[] => {
    const data: TreeSelectorItem[] = []
    for (const item of items) {
      const thisItem: TreeSelectorItem = {
        value: Number(item.id),
        label: item.label
      }
      data.push(thisItem)
      if (item.children) {
        thisItem.children = childHandle(item.children)
      }
    }
    return data
  }
  return childHandle(depts)
}

defineExpose({
  show
})
</script>
