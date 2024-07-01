<template>
    <div ref="loggerDrawerRef" class="btd-log-panel" :style="{ height: state.height + 'px' }">
        <div class="btd-log-panel-title" @mousedown="onMouseDown">
            <p>日志窗口</p>
            <div>
                <el-button link title="最小化日志窗口" @click="onMinusClick">
                    <el-icon><Minus></Minus></el-icon>
                </el-button>
            </div>
        </div>
        <div class="btd-log-panel-content">
            <el-tabs
                v-model="state.typeTabActiveId"
                class="btd-log-tabs"
                type="border-card"
                tab-position="left"
                @tab-click="onTabClick"
            >
                <el-tab-pane name="PublishLog">
                    <template #label>
                        <el-icon title="发布日志"><Promotion></Promotion></el-icon>
                    </template>
                    <PublishLogPanel
                        ref="publishLogRef"
                        :style="{ height: state.height - 58 + 'px' }"
                        @click="onLogClick"
                    ></PublishLogPanel>
                </el-tab-pane>
                <el-tab-pane name="BuildLog">
                    <template #label>
                        <el-icon title="构建日志"><Coordinate></Coordinate></el-icon>
                    </template>
                    <BuildLogPanel
                        ref="buildLogRef"
                        :style="{ height: state.height - 58 + 'px' }"
                        @click="onLogClick"
                    ></BuildLogPanel>
                </el-tab-pane>
                <el-tab-pane name="DeployLog">
                    <template #label>
                        <el-icon title="K8S部署日志"><Histogram></Histogram></el-icon>
                    </template>
                    <DeployLogPanel
                        ref="deployLogRef"
                        :style="{ height: state.height - 58 + 'px' }"
                        @click="onLogClick"
                    ></DeployLogPanel>
                </el-tab-pane>
                <el-tab-pane name="ServiceLog">
                    <template #label>
                        <el-icon title="服务器运行日志"><Crop></Crop></el-icon>
                    </template>

                    <ServiceLogPanel
                        ref="serviceLogRef"
                        :style="{ height: state.height - 58 + 'px' }"
                        @click="onLogClick"
                        @reload="onServiceLogReload"
                    ></ServiceLogPanel>
                </el-tab-pane>
            </el-tabs>
            <el-tabs
                v-model="state.activeLogId"
                class="btd-log-panel-logtabs"
                editable
                type="border-card"
                tab-position="top"
                @tab-remove="onLogTabClick"
            >
                <el-tab-pane
                    v-for="item in state.buildLogList"
                    :key="item.id"
                    :label="item.buildName"
                    :name="item.id"
                    style="width: 100%; overflow: hidden"
                    :style="{ height: state.height - 60 + 'px' }"
                >
                    <template #label>
                        <div>{{ item.buildName }}</div>
                    </template>
                    <LoginPanel :data="item"> </LoginPanel>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import LoginPanel from './log-data-panel.vue'
import PublishLogPanel from './publish-log-panel.vue'
import BuildLogPanel from './build-log-panel.vue'
import DeployLogPanel from './deploy-log-panel.vue'
import ServiceLogPanel from './service-log-panel.vue'

const emits = defineEmits(['close'])

const publishLogRef = ref()
const buildLogRef = ref()
const deployLogRef = ref()
const serviceLogRef = ref()
const loggerDrawerRef = ref()

const state = reactive({
    typeTabActiveId: null,
    height: 300,
    startY: 0,
    startHeight: 0,
    buildLogList: [],
    activeLogId: null,
})

const onTabClick = activeName => {
    if (activeName.props.name == 'BuildLog') {
        buildLogRef.value.loadData()
    }
    if (activeName.props.name == 'DeployLog') {
        deployLogRef.value.loadData()
    }
    if (activeName.props.name == 'ServiceLog') {
        serviceLogRef.value.loadData()
    }
    if (activeName.props.name == 'PublishLog') {
        publishLogRef.value.loadData()
    }
}

const onLogClick = item => {
    state.activeLogId = item.id
    const addedList = state.buildLogList.filter(data => {
        return data.id == item.id
    })
    if (addedList.length > 0) {
        return
    }
    state.buildLogList.push(item)
}
const onServiceLogReload = item => {
    const addedList = state.buildLogList.filter(data => {
        return data.id == item.id
    })
    if (addedList.length > 0) {
        addedList[0].seconds = item.seconds
    }
}

const onLogTabClick = paneId => {
    state.buildLogList = state.buildLogList.filter(data => {
        return data.id != paneId
    })
    if (state.activeLogId == paneId && state.buildLogList.length > 0) {
        state.activeLogId = state.buildLogList[state.buildLogList.length - 1].id
    }
}

const onMinusClick = () => {
    emits('close')
}

const onMouseDown = event => {
    state.startY = event.clientY
    state.startHeight = loggerDrawerRef.value.offsetHeight
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = event => {
    state.height = state.startHeight - (event.clientY - state.startY)
}

const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}
const refresh = (type, data) => {
    console.log(type, data)
    state.typeTabActiveId = type
    if (type == 'BuildLog') {
        buildLogRef.value.loadData(data)
    }
    if (type == 'DeployLog') {
        deployLogRef.value.loadData(data)
    }
    if (type == 'ServiceLog') {
        serviceLogRef.value.loadData(data)
    }
    if (type == 'PublishLog') {
        publishLogRef.value.loadData(data)
    }
}
defineExpose({
    refresh,
})
</script>
<style lang="scss" scoped>
.btd-log-panel {
    display: flex;
    flex-direction: column;
    height: 300px;
    border-color: #e5e7eb;
    border-width: 1px;
    .btd-log-panel-title {
        display: flex;
        padding: 2px 4px;
        cursor: ns-resize;
        p {
            flex: 1;
        }
    }
    .btd-log-panel-content {
        display: flex;
        flex: 1;
    }
    .btd-log-tabs {
        width: 300px;
        height: 100%;
        border-bottom: 0;
        border-left: 0;
        :deep(.el-tabs__header) {
            margin-right: 0;
        }
        :deep(.el-tabs__content) {
            padding: 0;
        }
        :deep(.el-tabs__item) {
            height: 30px;
            padding: 0 8px;
        }
    }
    .btd-log-panel-logtabs {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: calc(100% - 270px);
        height: 100%;
        border: 0;
        :deep(.el-tabs__content) {
            position: relative;
            flex: 1;
            height: 100%;
            padding: 0;
            overflow: hidden;
        }
        :deep(.el-tabs__item) {
            height: auto;
            padding-top: 4px;
            padding-bottom: 4px;
        }
        :deep(.el-tabs__new-tab) {
            display: none;
        }
    }
    .btd-log-panel-logtabs:has(.el-tab-pane) {
        border-top: 1px solid var(--el-border-color-light);
    }
}
</style>
