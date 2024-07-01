<template>
    <div style="display: flex; width: 100%; height: 100%">
        <div
            style="
                width: 30px;
                margin-right: 4px;
                text-align: center;
                border-right: 1px solid var(--el-border-color-light);
            "
        >
            <div>
                <el-button style="padding: 5px; border-radius: 0" @click="clearLogClick($event)">
                    <el-icon title="清空"><Delete></Delete></el-icon>
                </el-button>
            </div>
            <div>
                <el-button
                    style="padding: 5px; border-radius: 0"
                    :type="state.autoScroll ? 'primary' : ''"
                    @click="autoScrollClick($event)"
                >
                    <el-icon title="滚动到底部"><Bottom></Bottom></el-icon>
                </el-button>
            </div>
        </div>
        <VirtList ref="virtListScrollRef" itemKey="id" :list="state.items" @scroll="onLogScroll">
            <template #default="{ itemData }">
                <pre>{{ itemData.message }}</pre>
            </template>
        </VirtList>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import short from 'short-uuid'
import { VirtList } from 'vue-virt-list'
import { createWebsocketClient } from '@/utils/websocket-utils'
import { BTPApplication } from 'beeboat-plus'

interface IProps {
    data: any
}
const props = defineProps<IProps>()
const virtListScrollRef = ref()
const state = reactive({
    autoScroll: true,
    items: [],
    socket: null,
    socketTimeInterval: null,
})

watch(
    () => props.data,
    () => {
        initWebsocket()
    },
    {
        immediate: false,
        deep: true,
    },
)

const initWebsocket = () => {
    releaseSocket()
    state.items = []
    const token = BTPApplication.getInstance().getToken()
    const domainUrl = BTPApplication.getInstance().getEnv('VITE_PROXY_DOMAIN_REAL')

    let socketUrl = ''
    if (props.data.dataType == 'PublishLog') {
        socketUrl = getPublishLogUrl(token, domainUrl, 'message')
    }
    if (props.data.dataType == 'BuildLog') {
        socketUrl = getBuildLogUrl(token, domainUrl, 'message')
    }
    if (props.data.dataType == 'ServiceLog') {
        socketUrl = getServiceLogUrl(token, domainUrl, 'message')
    }

    createWebsocketClient(state, socketUrl, (msg: any) => {
        const data = JSON.parse(msg.data)
        data.id = short.generate() + new Date().getTime()
        state.items.push(data)
        if (state.autoScroll) {
            virtListScrollRef.value.scrollToBottom()
        }
    })
}

const getPublishLogUrl = (token, domainUrl, serviceCode) => {
    return `${domainUrl}${serviceCode}/ws-publish-log/${token}/${props.data.id}`
}

const getBuildLogUrl = (token, domainUrl, serviceCode) => {
    return `${domainUrl}${serviceCode}/ws-build-log/${token}/${props.data.id}`
}

const getServiceLogUrl = (token, domainUrl, serviceCode) => {
    return `${domainUrl}${serviceCode}/ws-pod-log/${token}/${props.data.namespace}/${
        props.data.podName
    }/${props.data.seconds || 60}`
}

const clearLogClick = $event => {
    state.items = []
    $event.target.blur()
}
const autoScrollClick = $event => {
    state.autoScroll = !state.autoScroll
    $event.target.blur()
}
onMounted(() => {
    if (props.data.dataType == 'DeployLog') {
        const data = {
            id: short.generate() + new Date().getTime(),
            message: props.data.deployStatus == 'success' ? '部署成功' : props.data.errMsg,
        }
        state.items.push(data)
    } else {
        initWebsocket()
    }
})
onUnmounted(() => {
    releaseSocket()
})
const releaseSocket = () => {
    state.items = []
    if (state.socket) {
        state.socket.close()
    }
    if (state.socketTimeInterval) {
        clearInterval(state.socketTimeInterval)
    }
}
const onLogScroll = event => {
    //
}
</script>
