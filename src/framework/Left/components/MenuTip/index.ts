import VueComponent from './MenuTip.vue'
import type { Menu } from '@/api/menu';
import { createVNode, render, VNode } from 'vue';
import { appContext } from '@/core/context';

export type Link = {
  name: string,
  ele: HTMLElement,
}

let link: Link[] = []

export const show = (menu: Menu, y: number, parentEle: HTMLElement, isRoot: boolean = false): any => {
  const container = document.createElement('div')
  if (isRoot) link = []

  if (link.findIndex(item => item.name === menu.name) < 0) link.push({
    name: menu.name,
    ele: container,
  })
  const vNode = createVNode(VueComponent, {
    menu: menu, link: link,
    closeSubMenu: () => {
      const index = link.findIndex(item => item.name === menu.name)
      if (index === link.length - 1) link.splice(index, 1)

      container.remove()
    }, y, parent: link[link.length - 1]
  })
  vNode.appContext = appContext
  render(vNode, container)
  container.style.position = 'absolute'
  container.style.top = y + 'px'
  if (isRoot) {
    container.style.left = '55px'
  } else {
    container.style.left = (link.length - 1) * 200 + 'px'
  }
  container.style.paddingLeft = '5px'
  parentEle.appendChild(container)
  return { vNode, container }
}
