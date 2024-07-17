import { BTPHttpCreateHandler } from 'beeboat-plus'

export default class HttpCreateHandler extends BTPHttpCreateHandler {
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
                    // TODO 登录超时
                    // '用户未登录' = 130001,'操作未授权' = 130002,'数据未授权' = 130003,'用户登录过期' = 13004,'token' = 13005,

                    if (code != '130004') {
                        return Promise.reject({
                            ...response,
                            msg: data.msg || data.stackMsg || '网络异常',
                        })
                    }
                } catch (error) {
                    const code = data.code.toString()
                    if (code != '130004') {
                        return Promise.reject({
                            ...response,
                            msg: data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        })
                    }
                }
            },
            error => {
                // TODO 处理重复请求
                return Promise.reject({
                    ...error,
                    msg: error.statusText || '网络异常',
                })
            },
        )
    }
}
