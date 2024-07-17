import { BTPViewContext, BTPApplication } from 'beeboat-plus'

export default class LoginViewContext extends BTPViewContext {
    executeAction(executor: any): void {
        // TODO
        const instance = BTPApplication.getInstance()
        console.log(instance, executor)
    }
}
