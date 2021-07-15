<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>其他功能</el-breadcrumb-item>
                <el-breadcrumb-item>图表/地图</el-breadcrumb-item>
                <el-breadcrumb-item>图表使用</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <div id="chart1" style="height: 700px;"></div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted } from 'vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
        // 初始化图表
        function initchart1(){
            const myChart = echarts.init(document.getElementById('chart1'));
            myChart.setOption({
                title: {
                    text: 'ECharts示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
        onMounted(()=>{
            initchart1()
        })
    },
})
</script>
