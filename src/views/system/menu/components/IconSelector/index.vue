<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 z-[9999] animate-forwards" @click="closeSelector">
    <div
      :class="[`w-[600px] bg-white rounded-md flex flex-col p-[20px] gap-[10px] absolute shadow-2xl`, className]"
      :style="{ top: `${y}px`, left: `${x}px` }"
      @click.stop
    >
      <div class="flex items-center">
        <span class="text-gray-600 text-[14px]">图标分类</span>
        <el-radio-group v-model="currentIndex" class="ml-4" @change="indexChange">
          <el-radio :label="index" v-for="(item, index) in icons" :key="index">{{ item.prefix }} </el-radio>
        </el-radio-group>
      </div>
      <el-input v-model="iconName" placeholder="请输入" @input="searchValueChange"></el-input>
      <div
        class="overflow-y-auto border-1 border-solid border-gray-300 relative"
        :style="{ height: `${containerH}px` }"
        @scroll="scrollHandle"
        id="icon-viewer"
      >
        <div :style="{ height: `${virtualDomHeight}px`, paddingBottom: `${itemH}px` }">
          <div class="sticky top-0 left-0 right-0" :style="{ height: `${containerH}px` }">
            <div :class="[`grid grid-cols-5 max-h-full h-max relative`]" :style="{ top: `${topV}px` }">
              <div
                :class="[
                  `flex flex-col justify-center items-center gap-[10px] transition-all duration-200 cursor-pointer`,
                  `border-b-solid border-b-1 border-b-gray-200`,
                  `border-r-solid border-r-1 border-r-gray-200`
                ]"
                :style="{ height: `${itemH}px` }"
                v-for="(item, index) in virtualList"
                :key="index"
                @click="iconSelect(item)"
              >
                <font-awesome-icon
                  :icon="[icons[iconIndex].prefix, item]"
                  :class="[`text-gray-400 text-18px`, `hover:text-blue-500`]"
                />
                <span
                  :class="[`text-[12px] max-w-[80px] overflow-hidden text-gray-500 whitespace-nowrap text-ellipsis`]"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import type { IconPrefix } from '@fortawesome/fontawesome-common-types'

const prop = withDefaults(
  defineProps<{
    x: Number
    y: Number
    onClose: () => void
    callBack: (prefix: string, iconName: string) => void
  }>(),
  {}
)

type Icon = {
  prefix?: IconPrefix
  icons?: string[]
}

let iconName = ref<string>('')
// 容器高度
let containerH: number = 300,
  // 图标item高度
  itemH: number = 75,
  // 每行元素数量
  rowNum: number = 5
let icons = ref<Icon[]>([])
let currentIndex = ref<number>(0),
  iconIndex = ref<number>(0)
let virtualDomHeight = ref<number>(0)
let virtualList = ref<string[]>([])
let containerDom: Element | null = null
let topV = ref<number>(0)
let showIcons = ref<string[]>([])
let className = ref<string>('animate__animated animate__fadeIn animate__duration-300')
let listen = ref<any>(null)

onMounted(() => {
  containerDom = document.querySelector('#icon-viewer')
  indexChange(0)
  showIconHandle(0)
  listen.value = document.addEventListener('keydown', escHandle)
})

const escHandle = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeSelector()
  }
}

const closeSelector = () => {
  document.removeEventListener('keydown', escHandle)

  className.value = 'animate__animated animate__fadeOut animate__duration-300'
  prop.onClose()
}

const scrollHandle = (e: any) => {
  showIconHandle(e.target.scrollTop)
}

const searchValueChange = (value: string) => {
  if (value) {
    showIcons.value = icons.value[iconIndex.value]?.icons?.filter((item) => item.includes(value)) || []
  } else {
    showIcons.value = icons.value[iconIndex.value]?.icons || []
  }
  showIcons.value = Array.from(new Set(showIcons.value))
  showIconHandle(0)
}

let lastBegin = 0
const showIconHandle = (y: number) => {
  virtualDomHeight.value = (showIcons.value.length || 0) * 15
  let start = Math.floor(y / itemH) * rowNum
  let end = Math.floor((y + containerH) / itemH) * rowNum + 5

  lastBegin = start
  virtualList.value = showIcons.value.map((item, index) => item).slice(start, end) || []

  if (lastBegin === start) {
    topV.value = -y % itemH
  } else {
    topV.value = 0
  }
}

const indexChange = (e: any) => {
  virtualList.value = []
  iconIndex.value = e
  showIcons.value = iconName.value
    ? icons.value[e]?.icons?.filter((item) => item.includes(iconName.value)) || []
    : icons.value[e]?.icons || []
  // fontawesome 读的值存在重复元素，就很怪 😅
  showIcons.value = Array.from(new Set(showIcons.value))

  showIconHandle(0)
  containerDom?.scrollTo({
    top: 0
  })
}

const iconSelect = (iconName: string) => {
  prop.callBack(icons.value[iconIndex.value].prefix || '', iconName)
  closeSelector()
}

onBeforeMount(() => {
  const allIcons = {
    ...fas,
    ...fab,
    ...far
  }
  Object.keys(allIcons).forEach((iconName) => {
    const icon = allIcons[iconName]
    let iconType: Icon = icons.value.filter((item) => item.prefix === icon.prefix)[0]
    if (!iconType) {
      iconType = {
        prefix: icon.prefix,
        icons: []
      }
      iconType.icons?.push(icon.iconName)
      icons.value.push(iconType)
    } else {
      iconType.icons?.push(icon.iconName)
    }
  })
})
</script>
