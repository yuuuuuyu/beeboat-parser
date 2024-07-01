<template>
    <template v-if="!props.item.children || props.item.children.length == 0">
        <el-menu-item :index="props.item.routeId || props.item.id">
            <em :class="['bt-icon', props.item.icon]"></em>
            <template #title>
                <div :style="getDivStyle" style="padding-left: 12px">
                    {{ props.item.name }}
                </div>
            </template>
        </el-menu-item>
    </template>
    <el-sub-menu v-else :index="props.item.routeId || props.item.id" popper-append-to-body>
        <template #title>
            <em :class="['bt-icon', props.item.icon]"></em>
            <span style="padding-left: 12px">
                {{ props.item.name }}
            </span>
        </template>
        <submenu-item
            v-for="child in props.item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
        ></submenu-item>
    </el-sub-menu>
</template>
<script lang="ts">
export default {
    name: 'SubmenuItem',
}
</script>
<script setup lang="ts">
import { PropType, computed, CSSProperties } from 'vue'

const props = defineProps({
    item: {
        type: Object as PropType<any>,
    },
    isNest: {
        type: Boolean,
        default: false,
    },
    basePath: {
        type: String,
        default: '',
    },
})

const getDivStyle = computed((): CSSProperties => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    }
})

function resolvePath(routePath: string) {
    return routePath || props.basePath
}
</script>
