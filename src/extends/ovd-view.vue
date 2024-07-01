<template>
    <div>
        11
        <component :is="remote" />
    </div>
</template>
<script setup lang="ts">
import * as Vue from 'vue'
import { shallowRef, defineAsyncComponent } from 'vue'
import { loadModule } from 'vue3-sfc-loader'

const remote = shallowRef()
const options = {
    moduleCache: {
        vue: Vue,
    },
    getFile() {
        return new Promise(resolve => {
            fetch('./mock/demo.vuedata')
                .then(response => {
                    return response.text()
                })
                .then(text => {
                    console.log(text)
                    resolve(text)
                })
        })
    },
    addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), {
            textContent,
        })
        const ref = document.head.getElementsByTagName('style')[0] || null
        document.head.insertBefore(style, ref)
    },
}
remote.value = defineAsyncComponent(() => loadModule('myComponent.vue', options))
</script>
