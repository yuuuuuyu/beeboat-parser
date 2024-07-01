import { defineStore, StoreDefinition } from 'pinia'
interface GlobalState {
    /** 主侧边栏是否显示 */
    siderShow: boolean
    serviceType: number | null
    /** 接口管理-接口入参下拉更新 */
    inParamUpdate: false
}

export const UseGlobalStore: StoreDefinition<string, any> = defineStore('globalStore', {
    state: (): GlobalState => ({
        siderShow: true,
        serviceType: null,
        inParamUpdate: false,
    }),
    getters: {},
    actions: {
        /** 切换主侧边栏显示状态 */
        toggleSiderShow() {
            this.siderShow = !this.siderShow
        },
        /** 设置服务类型 */
        setServiceType(type = null) {
            this.serviceType = type
        },
        /** 接口管理入参变化 */
        setInParamUpdate(update: boolean) {
            this.inParamUpdate = update
        },
    },
})
