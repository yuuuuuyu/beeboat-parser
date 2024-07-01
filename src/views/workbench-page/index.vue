<template>
    <div>
        <div class="workbench-page">
            <div class="workbench-page-left">
                <el-card class="bt-card workbench-page-left--item solution-box">
                    <template #header>
                        <div class="card-header">
                            <span>我的项目</span>
                        </div>
                    </template>
                    <div class="solution-panel">
                        <btp-button type="secondary">新建项目</btp-button>
                        <SolutionItem
                            v-for="item in pageData.solutionList"
                            :key="item.id"
                            :solutionData="item"
                        ></SolutionItem>
                    </div>
                </el-card>
                <el-card class="bt-card workbench-page-left--item">
                    <template #header>
                        <div class="card-header">
                            <span>我的贡献</span>
                        </div>
                    </template>
                    <CodeCalendar></CodeCalendar>
                </el-card>
            </div>
            <el-card class="bt-card workbench-page-task-box">
                <template #header>
                    <div class="card-header">
                        <span>我的任务</span>
                    </div>
                </template>
                <div></div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import SolutionItem from './components/solution-item.vue'
import CodeCalendar from './components/code-calendar.vue'
import { ServiceObjectApi } from '@/api/index'

const pageData = reactive({
    solutionList: [],
})
ServiceObjectApi.listUserSolutionService({}).then(res => {
    pageData.solutionList = res.data
})
</script>
<style lang="scss" scoped>
@import './index';
</style>
