<template>
    <el-scrollbar class="btd-submenu">
        <el-menu
            :default-active="route.name.toString()"
            @select="_jumpToMenu"
            :unique-opened="true"
        >
            <submenu-item
                v-for="routes in projectsRouters"
                :key="routes.name"
                :item="routes"
                :base-path="`${params}/${routes.path}`"
            ></submenu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BTPApplication } from 'beeboat-plus'
import SubmenuItem from './submenu-item.vue'
import { UseGlobalStore } from '@/store/modules/global'

const globalStore = UseGlobalStore()
const route = useRoute()

const params = ref(
    `/projects/${route.params.customerId || '-1'}/${route.params.solutionId || '-1'}/${
        route.params.serviceId || '-1'
    }`,
)

const _jumpToMenu = name => {
    BTPApplication.getInstance().$router.push({ name: name, params: route.params })
}

const projectsRouters = ref([])

const includesService = (serviceType, menu) => {
    if (!menu.serviceType) {
        return true
    }
    const result = menu.serviceType.split(',').includes(`${serviceType}`)
    return result
}

const formatMenuList = (menuList, serviceType) => {
    if (!menuList || menuList.length == 0) {
        return []
    }
    const filteredList = menuList.filter(item => {
        return includesService(serviceType, item)
    })
    filteredList.forEach(child => {
        child.children = formatMenuList(child.children, serviceType)
    })

    return filteredList
}

watch(
    () => globalStore.serviceType,
    val => {
        const menu = BTPApplication.getInstance()
            .getCacheManager()
            .getMenuTreeList()
            .find(item => item.id == 'ddb27ddbb5df429f9443722008775085')
        if (menu) {
            // 没有选择服务，展示”数据字典“”项目设置“菜单
            const serviceType = val ? val : '9999'
            projectsRouters.value = formatMenuList(
                JSON.parse(JSON.stringify(menu))?.children,
                serviceType,
            )
        }
    },
    {
        immediate: true,
    },
)
</script>
