<template>
    <el-dialog width="430px" title="容器构建" :append-to-body="true" v-model="state.dialogVisible">
        <el-form ref="formRef" :model="state.data" label-width="120px" label-position="top">
            <el-form-item
                label="镜像版本号"
                prop="imageVersion"
                :rules="[{ required: true, message: '镜像版本号必填', trigger: 'blur' }]"
            >
                <el-input v-model.trim="state.data.imageVersion"></el-input>
            </el-form-item>
            <el-form-item label="版本描述" prop="imageVersionDesc">
                <el-input v-model="state.data.imageVersionDesc" type="textarea" rows="3"></el-input>
            </el-form-item>
            <el-form-item label="构建工具平台" prop="platform">
                <el-select v-model="state.data.platform">
                    <el-option value="TEKTON" label="默认"></el-option>
                    <el-option value="JENKINS" label="JENKINS"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="onDockerBuildClick()"> 构建 </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { OpenApiApi } from '@/api/index'

const emits = defineEmits(['execute'])

const state = reactive({
    dialogVisible: false,
    data: {
        platform: 'TEKTON',
        imageVersion: '',
        imageVersionDesc: '',
    },
})

const route = useRoute()
const formRef = ref()

const onDockerBuildClick = () => {
    formRef.value.validate(valid => {
        if (valid) {
            const params = {
                serviceId: route.params?.serviceId || '-1',
                branchId: route.params?.branchId || '-1',
                solutionId: route.params?.solutionId || '-1',
                platform: state.data.platform,
                version: state.data.imageVersion,
                versionDesc: state.data.imageVersionDesc,
                tagId: `容器构建日志_${dayjs().format('HH:mm:ss')}`,
            }
            OpenApiApi.build(params, true).then(res => {
                state.dialogVisible = false
                emits('execute', 'BuildLog', res.data.buildLog)
            })
        }
    })
}

const openDialog = () => {
    state.dialogVisible = true
    state.data.imageVersion = ''
    state.data.imageVersionDesc = ''
}

defineExpose({
    openDialog: openDialog,
})
</script>
