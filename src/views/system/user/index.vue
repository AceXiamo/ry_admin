<template>
  <div class="flex-auto flex p-[20px] gap-[20px]">
    <div class="flex flex-col w-[200px] gap-[20px]">
      <el-input type="text" placeholder="请输入部门名称"></el-input>
      <el-tree :data="deptTree" :props="defaultProps" @node-click="handleNodeClick" default-expand-all />
    </div>
    <div class="flex-auto flex flex-col w-0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户账号">
          <el-input v-model="formInline.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="formInline.nickName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择" clearable>
            <el-option label="正常" :value="0" />
            <el-option label="停用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search(1, formInline.pageSize)">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            <span class="ml-[5px]">查询</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="flex">
        <el-button type="primary" plain size="small">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span class="ml-[5px]">新增</span>
        </el-button>
        <el-button type="success" plain size="small">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          <span class="ml-[5px]">修改</span>
        </el-button>
        <el-button type="danger" plain size="small">
          <font-awesome-icon :icon="['fas', 'trash']" />
          <span class="ml-[5px]">删除</span>
        </el-button>
      </div>
      <el-table :data="tableData.rows" class="w-full mt-[20px]" border size="small" v-loading="loading">
        <el-table-column prop="userName" label="用户账号" width="120" />
        <el-table-column prop="nickName" label="用户姓名" width="120" />
        <el-table-column prop="deptName" label="部门" width="100" />
        <el-table-column prop="deptName" label="已绑定门店">
          <template #default="scope">
            <div class="flex flex-col gap-[5px]">
              <el-tag
                class="flex-none w-max"
                size="small"
                v-for="(data, index) in scope.row.bindStore ? scope.row.bindStore.split(',') : []"
                :key="index"
                closable
                @close="removeStoreBind(scope.row, data.split('_')[1])"
              >
                <div style="display: inline; max-width: 290px; overflow: hidden; text-overflow: ellipsis">
                  {{ data.split('_')[0] }}
                </div>
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="状态" width="60">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250">
          <template #default>
            <div class="flex flex-nowrap gap-[10px]">
              <el-link type="primary" size="small">
                <font-awesome-icon :icon="['fas', 'store']" class="text-[12px]" />
                <span class="text-[12px] ml-[5px]">绑定门店</span>
              </el-link>
              <el-link type="primary" size="small">
                <font-awesome-icon :icon="['fas', 'edit']" class="text-[12px]" />
                <span class="text-[12px] ml-[5px]">修改</span>
              </el-link>
              <RemoveButton>
                <el-link type="primary" size="small">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                  <span class="text-[12px] ml-[5px]">删除</span>
                </el-link>
              </RemoveButton>
              <el-link type="primary" size="small">
                <font-awesome-icon :icon="['fas', 'arrows-up-down-left-right']" />
                <span class="text-[12px] ml-[5px]">更多</span>
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="sizes, prev, pager, next, jumper"
        :total="tableData.total || 0"
        class="mt-4"
        @current-change="search($event, formInline.pageSize)"
        @size-change="search(1 ,$event)"
      />
    </div>
  </div>

  <ViewAndEdit ref="viewAndEdit" />
</template>

<script lang="ts" setup name="User">
import { ref, onMounted } from 'vue'
import { SysDept, treeselect } from '@/api/system/dept'
import { SysUser, SysUserQuery, listUser } from '@/api/system/user'
import RemoveButton from '@/components/RemoveButton.vue'
import ViewAndEdit from './components/ViewAndEdit.vue'

let formInline = ref<SysUserQuery>({
  pageNum: 1,
  pageSize: 10
})

let deptTree = ref<SysDept[]>([])
let tableData = ref<ResponsePageData<SysUser[]>>({})
let dateRange = ref<any>()
let loading = ref<boolean>(false)
const viewAndEdit = ref()

onMounted(() => {
  loadTreeData()
  search()
})

const loadTreeData = () => {
  treeselect().then((res) => {
    deptTree.value = res.data!
  })
}

const search = (pageNum?: number, pageSize?: number) => {
  if (pageNum) formInline.value.pageNum = pageNum
  if (pageSize) formInline.value.pageSize = pageSize
  
  loading.value = true
  listUser(formInline.value)
    .then((res) => {
      tableData.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleNodeClick = (data: SysDept) => {
  console.log(data)
}

const handleStatusChange = (row: SysUser) => {}

const removeStoreBind = (row: SysUser, storeId: string) => {}
</script>
