<template>
    <div class="index">
        <Breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>其他功能</el-breadcrumb-item>
                <el-breadcrumb-item>图表/地图</el-breadcrumb-item>
                <el-breadcrumb-item>地图使用</el-breadcrumb-item>
            </el-breadcrumb>
        </Breadcrumb>
        <el-card class="box-card" shadow="hover">
            <div id="mapDiv" style="height: 700px;margin-bottom:15px;"></div>
            <el-button @click="addPoint" type="primary">点击按钮向地图中增加点</el-button>
        </el-card>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
        // 初始化地图
        let map = null  // 地图对象
        function initMap(){
            map = new T.Map('mapDiv');  // 创建地图
            map.centerAndZoom(new T.LngLat(116.40969, 39.89945), 12);
        }
        // 添加点
        function addPoint(){
            let marker = new T.Marker(new T.LngLat(116.411794, 39.9068));   //创建标注对象
            map.addOverLay(marker); //向地图上添加标注
        }
        
        onMounted(()=>{
            initMap()
        })
        return { addPoint }
    },
})
</script>
