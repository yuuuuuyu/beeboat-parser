<template>
    <div class="btd-index">
        <BtdMenu></BtdMenu>
        <div class="btd-content">
            <BtdHeader @execute="onDeployBarExecute"></BtdHeader>
            <div class="btd-solution-content">
                <BtdSubMenu v-show="showSubMenu()"></BtdSubMenu>
                <div class="bt-page">
                    <router-view class="btd-view"></router-view>
                </div>
            </div>
            <BtdFooter ref="messageFooterRef"></BtdFooter>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BtdMenu from './components/menu.vue'
import BtdSubMenu from './components/submenu/submenu.vue'
import BtdHeader from './components/header.vue'
import BtdFooter from './components/footer/footer.vue'

const route = useRoute()
const messageFooterRef = ref()

const showSubMenu = () => {
    return route.fullPath.indexOf('/projects/') != -1
}

/**
 * 点击发布部署等按钮事件
 */
const onDeployBarExecute = (type, data) => {
    messageFooterRef.value.refresh(type, data)
}
</script>
