<template>
    <div style="display: flex; height: 24px">
        <div style="display: flex; flex: 1; align-items: center; padding-left: 8px">
            <el-icon><Bell></Bell></el-icon>
            <div style="flex: 1; margin-left: 8px">
                <el-carousel :interval="5000" height="24px" direction="vertical" :autoplay="true">
                    <el-carousel-item v-for="item in state.dataList" :key="item.id">
                        {{ item.msgContent }}
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { MessageApi } from '@/api/index'

const state = reactive({
    //消息列表
    dataList: [],
})

/**
 * 加载消息数据
 */
const onLoadMessageData = () => {
    MessageApi.list({ messageType: 'MESSAGE', readed: 0 }, true).then(res => {
        state.dataList = res.data
    })
}
onLoadMessageData()
setInterval(function () {
    onLoadMessageData()
}, 60000)
</script>
