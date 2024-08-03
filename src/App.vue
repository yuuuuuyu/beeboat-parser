<template>
    <el-config-provider size="large" :locale="zhCn">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn'
import beeTheme from 'beeboat-plus/es/beeboat-theme/index'
beeTheme.start()
</script>
