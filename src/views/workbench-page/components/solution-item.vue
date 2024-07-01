<template>
    <div class="solution-item" @click="onSolutionClick">
        <div class="solution-item--title">{{ props.solutionData?.name }}</div>
        <div class="solution-item--content"></div>
        <div class="solution-item--footer">
            <div>
                <el-icon :size="16">
                    <User></User>
                </el-icon>
                {{ props.solutionData?.creatorName }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UseGlobalStore } from '@/store/modules/global'
import { UseDesignerStore } from '@/store/index'

const designerStore = UseDesignerStore()
const store = UseGlobalStore()
interface IProps {
    title?: any
    solutionData: any
}
const props = withDefaults(defineProps<IProps>(), {})
const router = useRouter()
const onSolutionClick = () => {
    store.setServiceType(9999)
    designerStore.clearBranchId()
    router.push(`/projects/${props.solutionData.customerId}/${props.solutionData.id}/-1/-1`)
}
</script>
<style lang="scss" scoped>
.solution-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100px;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    background-color: aliceblue;
    border-radius: 5px;
    .solution-item--title {
        font-weight: bold;
    }

    .solution-item--content {
        flex: 1;
    }

    .solution-item--footer {
        border-top: 1px solid #4285f4;
    }
}
</style>
