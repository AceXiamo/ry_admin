import { createVNode, render } from "vue";
import FullLoading from './index.vue'

const show = (time: number | string) => {
  const container = document.createElement('div')
  const vNode = createVNode(FullLoading, {
    time, hasInAnimate: false, close: () => {
      setTimeout(() => {
        container.remove()
      }, 300)
    }
  })
  render(vNode, container)
  document.body.appendChild(container)
}

export default { show }
