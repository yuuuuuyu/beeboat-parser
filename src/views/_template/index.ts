import { BTPViewContext, BTPApplication } from 'beeboat-plus'

export default class LoginViewContext extends BTPViewContext {
    executeAction(eventName: any, item: any): void {
        // TODO
        const instance = BTPApplication.getInstance()
        console.log(instance, eventName, item)
    }
}
