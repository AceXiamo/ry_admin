<template>
  <el-dialog v-model="showModal" title="菜单编辑" width="40%" :close-on-press-escape="canEscClose">
    <el-form ref="ruleFormRef" :model="form" label-width="100px" :rules="rules" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <el-tree-select
              v-model="form.parentId"
              :data="selectorItemHandle(menus)"
              placeholder="请选择"
              clearable
              :check-strictly="true"
              :render-after-expand="false"
              class="w-full"
            >
              <template #default="{ data }: { data: SelectorItem }">
                <div class="flex gap-[3px]">
                  <span class="text-gray-600 font-400 text-[14px]">{{ data.label }}</span>
                  <span class="text-gray-400 font-400 text-[14px]" v-if="data.children!.length > 0">{{
                    `(${data.children!.length})`
                  }}</span>
                </div>
              </template>
            </el-tree-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.menuType" class="ml-4">
              <el-radio label="M" size="large">目录</el-radio>
              <el-radio label="C" size="large">菜单</el-radio>
              <el-radio label="F" size="large">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="form.menuType !== 'F'">
          <el-form-item label="菜单图标">
            <div
              class="h-[30px] w-full border-gray-300 border-solid border-1 rounded cursor-pointer flex items-center gap-[5px] px-10px"
              @click="showIconSelector"
            >
              <template v-if="form.icon">
                <font-awesome-icon
                  v-if="form.icon?.indexOf('#') !== -1"
                  :icon="[form.icon?.split('#')[0], form.icon?.split('#')[1]]"
                  :class="[`text-gray-400 text-14px`, `hover:text-blue-500`]"
                />
                <span class="text-[13px] text-gray-500">{{ form.icon }}</span>
              </template>
              <template v-else>
                <span class="text-[13px] text-gray-400">请选择图标</span>
              </template>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input v-model="form.orderNum" type="number" placeholder="请输入显示排序" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.menuType !== 'F'">
        <el-col :span="12">
          <el-form-item label="是否外链" prop="isFrame">
            <el-radio-group v-model="form.isFrame" class="ml-4">
              <el-radio label="0" size="large">是</el-radio>
              <el-radio label="1" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 菜单 -->
      <el-row v-if="form.menuType === 'C'">
        <el-col :span="12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" placeholder="请输入组件路径" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限字符" prop="perms">
            <el-input v-model="form.perms" placeholder="请输入权限字符" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.menuType === 'C'">
        <el-col :span="12">
          <el-form-item label="路由参数" prop="query">
            <el-input v-model="form.query" placeholder="请输入路由参数" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存" prop="isCache">
            <el-radio-group v-model="form.isCache" class="ml-4">
              <el-radio label="0" size="large">是</el-radio>
              <el-radio label="1" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="form.menuType !== 'F'">
        <el-col :span="12">
          <el-form-item label="显示状态" prop="visible">
            <el-radio-group v-model="form.visible" class="ml-4">
              <el-radio label="0" size="large">显示</el-radio>
              <el-radio label="1" size="large">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="form.status" class="ml-4">
              <el-radio label="0" size="large">显示</el-radio>
              <el-radio label="1" size="large">隐藏</el-radio>
            </el-radio-group>
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
import { getMenu, Menu } from '@/api/system/menu'
import * as IconSelector from './IconSelector'

const prop = defineProps<{
  menus: Menu[]
}>()

let loading = ref<boolean>(false)
let canEscClose = ref<boolean>(true)
const showModal = ref<boolean>(false)
let form = ref<Menu>({
  menuId: '',
  parentId: '',
  menuType: 'M',
  icon: 'fas#home'
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<any>({
  menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
  orderNum: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }],
  path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['confirm', 'cancel'])

type SelectorItem = {
  value?: string
  label?: string
  children?: SelectorItem[]
}

const selectorItemHandle = (menus: Menu[]) => {
  const res: SelectorItem[] = []
  const root: SelectorItem = {
    value: '0',
    label: '主目录',
    children: []
  }
  res.push(root)

  const childHandle = (items: Menu[]): SelectorItem[] => {
    const data: SelectorItem[] = []
    for (const item of items) {
      if (item.menuType !== 'F') {
        const thisItem: SelectorItem = {
          value: item.menuId,
          label: item.menuName
        }
        data.push(thisItem)
        if (item.children) {
          thisItem.children = childHandle(item.children)
        }
      }
    }
    return data
  }
  root.children = childHandle(menus)
  return res
}

let curentType = ref<'add' | 'update'>('add')
const show = (data: Menu, type: 'add' | 'update') => {
  curentType.value = type

  showModal.value = true
  form.value = {
    menuId: ''
  }

  if (type === 'update') {
    // loading.value = true
    // getMenu(data.menuId).then((res) => {
    //   form.value = res.data
    // }).then(() => {
    //   loading.value = false
    // })
    form.value = JSON.parse(JSON.stringify(data))
  } else {
    form.value.parentId = data.menuId
  }
}

const cancel = () => {
  showModal.value = false
  emit('cancel')
}

const showIconSelector = (e: any) => {
  canEscClose.value = false

  const rect = e.target.getBoundingClientRect()
  IconSelector.show(
    rect.x,
    rect.y + rect.height + 10,
    (prefix: string, iconName: string) => {
      form.value.icon = `${prefix}#${iconName}`
    },
    () => {
      canEscClose.value = true
    }
  )
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
