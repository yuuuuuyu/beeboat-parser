import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import 'beeboat-ui/theme/css/index.css'
import 'beeboat-plus/theme/css/index.css'

import '@/styles/index.scss'

import IndexPage from './views/index-page/index.vue'
import WorkbenchPage from './views/workbench-page/index.vue'

import LoginViewContext from '@/extends/login-view-context'
import OvdView from '@/extends/ovd-view.vue'
import DynamicView from './beeboat-plus/view/bt-view.vue'

import BeeboatPlus, { BTPApplication } from 'beeboat-plus'

class UserApplication extends BTPApplication {
    constructor(options) {
        super(options)
        this.appManager.layoutView = DynamicView
        this.appManager.registerViewContext('LoginPage', LoginViewContext)
        this.appManager.registerPage('OvdView', OvdView)
        this.appManager.registerPage('IndexPage', IndexPage)
        this.appManager.registerPage('WorkbenchPage', WorkbenchPage)
        //
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
            application.mount()
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                application.$app.component(key, component)
            }
        })
}
initApp()
