import { createApp } from 'vue'
import { setAppContext } from './core/context'
import { createPinia } from 'pinia'
import router from '@/router'

// unocss
import 'virtual:uno.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
library.add(far)
library.add(fab)

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// animate.css
import 'animate.css';

import App from './App.vue'
import './css/base.less'
import '@/utils/permission.ts'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.mount('#app')
setAppContext(app)
