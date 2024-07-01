import { defineStore, StoreDefinition } from 'pinia'

/**
 * 设计器服务状态管理对象
 */
export const UseDesignerStore: StoreDefinition<string, any> = defineStore('designerStore', {
    persist: {
        enable: true,
    },
    state: (): any => ({
        //当前分支版本号
        branchInfoList: [],
    }),
    getters: {},
    actions: {
        /**
         * 切换项目时清空分支信息
         */
        clearBranchId() {
            this.branchInfoList = []
        },
        /**
         * 设置版本号标识
         * @param branchId 版本号标识
         */
        setBranchId(branchInfo: Object) {
            const existingBranchInfo = this.branchInfoList.find(
                (info: any) => info.cpInfo === branchInfo.cpInfo,
            )
            if (!existingBranchInfo) {
                this.branchInfoList.push(branchInfo)
            } else {
                existingBranchInfo.branchId = branchInfo.branchId
            }
        },
        /**
         * 获取版本号标识
         * @returns 版本号标识
         */
        getBranchId(cpInfo: string): string {
            for (const branchInfo of this.branchInfoList) {
                if (branchInfo.cpInfo === cpInfo) {
                    return branchInfo.branchId
                }
            }
            return `-1`
        },
    },
})
