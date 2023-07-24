import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDicts, SysDictData } from '@/api/system/dict/data'

export const useDictStore = defineStore('dict', () => {
  const dictData = ref<any>({})

  const getDict = async (dictType: string) => {
    let data: SysDictData[] = dictData.value['dictType']
    if (!data) {
      const res = await getDicts(dictType)
      data = res.data!
      dictData.value[dictType] = data
    }
    return data
  }

  const use = (...dictType: string[]) => {
    dictType.forEach((key: string) => {
      getDict(key)
    })
  }

  return { dictData, getDict, use }
})
