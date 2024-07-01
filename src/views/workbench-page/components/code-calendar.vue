<template>
    <div style="width: 100%; height: 300px" ref="calendarDom"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const calendarDom = ref()

function getVirtulData(year: string) {
    let date = +echarts.number.parseDate(`${year}-01-01`)
    let end = +echarts.number.parseDate(`${+year + 1}-01-01`)
    let dayTime = 3600 * 24 * 1000
    let data: [string, number][] = []
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000),
        ])
    }
    return data
}

const option = {
    tooltip: {},
    visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
    },
    calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2022',
        itemStyle: {
            borderWidth: 0.5,
        },
        yearLabel: { show: true },
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtulData('2022'),
    },
}
onMounted(() => {
    const myChart = echarts.init(calendarDom.value)
    myChart.setOption(option)
})
</script>
