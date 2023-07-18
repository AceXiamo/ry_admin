import { h, render } from "vue";
import IconSelector from './index.vue'
import { appContext } from "@/core/context";

const show = (x: number, y: number, callBack: (prefix: string, iconName: string) => void, onClose: () => void) => {
  const div = document.createElement('div')
  const vNode = h(IconSelector, {
    x: x,
    y: y,
    onClose: () => {
      setTimeout(() => {
        onClose()
        div.remove()
      }, 300)
    },
    callBack: callBack
  })
  vNode.appContext = appContext
  render(vNode, div)

  document.body.appendChild(div)
}

export { show }
