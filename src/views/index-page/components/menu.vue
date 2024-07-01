<template>
    <div class="btd-menu">
        <div class="btd-menu--logo">
            <img :src="logoUrl" @click="onRootViewClick" alt="" />
        </div>
        <div class="btd-menu--content">
            <el-scrollbar>
                <el-menu
                    class="btd-menu-item"
                    :default-active="route.name.toString()"
                    :collapse="true"
                    @select="jumpToMenu"
                >
                    <template v-for="item in menuTree" :key="item.name">
                        <BtdMenuItem v-if="item.type == 1" :menuItem="item"></BtdMenuItem>
                    </template>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { BTPApplication } from 'beeboat-plus'
import BtdMenuItem from './menu-item.vue'
import LogoPng from '@/assets/images/logo.png'

/**
 * 转换为网络地址
 * @param relativePath 文件的相对路径
 * @returns 返回网络地址
 */
const loadSite = relativePath => {
    return new URL(relativePath, import.meta.url)
}

const route = useRoute()
const logoUrl = loadSite(LogoPng).href
let menuTree = BTPApplication.getInstance().getCacheManager().getMenuTreeList()

const jumpToMenu = name => {
    BTPApplication.getInstance().$router.push({ name: name })
}

const onRootViewClick = () => {
    if (BTPApplication.getInstance().isMicroApp()) {
        const microApp = (window as any).microApp
        microApp.dispatch({
            dataType: 'route',
            params: { path: '/' },
        })
    } else {
        BTPApplication.getInstance().$router.push({ path: '/workbench' })
    }
}
</script>
