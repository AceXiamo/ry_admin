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

  const dict = (dictType: string) => {
    if (!dictData.value[dictType]) {
      getDicts(dictType).then(res => {
        dictData.value[dictType] = res.data!
      })
    }
    return dictData.value[dictType]
  }

  return { dictData, dict, getDict }
})
