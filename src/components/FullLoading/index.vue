<template>
  <div :class="[
    `fixed top-0 bottom-0 left-0 right-0 bg-white z-[999] flex justify-center items-center`,
    `${currentClass}`
  ]">
    <div class="w-max flex flex-col gap-[10px]">
      <svg class="animate-spin h-10 w-10 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const prop = defineProps({
  timeout: {
    type: Number,
    default: 3000
  },
  hasInAnimate: {
    type: Boolean,
    default: true
  },
  close: {
    type: Function,
    default: () => { }
  }
})

let currentClass = ref<string>('')

onMounted(() => {
  if (prop.hasInAnimate)
    currentClass.value = 'animate-load-in'

  setTimeout(() => {
    currentClass.value = 'animate-load-out'
    prop.close()
  }, prop.timeout)
})
</script>

<style lang="less" scoped>
.animate-load-in {
  animation: aniIn 0.25s linear forwards;
}

.animate-load-out {
  animation: aniOut 0.25s linear forwards;
}

@keyframes aniIn {
  0% {
    opacity: 0;
    transform: translateY(-5%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes aniOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(5%);
  }
}
</style>
