import { AxiosInstance } from 'axios'
import { BTPApplication } from 'beeboat-plus'

/**
 * @description 接口请求基类
 * @author Enmaai
 */
export default class BTPBaseHTTPApi {
    /**
     * @description 获取Http对象
     * @returns http对象
     */
    static getHttp(): AxiosInstance {
        return BTPApplication.getInstance().getHttp()
    }
    /**
     * @description GET请求
     * @param url 地址
     * @param params 参数
     * @returns 回调
     */
    static get(url: string, params = {}): Promise<any> {
        return this.getHttp().get(url, { params: params })
    }

    /**
     * @description POST请求
     * @param url 地址
     * @param params 参数
     * @param config 参数
     * @returns 回调
     */
    static post(url: string, params = {}, config = {}): Promise<any> {
        return this.getHttp().post(url, params, config)
    }

    static getBaseUrl(): string {
        return this.getHttp().options.baseURL
    }
}
