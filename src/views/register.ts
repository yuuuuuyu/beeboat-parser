import IndexViewContext from './index/index'
import LoginViewContext from './login/index'
import LoginPage from './login/index.vue'

/**
 * 1. name: 被重写的页面名称，例如：LoginPage保持和蜂舟创建页面Code保持一致
 * 2. page: 重写的页面，如果页面没有被重写，则保持为null
 * 3. context: 重写的页面的上下文逻辑
 */
const list = [
    { name: 'LoginPage', page: LoginPage, context: LoginViewContext },
    { name: 'IndexPage', page: null, context: IndexViewContext },
]
export default list
