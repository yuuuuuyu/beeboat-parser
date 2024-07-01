<template>
    <div style="width: 100%; height: 100%">
        <el-scrollbar style="width: 100%; height: 100%">
            <ul>
                <li
                    class="msg-row"
                    :class="item.id == state.activeItemId ? 'active' : ''"
                    v-for="item in state.dataList"
                    :key="item.id"
                    @click="onRowClick(item)"
                >
                    <div
                        style="
                            display: flex;
                            flex: 1;
                            align-items: center;
                            padding-left: 8px;
                            font-size: 14px;
                        "
                        :title="item.podName"
                    >
                        {{ item.podIp }}
                    </div>
                    <el-select
                        v-model="item.seconds"
                        style="width: 100px"
                        size="small"
                        @change="onSecondsChange(item)"
                    >
                        <el-option label="最近30秒" value="30"></el-option>
                        <el-option label="最近60秒" value="60"></el-option>
                        <el-option label="最近5分钟" value="300"></el-option>
                        <el-option label="最近10分钟" value="600"></el-option>
                        <el-option label="最近1小时" value="3600"></el-option>
                    </el-select>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { OpenApiApi } from '@/api/index'
const emits = defineEmits(['click', 'reload'])
const route = useRoute()

const state = reactive({
    dataList: [],
    activeItemId: '',
})
/**
 * 加载数据
 */
const loadData = () => {
    OpenApiApi.listPod(
        {
            solutionId: route.params.solutionId,
            serviceId: route.params.serviceId,
            branchId: route.params.branchId,
            resourceType: 'service',
        },
        true,
    ).then(res => {
        res.data.forEach(item => {
            item.dataType = 'ServiceLog'
            item.id = item.podName
            item.buildName = item.podIp
            const oldData = state.dataList.filter(oldItem => {
                return oldItem.id == item.id
            }) as any
            if (oldData && oldData.length > 0) {
                item.seconds = oldData[0].seconds
            }
            item.seconds = item.seconds || '30'
        })
        state.dataList = res.data
    })
}
const onRowClick = item => {
    state.activeItemId = item.id
    emits('click', item)
}
const onSecondsChange = item => {
    emits('reload', item)
}
defineExpose({
    loadData,
})
</script>
<style lang="scss" scoped>
.msg-row {
    position: relative;
    display: flex;
    padding: 6px 12px;
}
.msg-row:hover,
.msg-row.active {
    background: #f4f4f5;
}
</style>
