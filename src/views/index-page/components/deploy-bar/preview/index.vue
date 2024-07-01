<template>
    <el-popover
        placement="bottom"
        trigger="click"
        ref="removePopover"
        popper-class="el-popover-self"
    >
        <div class="buttonStyle">
            <el-button @click="frontButton">前端预览</el-button>
            <el-button @click="frontPreviewButton">容器预览</el-button>
        </div>
        <template #reference>
            <el-button @click="previceService" :loading="loadingFlag">预览</el-button>
        </template>
    </el-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ServiceResourceApi } from '@/api/index'

const removePopover = ref()
const loadingFlag = ref(false)
let addressDoubleMap = ref(null)

const route = useRoute()

const cancelRemove = () => {
    removePopover.value.hide()
}
const frontButton = () => {
    const { addressMap } = addressDoubleMap.value
    window.open(addressMap.front, '_blank')
    cancelRemove()
}

const frontPreviewButton = () => {
    const { addressMap } = addressDoubleMap.value
    window.open(addressMap.frontpreview, '_blank')
    cancelRemove()
}

const previceService = () => {
    loadingFlag.value = true
    ServiceResourceApi.previewService({
        serviceId: route.params?.serviceId || '-1',
        branchId: route.params?.branchId || '-1',
        solutionId: route.params?.solutionId || '-1',
    }).then(res => {
        addressDoubleMap.value = res.data
        const { addressMap } = res.data
        const keyList = Object.keys(addressMap)
        if (keyList.length === 1) {
            cancelRemove()
            window.open(addressMap[keyList[0]], '_blank')
        } else if (keyList.length === 2) {
            //
        } else {
            cancelRemove()
        }
        loadingFlag.value = false
    })
}
</script>
<style scoped lang="scss">
.buttonStyle {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    .el-button {
        margin: 5px auto;
    }
}
</style>
<style>
.el-popover-self {
    width: 100px !important;
    min-width: 100px !important;
}
</style>
