import { BTPHttpCreateHandler, BTPUtils } from 'beeboat-plus'

export default class HttpCreateHandler extends BTPHttpCreateHandler {
    /**
     * 全局拦截开关
     * 开启后异常拦截并使用message弹出消息，如需自定义消息提醒可以设置为false，然后使用catch处理
     */
    enabledGlobalIntercept = false

    initRespInterceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.response.use(
            response => {
                const { data, config } = response

                try {
                    //文件请求,直接返回原始响应数据
                    if (config?.responseType == 'blob' || config?.responseType == 'arraybuffer') {
                        return response
                    }
                    const code = data.code.toString()

                    if (code === '0') {
                        return data
                    }
                    // 拦截非0响应
                    // 登录过期
                    if (this.isAuthExpired(data)) {
                        BTPUtils.message({
                            message: data.msg || data.stackMsg,
                            type: 'warning',
                        })
                        this.getApp().logout()
                        return this.reject(
                            response,
                            data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        )
                    }
                    // 如果未启用了全局拦截则抛出异常由用户自己catch处理
                    if (this.enabledGlobalIntercept) {
                        // 启用全局拦截由beeboat-plus提供拦截
                        BTPUtils.message({
                            message: data.msg || data.stackMsg,
                            type: 'error',
                        })
                        return this.reject(
                            response,
                            data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        )
                    }
                    return this.reject(
                        response,
                        data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                    )
                } catch (error) {
                    return this.reject(error, '请求出错')
                }
            },
            error => {
                return this.reject(error, '请求出错')
            },
        )
    }

    /**
     * 重写 BTPHttpCreateHandler 的reject方法，自定义Promise拒绝
     * @param response
     * @param message
     * @returns Promise
     */
    reject(response: any, message: string): Promise<any> {
        return Promise.reject({
            ...response,
            msg: message,
        })
    }
}
