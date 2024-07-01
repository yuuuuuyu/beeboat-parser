<template>
    <el-dropdown class="bt-avatar" trigger="click">
        <img class="bt-avatar--image" :src="props.imageUrl" alt="" />
        <!--用户下拉菜单-->
        <template v-slot:dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in props.commands" :key="item.command">
                    <el-button text @click="onCommandClick(item.command)">
                        <em class="bt-avatar--command__icon" :class="item.icon"></em>
                        <span class="bt-avatar--command__title">{{ item.title }}</span>
                    </el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
interface IProps {
    imageUrl?: string
    commands?: any
}
const props = withDefaults(defineProps<IProps>(), {})
const emits = defineEmits(['ItemClick'])

const pageData = reactive({
    dialogVisible: false,
    previewImageData: '',
})
const onCommandClick = command => {
    pageData.dialogVisible = !pageData.dialogVisible
    emits('ItemClick', command)
}
</script>
<style lang="scss">
.bt-avatar {
    width: 28px;
    height: 28px;
    .el-dropdown--small {
        width: 100%;
        height: 100%;
    }
    .bt-avatar--image {
        width: 100%;
        height: 100%;
    }
}
.bt-avatar--command__icon {
    display: inherit;
}
.bt-avatar--command__title {
    margin-left: 5px;
}
</style>
