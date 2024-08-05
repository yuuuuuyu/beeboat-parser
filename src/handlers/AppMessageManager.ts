import { BTPAppMessageBoxManager } from 'beeboat-plus'
import { ElMessage } from 'element-plus'

export default class AppMessageManager extends BTPAppMessageBoxManager {
    message(options) {
        // TODO: 你重写的逻辑
        ElMessage(options)
    }
    messageBox(options) {
        console.log(options)
    }
    notification(options) {
        console.log(options)
    }
}
