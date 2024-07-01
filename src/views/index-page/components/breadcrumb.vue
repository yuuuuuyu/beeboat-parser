<template>
    <el-breadcrumb separator="/" v-if="!isFlag">
        <el-breadcrumb-item v-for="item in list" :key="item['name']">
            {{ item['meta']['title'] }}
        </el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/" v-else>
        <el-breadcrumb-item>
            <el-dropdown @command="switchCustomer">
                <span class="el-dropdown-link">
                    {{ customerEntity?.name }}
                    <el-icon v-show="customerEntity?.name"> <ArrowDown></ArrowDown> </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="item in states.customerList"
                            :key="item.id"
                            :command="item"
                        >
                            {{ item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <el-dropdown @command="switchSolution">
                <span class="el-dropdown-link">
                    {{ solutionEntity?.name }}
                    <el-icon v-show="solutionEntity?.name"> <ArrowDown></ArrowDown> </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="item in states.solutionList"
                            :key="item.id"
                            :command="item"
                        >
                            {{ item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <el-dropdown @command="switchService">
                <span class="el-dropdown-link">
                    {{ serviceEntity?.name }}
                    <el-icon v-show="serviceEntity?.name"> <ArrowDown></ArrowDown> </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="item in states.serviceList"
                            :key="item.id"
                            :command="item"
                        >
                            {{ item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import { CustomerApi, ServiceObjectApi } from '@/api/index'

import { UseGlobalStore } from '@/store/modules/global'
import { UseDesignerStore } from '@/store/index'

const route = useRoute()
const router = useRouter()
const store = UseGlobalStore()
const designerStore = UseDesignerStore()
// api 接口
const states = reactive({
    customerList: [], // 客户列表
    solutionList: [], // 项目列表
    serviceList: [], // 服务列表
})
const customerEntity = ref({ name: '请选择客户', id: '-1' })
const solutionEntity = ref({ name: '请选择项目', id: '-1' })
const serviceEntity = ref({ name: '请选择服务', id: '-1', serviceType: null })

const customerFun = async id => {
    const customerData = await CustomerApi.list()
    states.customerList = customerData.data || []
    const data = states.customerList.find(item => item.id == id)
    if (data) {
        customerEntity.value = data
    } else {
        customerEntity.value = { name: '请选择客户', id: '-1' }
    }
}

const solutionFun = async id => {
    const solutionData = await ServiceObjectApi.listUserSolutionService({
        customerId: route.params?.customerId,
    })
    states.solutionList = solutionData.data || []
    const data = states.solutionList.find(item => item.id == id)
    if (data) {
        solutionEntity.value = data
        // 此接口同步获取服务列表
        states.serviceList = toRaw(data.children)
        // 刷新时匹配数据
        if (route.params.serviceId != '-1') {
            serviceEntity.value = states.serviceList.find(
                item => item.id == route.params?.serviceId,
            )
            store.setServiceType(serviceEntity.value.serviceType)
        } else {
            serviceEntity.value = { name: '请选择服务', id: '-1', serviceType: null }
        }
    } else {
        solutionEntity.value = { name: '请选择项目', id: '-1' }
        serviceEntity.value = { name: '请选择服务', id: '-1', serviceType: null }
    }
}

/** 初始执行的api */
const initApi = async () => {
    // 企业客户列表
    if (route.params?.customerId) {
        await customerFun(route.params.customerId)
    } else {
        states.customerList = []
        customerEntity.value = { name: '请选择项目', id: '-1' }
    }
    // 项目列表/服务列表
    if (route.params?.solutionId && route.params?.customerId != '-1') {
        await solutionFun(route.params.solutionId)
    } else {
        states.solutionList = []
        states.serviceList = []
        solutionEntity.value = { name: '请选择项目', id: '-1' }
        serviceEntity.value = { name: '请选择服务', id: '-1', serviceType: null }
    }
}

let isFlag = ref(true)
//返回当前路由的面包屑列表
const getBreadcrumbList = () => {
    isFlag.value = route.params?.customerId ? true : false
    initApi()
    return route.matched.filter((_val, index) => index > 0)
}

let list = ref<RouteLocationMatched[]>()
watch(
    () => route.fullPath,
    val => {
        list.value = getBreadcrumbList()
        if (val.split('/-1').length == 3) {
            // 仅customer
            store.setServiceType(null)
        } else if (val.split('/-1').length == 2) {
            store.setServiceType(9999)
        }
    },
    {
        immediate: true,
    },
)

const switchCustomer = async command => {
    initApi()
    if (command.id != customerEntity.value.id) {
        customerEntity.value = command
        solutionEntity.value = { name: '请选择项目', id: '-1' }
        serviceEntity.value = { name: '请选择服务', id: '-1', serviceType: null }
        store.setServiceType(null)
        designerStore.clearBranchId()
        router.push(
            `/projects/${customerEntity.value.id}/${solutionEntity.value.id}/${serviceEntity.value.id}/-1`,
        )
        // 切换customer时清空之前查询的项目数组以及服务数组
        states.solutionList = []
        states.serviceList = []
    }
}
const switchSolution = command => {
    solutionEntity.value = command
    serviceEntity.value = { name: '请选择服务', id: '-1', serviceType: null }
    store.setServiceType(9999)
    designerStore.clearBranchId()
    router.push(
        `/projects/${customerEntity.value.id}/${solutionEntity.value.id}/${serviceEntity.value.id}/-1`,
    )
}

const switchService = command => {
    if (command.id != serviceEntity.value.id) {
        serviceEntity.value = command
        store.setServiceType(serviceEntity.value.serviceType)

        router.push(
            `/projects/${customerEntity.value.id}/${solutionEntity.value.id}/${
                serviceEntity.value.id
            }/${designerStore.getBranchId(
                `${customerEntity.value.id}-${solutionEntity.value.id}`,
            )}`,
        )
    }
}
</script>
