<template>
  <div class="p-[20px] flex flex-col">
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
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { listMenu, ListMenuQuery, Menu } from '@/api/system/menu'
import { reactive, ref, onMounted } from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const formInline = reactive<ListMenuQuery>({
  menuName: '',
  status: '',
})

const onSubmit = () => {
  console.log(formInline)
  console.log('submit!')
}

onMounted(() => {
  listMenu(formInline).then(res => {
    let data = tableDataHanlde(res.data, "0")
    console.log(data)
  })
})

const tableDataHanlde = (menus: Menu[], parentId: string) => {
  let tableData: Menu[] = []
  menus.forEach(menu => {
    if (menu.parentId === parentId) {

      tableDataHanlde(menus, menu.menuId)
    }
  })
  return tableData
}
</script>
