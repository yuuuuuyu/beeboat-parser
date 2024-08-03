import JSEncrypt from 'jsencrypt'
import { ElMessageBox } from 'element-plus'

import { BTPViewContext, BTPApplication } from 'beeboat-plus'

export default class LoginViewContext extends BTPViewContext {
    executeAction(executor): void {
        if (executor.isEvent('click', 'Login')) {
            const formRef = this.getRef('loginFormRef')

            formRef.validate(_valid => {
                this.onLoginClick()
            })
        }
    }
    async onLoginClick() {
        const secret = await BTPApplication.getInstance()
            .getHttp()
            .post(`systemService/security/account/getCaptchaAndKey`, {})
        if (secret.data?.publicKey) {
            const crypto = new JSEncrypt()
            crypto.setPublicKey(secret.data.publicKey)
            const passwordEncrypt = crypto.encrypt(this.dataModel.loginForm.password)
            const seed = secret.data.seed

            BTPApplication.getInstance()
                .getHttp()
                .post(`systemService/security/account/login`, {
                    seed: seed,
                    account: this.dataModel.loginForm.account,
                    password: passwordEncrypt,
                })
                .then(res => {
                    const result = res.data.userToken
                    if (result) {
                        BTPApplication.getInstance().setToken(result.id)
                    }
                    BTPApplication.getInstance().$router.push('/')
                })
                .catch(err => {
                    ElMessageBox.alert(err.msg, '错误', { type: 'error' })
                })
        } else {
            ElMessageBox.alert('获取公钥异常', '错误', { type: 'error' })
        }
    }
}
