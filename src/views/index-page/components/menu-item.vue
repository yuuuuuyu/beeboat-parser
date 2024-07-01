<template>
    <el-menu-item
        :key="props.menuItem.name"
        :index="props.menuItem.routeId"
        @click="menuCallback(props.menuItem.routeId)"
    >
        <template #default>
            <div class="menu-title">
                <i :class="props.menuItem.icon"></i>
                <span>{{ props.menuItem.name }}</span>
            </div>
        </template>
    </el-menu-item>
</template>
<script setup lang="ts">
import { BTPApplication } from 'beeboat-plus'

interface IProps {
    menuItem?: any
    basePath?: string
}
const props = withDefaults(defineProps<IProps>(), {})

const menuCallback = childPath => {
    // 存在基座应用
    if (BTPApplication.getInstance().isMicroApp())
        BTPApplication.getInstance().getMicroAppEvent().dispatch({
            childPath,
        })
}
</script>
<style lang="scss" scoped>
.menu-title {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 11px 0;
    font-size: 12px;
    text-align: center;
    .bt-icon {
        width: 20px;
        height: 20px;
        margin-left: 25px;
        font-size: 20px;
    }
}
</style>
