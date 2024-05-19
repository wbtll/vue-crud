<template>
  <el-card style="width: 550px;position: absolute;left: 34%" class="animate__animated  animate__fadeIn">
    <el-table :data="table"  strip row-key="id">
      <el-table-column
          v-for="item in DetailList"
          :key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :width="DetailList.length>4?'100':' '"
      ></el-table-column>
      <!--    <el-table-column label="caoziuo"></el-table-column>-->
    </el-table>
  </el-card>
</template>
<script setup>
import {onMounted, ref,} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";


const table = ref([])

const DetailList =[
  {prop:'id',name:'ID',},
  {prop:'product_name',name:'商品名称',},
  {prop:'purchas_price',name:'进价',},
  {prop:'sell_price',name:'售价',},
  {prop:'product_type',name:'商品类型',}
]


onMounted(()=>{
  getDetail()
})

const getDetail=()=>{
  let route = useRoute()
  let id = route.query.id
   axios({
     method:'get',
     url:`http://localhost:9091/Type/selectProductByTypeId?typeId=${id}`
   }).then((res)=>{
     table.value = res.data
   }).catch((error)=>{
     console.log('error',error)
   })
}
</script>