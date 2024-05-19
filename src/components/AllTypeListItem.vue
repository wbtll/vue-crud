<template>

  <div class="div">
    <el-card   class="animate__animated animate__fadeInLeftBig">
      <insert-type></insert-type>
      <el-table  class="table" :data="dataSource">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="type" label="商品类型" width="120" />
        <el-table-column prop="" label="操作"  width="250">
          <template #default="{row}">
            <el-button    @click="getDetail(row.id)" >详情</el-button>
            <el-button   >编辑</el-button>
            <el-button   @click="deleteLine(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>
<script setup>
import {ref, onMounted, provide, } from "vue";
import axios from "axios"
import router from "@/router/index.js";

import InsertType from "@/components/ProductTypeListItemTable/insertType.vue";

const dataSource = ref([]);
const All = {
  value: null,
};

provide('All', All);

onMounted(()=>{
  All.value = fetch1
  fetch1();
})

const fetch1 = () =>{
  fetch(`http://localhost:9091/Type/selectAllType`)
      .then((response)=>response.json())
      .then((data)=>{
    console.log(data)
    dataSource.value = data
  }).catch((error)=>{
    console.log('error',error)
  })
}

const getDetail=(id)=>{
  router.push({
    path:'/Detail',
    query:{
      id:id
    }
  })
}

//删除
const deleteLine =  (id)=>{//删除商品类型
  console.log("要删除的行数据:", id); // 添加日志输出
  axios({
    method:'get',
    url:'http://localhost:9091/Type/deleteById?id=' + id
  }).then((response)=>{
    console.log(response)
    fetch();
  }).catch(error=>{
    console.log("删除请求失败:",error)
  })
}

</script>
<style scoped>
.div{
  position: absolute;
  left: 33%;
  padding-top: 50px;
}

.table{
  width: 500px;
  line-height: 40px;
  text-align: center;

}

</style>
.