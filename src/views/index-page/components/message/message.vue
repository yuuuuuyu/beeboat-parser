<template>
    <el-badge :value="state.messageCount" :hidden="state.messageCount == 0">
        <em
            class="bt-icon bt-icon-notice"
            style="
                margin-left: 8px;
                font-size: 24px;
                font-weight: bold;
                color: var(--el-color-primary);
            "
            @click="state.noticeDrawerVisible = true"
        ></em>
    </el-badge>
    <el-drawer
        size="600px"
        modal-class="message-drawer"
        v-model="state.noticeDrawerVisible"
        title="通知"
    >
        <template #header>
            <div style="padding: 12px; padding-bottom: 0">
                <el-tabs v-model="state.messageType" @tab-click="onTabClick">
                    <el-tab-pane label="通知" name="NOTICE">
                        <template #label>
                            <el-badge :value="state.messageCount" :hidden="state.messageCount == 0">
                                通知
                            </el-badge>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </template>
        <NoticePanel
            v-if="state.messageType == 'NOTICE'"
            :status="state.noticeDrawerVisible"
        ></NoticePanel>
    </el-drawer>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import NoticePanel from './message/notice-panel.vue'

const state = reactive({
    noticeDrawerVisible: false,
    messageType: 'NOTICE',
    messageCount: 0,
    popoverNotice: false,
    noticeInstance: null,
})
const onTabClick = _tab => {
    state.popoverNotice = false
}
</script>
<style lang="scss">
.message-drawer {
    .el-drawer__header {
        padding: 0;
        margin-bottom: 0;
    }
    .el-tabs__header {
        margin: 0;
    }
    .el-drawer__body {
        padding: 0;
    }
}
</style>
<style lang="scss" scoped>
.msg-row {
    position: relative;
    // height: 76px;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
}
.msg-row-content {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.msg-row-wrap {
    position: relative;
    flex: 1;
}
.msg-row-msgcontent {
    position: relative;
    flex: 1;
    width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.msg-row:hover {
    background: #f4f4f5;
}
</style>
