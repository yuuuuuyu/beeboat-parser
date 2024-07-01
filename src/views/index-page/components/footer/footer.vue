<template>
    <div class="btd-logger">
        <FooterMessage v-show="!state.logVisible">
            <el-button style="float: right" class="btd-logger-close" @click="onOpen" text>
                日志窗口
            </el-button>
        </FooterMessage>
        <div class="btd-logger--drawer" ref="loggerDrawerRef" v-show="state.logVisible">
            <FooterLogPanel
                ref="footerLogPanelRef"
                @close="state.logVisible = false"
            ></FooterLogPanel>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import FooterMessage from './footer-message.vue'
import FooterLogPanel from './footer-log-panel.vue'

const footerLogPanelRef = ref()

const state = reactive({
    logVisible: false,
})

const onOpen = () => {
    state.logVisible = true
}
/**
 * 点击发布、构建、部署等按钮
 */
const refresh = (type, data) => {
    onOpen()
    footerLogPanelRef.value.refresh(type, data)
}
defineExpose({
    refresh,
})
</script>
<style lang="scss" scoped>
.btd-logger {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: #fff;
}
.btd-logger--drawer {
    width: 100%;
    padding: 0 2px;
}
</style>
