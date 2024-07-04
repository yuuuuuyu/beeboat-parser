<template>
    <el-config-provider size="small">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup>
import beeTheme from 'beeboat-plus/es/beeboat-theme'
beeTheme.start()
</script>
