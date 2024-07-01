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
                    <div style="flex: 1; padding-left: 8px; font-size: 14px">
                        <p>{{ item.name }}</p>
                    </div>
                    <div style="display: flex; align-items: center; font-size: 26px">
                        <el-icon v-if="item.status == 'success'" style="color: #67c23a">
                            <SuccessFilled></SuccessFilled>
                        </el-icon>
                        <el-icon v-else-if="item.status == 'fail'" style="color: #f56c6c">
                            <CircleCloseFilled></CircleCloseFilled>
                        </el-icon>
                        <el-icon v-else style="color: #909399">
                            <QuestionFilled></QuestionFilled>
                        </el-icon>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { PublishLogApi } from '@/api/index'

const emits = defineEmits(['click'])

const route = useRoute()

const state = reactive({
    dataList: [],
    activeItemId: '',
})
/**
 * 加载数据
 */
const loadData = data => {
    PublishLogApi.list({ serviceId: route.params.serviceId }, true).then(res => {
        let selection = null
        res.data.forEach(item => {
            item.dataType = 'PublishLog'
            item.buildName = item.name
            if (data && item.id == data.id) {
                selection = item
            }
        })
        state.dataList = res.data
        if (selection) {
            onRowClick(selection)
        }
    })
}

const onRowClick = item => {
    state.activeItemId = item.id
    emits('click', item)
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
