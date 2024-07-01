import BTPBaseHTTPApi from './base-api'
import { ElMessage } from 'element-plus'

export class UserApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `systemService/organization/user`
    }

    static changePassword(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/changePassword`, params)
    }
}

export class AccountApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `systemService/security/account`
    }

    static getCaptchaAndKey(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/getCaptchaAndKey`, params)
    }
}

export class DiscuzApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `systemService/discuz`
    }

    static redirect(): void {
        this.post(`${this.getUrl()}/login`, {}).then(res => {
            if (res.code == 0) {
                window.open(
                    `${this.getBaseUrl()}/${this.getUrl()}/redirect?uid=${res.data}`,
                    '_blank',
                    'noopener',
                )
            } else {
                ElMessage({ type: 'warning', message: '跳转失败' })
            }
        })
    }
}

export class CustomerApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `designer/model/customer`
    }

    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
}

export class ServiceObjectApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `designer/model/serviceObject`
    }

    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }

    /**
     * 获取当前用户拥有项目和服务全部数据接口
     * @param params 参数
     * @returns 回调
     */
    static listUserSolutionService(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listUserSolutionService`, params)
    }
}

export class OpenApiApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `observe/resourceManage/openApi`
    }

    /**
     * 创建资源
     * @param params 参数
     * @returns 回调
     */
    static createResource(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/createResource`, params)
    }
    /**
     * 重新初始化资源
     * @param params 参数
     * @returns 回调
     */
    static reInitResource(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/reInitResource`, params)
    }
    /**
     * 构建
     * @param params 参数
     * @returns 回调
     */
    static build(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/build`, params)
    }
    /**
     * 部署
     * @param params 参数
     * @returns 回调
     */
    static deploy(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/deploy`, params)
    }
    /**
     * 查询构建日志
     * @param params 参数
     * @returns 回调
     */
    static buildLog(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/buildLog`, params)
    }
    /**
     * 查询部署日志
     * @param params 参数
     * @returns 回调
     */
    static deployLog(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/deployLog`, params)
    }
    /**
     * 查询运行日志
     * @param params 参数
     * @returns 回调
     */
    static runLog(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/runLog`, params)
    }
    /**
     * 查询版本列表
     * @param params 参数
     * @returns 回调
     */
    static listVersion(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listVersion`, params)
    }
    /**
     * 构建Sonar扫描
     * @param params 参数
     * @returns 回调
     */
    static buildSonar(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/buildSonar`, params)
    }
    /**
     * 查询K8S容器列表
     * @param params 参数
     * @returns 回调
     */
    static listPod(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listPod`, params)
    }
}

export class ServiceResourceApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `designer/model/serviceResource`
    }

    /**
     * 新建数据
     * @param params 参数
     * @returns 回调
     */
    static save(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/save`, params)
    }
    /**
     * 更新数据
     * @param params 参数
     * @returns 回调
     */
    static update(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/update`, params)
    }
    /**
     * 根据ID查询数据
     * @param params 参数
     * @returns 回调
     */
    static get(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/get`, params)
    }
    /**
     * 列表分页查询数据
     * @param params 参数
     * @returns 回调
     */
    static listPage(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listPage`, params)
    }
    /**
     * 构建发布
     * @param params 参数
     * @returns 回调
     */
    static deployService(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/deployService`, params)
    }
    /**
     * 服务预览
     * @param params 参数
     * @returns 回调
     */
    static previewService(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/previewService`, params)
    }
    /**
     * 初始化服务资源
     * @param params 参数
     * @returns 回调
     */
    static initResources(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/initResources`, params)
    }
    /**
     * 重新初始化服务资源
     * @param params 参数
     * @returns 回调
     */
    static reInitResources(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/reInitResources`, params)
    }
}

export class SprintApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `designer/model/sprint`
    }

    /**
     * 新建数据
     * @param params 参数
     * @returns 回调
     */
    static save(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/save`, params)
    }
    /**
     * 删除数据
     * @param params 参数
     * @returns 回调
     */
    static delete(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/delete`, params)
    }
    /**
     * 更新数据
     * @param params 参数
     * @returns 回调
     */
    static update(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/update`, params)
    }
    /**
     * 列表查询数据
     * @param params 参数
     * @returns 回调
     */
    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
    /**
     * 根据ID查询数据
     * @param params 参数
     * @returns 回调
     */
    static get(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/get`, params)
    }
    /**
     * 列表分页查询数据
     * @param params 参数
     * @returns 回调
     */
    static listPage(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listPage`, params)
    }
    /**
     * 查询分支数据
     * @param params 参数
     * @returns 回调
     */
    static dataByBranch(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/dataByBranch`, params)
    }
    /**
     * 保存分支数据
     * @param params 参数
     * @returns 回调
     */
    static saveBranchData(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/saveBranchData`, params)
    }
}

export class BuildLogApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `observe/record/buildLog`
    }

    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
}

export class DeployLogApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `observe/record/deployLog`
    }

    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
}

export class MessageApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `systemService/app/message`
    }

    /**
     * 列表查询数据
     * @param params 参数
     * @returns 回调
     */
    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
    /**
     * 列表分页查询
     * @param params 参数
     * @returns 回调
     */
    static listPage(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/listPage`, params)
    }
    /**
     * 标记消息为已读
     * @param params 参数
     * @returns 回调
     */
    static markMessageReaded(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/markMessageReaded`, params)
    }
}

export class PublishLogApi extends BTPBaseHTTPApi {
    /**
     * 获取请求根地址
     * @returns 地址
     */
    static getUrl(): string {
        return `observe/record/publishLog`
    }

    static list(params = {}, timestamp = false): Promise<any> {
        params = params || {}
        if (timestamp) {
            params['_t'] = Date.now()
        }
        return this.post(`${this.getUrl()}/list`, params)
    }
}
