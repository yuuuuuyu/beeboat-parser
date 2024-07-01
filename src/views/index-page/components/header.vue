<template>
    <el-header class="btd-header">
        <div class="btd-header__title">
            <div class="btd-header__title__icon">
                <em class="bt-icon bt-icon-collapse"></em>
            </div>
            <btd-breadcrumb></btd-breadcrumb>
        </div>
        <el-space>
            <BtdDeployBar @execute="onDeployBarExecute"></BtdDeployBar>
            <!--用户信息-->
            3333
            <BtdUserAvatar
                :image-url="state.imageUrl"
                @item-click="onUserItemClick"
                :commands="state.commands"
            ></BtdUserAvatar>
            <div style="margin-left: -10px; cursor: pointer">
                <MessageDrawer></MessageDrawer>
                <el-badge :value="0" :hidden="true">
                    <em
                        title="查看文档和升级日志"
                        class="bt-icon bt-icon-kefu"
                        style="font-size: 24px; font-weight: bold; color: var(--el-color-primary)"
                        @click="onServiceClick"
                    ></em>
                </el-badge>
                <el-badge :value="0" :hidden="true">
                    <el-icon
                        title="打开论坛"
                        style="
                            margin-top: 6px;
                            margin-left: 4px;
                            font-size: 24px;
                            font-weight: bold;
                            color: var(--el-color-primary);
                        "
                        @click="onDiscuzClick"
                    >
                        <QuestionFilled></QuestionFilled>
                    </el-icon>
                </el-badge>
            </div>
            <BtModifyPassword v-model:value="state.showModifyPassword"></BtModifyPassword>
        </el-space>
    </el-header>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { BTPApplication } from 'beeboat-plus'
import MessageDrawer from './message/message.vue'
import BtdBreadcrumb from './breadcrumb.vue'
import BtdDeployBar from './deploy-bar/index.vue'
import BtdUserAvatar from './user-avatar.vue'
import BtModifyPassword from './modify-password.vue'

import { DiscuzApi } from '@/api/index'

const emits = defineEmits(['execute'])

const state = reactive({
    imageUrl: '',
    dialogVisible: false,
    showModifyPassword: false,
    commands: [
        {
            command: 'modifypassword',
            title: '修改密码',
            icon: 'bt-icon bt-icon-lock',
        },
        {
            command: 'logout',
            title: '退出登录',
            icon: 'bt-icon bt-icon-logout',
        },
    ],
})
const onUserItemClick = command => {
    if (command == 'logout') {
        BTPApplication.getInstance().removeToken()
        BTPApplication.getInstance().$router.push('/login')
    }
    if (command == 'modifypassword') {
        state.showModifyPassword = true
    }
}
/**
 * 点击服务超链接
 */
const onServiceClick = () => {
    window.open('http://beet-docs.hive-df.com/docs/change-log/', '_blank', 'noopener')
}

const onDiscuzClick = () => {
    DiscuzApi.redirect()
}
/**
 * 点击发布部署等按钮事件
 */
const onDeployBarExecute = (type, data) => {
    emits('execute', type, data)
}
</script>
