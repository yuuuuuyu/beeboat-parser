<template>
    <el-dropdown split-button type="primary" @click="onCommandClick('')" @command="onCommandClick">
        发布
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="buildJenkins"> 虚机构建</el-dropdown-item>
                <el-dropdown-item command="buildSonar">sonar扫描</el-dropdown-item>
                <el-dropdown-item command="dockerBuild">容器构建</el-dropdown-item>
                <el-dropdown-item command="dockerDeploy">容器部署</el-dropdown-item>
                <el-dropdown-item command="syncdata">数据同步</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <DockerBuildDialog ref="dockerBuildDialogRef" @execute="onExecute"></DockerBuildDialog>
    <DockerDeployDialog ref="dockerDeployDialogRef"></DockerDeployDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { OpenApiApi, ServiceResourceApi } from '@/api/index'
import DockerBuildDialog from './docker-build-dialog.vue'
import DockerDeployDialog from './docker-deploy-dialog.vue'

const emits = defineEmits(['execute'])

const route = useRoute()
const dockerBuildDialogRef = ref()
const dockerDeployDialogRef = ref()

const onExecute = (type, data) => {
    emits('execute', type, data)
}

const onCommandClick = async command => {
    const tagId = dayjs().format('HH:mm:ss')
    const params = {
        serviceId: route.params?.serviceId || '-1',
        branchId: route.params?.branchId || '-1',
        solutionId: route.params?.solutionId || '-1',
        pushGit: 1,
        runJenkins: 0,
        syncData: 0,
        rows: {},
        tagId: `发布日志_${tagId}`,
    } as any

    if (command === '') {
        ServiceResourceApi.deployService(params).then(res => {
            emits('execute', 'PublishLog', res.data.publishLog)
        })
        return
    }
    if (command == 'syncdata') {
        params.pushGit = 0
        params.runJenkins = 0
        params.syncData = 1
        params.tagId = `数据同步日志_${tagId}`
        ServiceResourceApi.deployService(params).then(res => {
            emits('execute', 'PublishLog', res.data.publishLog)
        })
        return
    }
    if (command == 'buildJenkins') {
        params.resourceMode = 'VM'
        params.version = new Date().getTime()
        params.tagId = `虚机构建日志_${tagId}`
        OpenApiApi.build(params, true).then(res => {
            emits('execute', 'BuildLog', res.data.buildLog)
        })
        return
    }
    if (command == 'buildSonar') {
        params.resourceMode = 'VM'
        params.tagId = `Sonar扫描日志_${tagId}`
        OpenApiApi.buildSonar(params, true).then(res => {
            emits('execute', 'BuildLog', res.data.buildLog)
        })
        return
    }

    if (command == 'dockerBuild') {
        dockerBuildDialogRef.value.openDialog()
        return
    }
    if (command == 'dockerDeploy') {
        dockerDeployDialogRef.value.openDialog()
        return
    }
}
</script>
