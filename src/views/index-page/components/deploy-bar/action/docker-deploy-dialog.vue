<template>
    <el-dialog width="430px" title="容器部署" :append-to-body="true" v-model="state.dialogVisible">
        <el-form ref="formRef" :model="state.data" label-width="120px" label-position="top">
            <el-form-item label="镜像版本号" prop="imageVersion">
                <el-select
                    v-model="state.data.imageVersion"
                    placeholder="选择版本号"
                    @change="versionChange"
                >
                    <el-option
                        v-for="item in state.dockerVersion"
                        :key="item.version"
                        :value="item.version"
                        :label="item.version"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本描述">
                <el-input
                    v-model="state.data.imageVersionDesc"
                    type="textarea"
                    rows="3"
                    disabled="disabled"
                ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="onClick()"> 部署 </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { OpenApiApi } from '@/api/index'

const state = reactive({
    dialogVisible: false,
    dockerVersion: [] as any,
    data: {
        imageVersion: '',
        imageVersionDesc: '',
    },
})

const route = useRoute()
const formRef = ref()

const versionChange = imageVersion => {
    state.dockerVersion.filter(item => {
        if (item.version == imageVersion) {
            state.data.imageVersion = item.version
            state.data.imageVersionDesc = item.versionDesc
        }
    })
}

const onClick = () => {
    formRef.value.validate(valid => {
        if (valid) {
            const params = {
                serviceId: route.params?.serviceId || '-1',
                branchId: route.params?.branchId || '-1',
                solutionId: route.params?.solutionId || '-1',
                version: state.data.imageVersion,
                tagId: `容器部署日志_${dayjs().format('HH:mm:ss')}`,
            }
            OpenApiApi.deploy(params).then(() => {
                state.dialogVisible = false
            })
        }
    })
}

const openDialog = () => {
    state.dialogVisible = true
    state.data.imageVersion = ''
    state.data.imageVersionDesc = ''
    const params = {
        serviceId: route.params?.serviceId || '-1',
        branchId: route.params?.branchId || '-1',
        solutionId: route.params?.solutionId || '-1',
    }
    OpenApiApi.listVersion(params).then(res => {
        state.dockerVersion = res.data
    })
}

defineExpose({
    openDialog: openDialog,
})
</script>
