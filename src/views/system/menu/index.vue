<template>
  <div class="p-[20px] flex flex-col flex-auto flex">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="菜单名称">
        <el-input v-model="formInline.menuName" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="请选择" clearable>
          <el-option label="正常" :value="0" />
          <el-option label="停用" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="w-full h-0 flex-auto flex" v-loading="loading">
      <el-table :data="tableData" height="100%" style="width: 2000px" row-key="menuId" size="small" border>
        <el-table-column prop="menuName" label="菜单名称" />
        <el-table-column prop="icon" label="图标" width="200">
          <template #default="scope">
            <div class="flex items-center">
              <div v-if="scope.row.icon?.indexOf('#') !== -1" class="w-[25px]">
                <font-awesome-icon
                  :icon="[scope.row.icon?.split('#')[0], scope.row.icon?.split('#')[1]]"
                  :class="[`text-gray-400 text-14px`, `hover:text-blue-500`]"
                />
              </div>
              <div class="text-[13px] text-gray-500 w-[150px] truncate">{{ scope.row.icon }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" />
        <el-table-column prop="perms" label="权限标识" />
        <el-table-column prop="component" label="组件路径" width="250" />
        <el-table-column prop="visible" label="状态" width="70">
          <template #default="scope">
            <el-tag size="small" :type="scope.row.status == 0 ? '' : 'info'"
              >{{ scope.row.status == 0 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="170">
          <template #default="scope">
            <div class="flex gap-[10px]">
              <el-link type="primary" size="small" @click="showEdit(scope.row, 'update')">
                <font-awesome-icon :icon="['fas', 'edit']" class="text-[12px]" />
                <span class="text-[12px] ml-[5px]">修改</span>
              </el-link>

              <el-link type="primary" size="small" @click="showEdit(scope.row, 'add')">
                <font-awesome-icon :icon="['fas', 'add']" class="text-[12px]" />
                <span class="text-[12px] ml-[5px]">新增</span>
              </el-link>

              <RemoveButton @confirm="delHanlde(scope.row)">
                <el-link type="primary" size="small">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                  <span class="text-[12px] ml-[5px]">删除</span>
                </el-link>
              </RemoveButton>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <ViewAndEdit ref="viewAndEdit" :menus="tableData" @confirm="submitForm" />
</template>

<script setup lang="ts">
import { listMenu, ListMenuQuery, updateMenu, addMenu, Menu, delMenu } from '@/api/system/menu'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import ViewAndEdit from './components/ViewAndEdit.vue'
import RemoveButton from '@/components/RemoveButton.vue'

let tableData = ref<Menu[]>([])
let loading = ref<boolean>(false)
const viewAndEdit = ref()

let formInline = ref<ListMenuQuery>({
  menuName: '',
  status: ''
})

const onSubmit = () => {
  console.log(formInline)
  loadData()
}

onMounted(() => {
  loadData()
})

const loadData = () => {
  loading.value = true
  listMenu(formInline.value)
    .then((res) => {
      tableData.value = tableDataHandle(res.data!, '0')
    })
    .finally(() => {
      loading.value = false
    })
}

const tableDataHandle = (menus: Menu[], parentId: string) => {
  let data: Menu[] = []
  menus.forEach((menu) => {
    if (menu.parentId === parentId) {
      menu.children = tableDataHandle(menus, menu.menuId)
      data.push(menu)
    }
  })
  return data
}

const showEdit = (item: Menu, type: 'add' | 'update' | 'remove') => {
  if (type === 'remove') {
    // TODO
  } else {
    viewAndEdit.value.show(item, type)
  }
}

const submitForm = (item: Menu, type: 'add' | 'update') => {
  if (type === 'add') {
    addMenu(item).then(() => {
      ElMessage.success('新增成功')
      loadData()
    })
  } else if (type === 'update') {
    updateMenu(item).then(() => {
      ElMessage.success('修改成功')
      loadData()
    })
  }
}

const delHanlde = (row: Menu) => {
  delMenu(row.menuId).then(() => {
    ElMessage.success('删除成功')
    loadData()
  })
}
</script>
