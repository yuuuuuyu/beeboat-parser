import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import BeeboatPlus, { BTPApplication } from 'beeboat-plus'
import DynamicView from './beeboat-plus/view/bt-view.vue'

// 自定义handlers
import HttpCreateHandler from '@/beeboat-plus/handlers/HttpCreateHandler'

import '@/styles/index.scss'

import list from './views/register'
class UserApplication extends BTPApplication {
    constructor(options) {
        super(options)
        this.appManager.layoutView = DynamicView
        list.forEach(item => {
            item.page && this.appManager.registerPage(item.name, item.page)
            item.context && this.appManager.registerViewContext(item.name, item.context)
        })
    }
}

function initApp() {
    fetch('./config/globalconfig.json')
        .then(response => response.json())
        .then(async data => {
            document.title = data['VITE_APP_TITLE']
            const application = new UserApplication({
                appTemplate: App,
                env: data,
                componentKit: [ElementPlus, BeeboatPlus],
            })
            await application.init()
            application.registerHandlers([new HttpCreateHandler()])

            application.mount()
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                application.$app.component(key, component)
            }
        })
}
initApp()
