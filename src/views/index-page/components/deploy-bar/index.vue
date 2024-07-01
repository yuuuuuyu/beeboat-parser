<template>
    <div
        class="btd-header--deploy-bar"
        v-show="route.params.serviceId && route.params.serviceId != '-1'"
    >
        <el-space>
            <el-select
                v-model="pageData.currentSprintId"
                placeholder="请先选择分支"
                @change="changeSprintList"
            >
                <el-option
                    v-for="item in pageData.sprintList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <BtdActionBar @execute="onExecute"></BtdActionBar>
            <BtdPreviewBar></BtdPreviewBar>
        </el-space>
    </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UseDesignerStore } from '@/store/index'
import { SprintApi } from '@/api/index'
import BtdActionBar from './action/action.vue'
import BtdPreviewBar from './preview/index.vue'

const emits = defineEmits(['execute'])
const router = useRouter()
const route = useRoute()
const designerStore = UseDesignerStore()

const pageData = reactive({
    currentSprintId: '',
    sprintList: [],
})

const onExecute = (type, data) => {
    emits('execute', type, data)
}

/**
 * 加载多分支版本数据
 */
const loadSprintConfig = () => {
    pageData.sprintList = []
    if (route.params?.solutionId) {
        SprintApi.list({ solutionId: route.params.solutionId }, true).then(res => {
            pageData.sprintList = res.data
            if (pageData.sprintList?.length > 0) {
                if (
                    designerStore.getBranchId(
                        `${route.params.customerId}-${route.params.solutionId}`,
                    ) == -1
                ) {
                    // 默认选开发分支
                    const developBranch = pageData.sprintList.find(sprint => sprint.isDefault)
                    if (developBranch) {
                        pageData.currentSprintId = developBranch.id
                    } else {
                        pageData.currentSprintId = pageData.sprintList[0].id
                    }

                    // branchId和项目、服务进行匹配
                    designerStore.setBranchId({
                        cpInfo: `${route.params.customerId}-${route.params.solutionId}`,
                        branchId: pageData.currentSprintId,
                    })
                } else {
                    pageData.currentSprintId = designerStore.getBranchId(
                        `${route.params.customerId}-${route.params.solutionId}`,
                    )
                }
            }
        })
    } else {
        pageData.currentSprintId = ''
    }
}
const changeSprintList = val => {
    designerStore.setBranchId({
        cpInfo: `${route.params.customerId}-${route.params.solutionId}`,
        branchId: val,
    })
    router.push(
        `/projects/${route.params.customerId}/${route.params.solutionId}/${route.params.serviceId}/${val}`,
    )
}

watch(
    () => route.params.solutionId,
    () => {
        loadSprintConfig()
    },
    { immediate: true, deep: true },
)
</script>
