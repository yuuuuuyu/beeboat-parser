<template>
    <div style="width: 100%; height: 100%; padding: 16px">
        <div style="margin-bottom: 16px">
            <el-button
                :type="state.messageStatus == 'unread' ? 'primary' : ''"
                @click="onUnReadClick"
            >
                未读
            </el-button>
            <el-button
                :type="state.messageStatus == 'unread' ? '' : 'primary'"
                @click="onReadedClick"
            >
                已读
            </el-button>

            <el-button type="primary" @click="onMarkReadAllClick"> 全部已读 </el-button>
        </div>
        <el-scrollbar style="height: calc(100% - 50px)">
            <ul>
                <li
                    class="msg-row"
                    :class="{ active: state.activeId == item.id }"
                    v-for="item in state.dataList"
                    :key="item.id"
                    @click="state.activeId = item.id"
                >
                    <div class="msg-row-content">
                        <div style="display: flex; align-items: center">
                            <em
                                class="bt-icon bt-icon-jenkins"
                                style="
                                    width: 42px;
                                    font-size: 28px;
                                    font-weight: bold;
                                    color: var(--el-color-primary);
                                "
                            ></em>
                        </div>
                        <div class="msg-row-wrap">
                            <div style="display: flex; flex-direction: row; font-size: 13px">
                                <div style="flex: 1">{{ item.sendUserName }}</div>
                                <div>{{ item.sendDate }}</div>
                            </div>
                            <div style="display: flex; flex-direction: row">
                                <div class="msg-row-msgcontent" :title="item.msgContent">
                                    {{ item.msgContent }}
                                </div>
                                <div v-if="state.messageStatus == 'unread'">
                                    <el-button
                                        type="primary"
                                        link
                                        @click.stop="onMarkReadClick(item.id)"
                                    >
                                        已读
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { MessageApi } from '@/api/index'

const state = reactive({
    //消息列表
    dataList: [],
    //消息状态
    messageStatus: 'unread',
    activeId: null,
})
/**
 * 加载消息数据
 */
const onLoadMessageData = () => {
    MessageApi.list(
        { messageType: 'NOTICE', readed: state.messageStatus == 'readed' ? 1 : 0 },
        true,
    ).then(res => {
        state.dataList = res.data
    })
}
//初始化加载数据
onMounted(() => {
    onLoadMessageData()
})
/**
 * 标记消息已读
 */
const onMarkReadClick = messageId => {
    MessageApi.markMessageReaded({ id: [messageId] }, true).then(_res => {
        onLoadMessageData()
    })
}
/**
 * 标记消息已读
 */
const onMarkReadAllClick = () => {
    const messages = []
    state.dataList.forEach(item => {
        messages.push(item.id)
    })
    if (messages.length == 0) {
        return
    }
    MessageApi.markMessageReaded({ id: messages }, true).then(_res => {
        onLoadMessageData()
    })
}
const onReadedClick = () => {
    state.messageStatus = 'readed'
    onLoadMessageData()
}
const onUnReadClick = () => {
    state.messageStatus = 'unread'
    onLoadMessageData()
}
</script>
<style lang="scss" scoped>
.msg-row {
    position: relative;
    // height: 76px;
    padding: 12px;
    margin-bottom: 6px;
    border-radius: 4px;
    transition: all ease 0.5s;
    .msg-row-content {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
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
    &.active {
        background: #f4f4f5;
        transition: all ease 0.5s;
        .msg-row-content {
            .msg-row-msgcontent {
                overflow: auto;
                text-overflow: clip;
                white-space: wrap;
            }
        }
    }
    &:hover {
        background: #f4f4f5;
        transition: all ease 0.5s;
    }
}
</style>
