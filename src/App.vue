<template>
    <el-config-provider size="small">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts" setup>
import beeTheme from 'beeboat-ui/es/bee-theme'
beeTheme.start()
</script>
