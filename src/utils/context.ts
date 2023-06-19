import type { App, AppContext } from 'vue'

let appContext: AppContext

const setAppContext = (app: App<Element>) => {
  appContext = app._context
}

export { appContext, setAppContext }
