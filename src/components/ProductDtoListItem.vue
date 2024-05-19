<template>
  <div class="search">
    <div style="">
      <el-row :gutter="20" >
        <el-col>
          <el-space :size="size" :spacer="spacer" :model="queryParam">
            <el-input v-model="queryParam.product_name" class="input" placeholder="Product Name" style="width: 200px">
              <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
            </el-input>
            <el-input v-model="queryParam.product_type" class="input" placeholder="Product Type" style="width: 200px">
              <template #prefix>
                <el-icon class="el-input__icon"><sea                                                                                                                                                                                                                                                                                     rch /></el-icon>
              </template>
            </el-input>
          </el-space>
          <el-button @click="resetQueryParams">重置</el-button>
          <el-button @click="flush">查询</el-button>

          <el-card   class="animate__animated animate__fadeInLeftBig" style="margin-top: 10px">
            <el-table  :data="table" class="row-class" :row-style="{height:'40px'}">
              <el-table-column prop="id" label="ID" width="120" />
              <el-table-column prop="product_name" label="商品名称" width="120" />
              <el-table-column prop="purchas_price" label="进价" width="120" />
              <el-table-column prop="sell_price" label="售价" width="120" />

              <el-table-column prop="product_type" label="商品类型" width="120" />
              <el-table-column fixed="right" label="操作" width="120">
                <template #default="{row}">
                  <update :dataSource="dataSource"></update>
                  <el-button link ghost @click="deleteLine(row.id)" size="small">删除</el-button>
                  <!--            <el-button link type="primary" size="small">Edit</el-button>-->
                </template>
              </el-table-column>

            </el-table>
            <a-pagination :pageSize="pageSize"  :currentPage="currentPage"  @change="handlePagination" :total="total" show-less-items/>
          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>
<script setup>

import {h, reactive, ref} from "vue";
import {  Search } from '@element-plus/icons-vue'
import {ElDivider} from "element-plus";
import axios from "axios";

import Update from "@/components/AllProductListItemTable/update.vue";

const size = ref(10)
const spacer = h(ElDivider, { direction: 'vertical' })
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(0);
const table = ref([])




const queryParam = reactive({
  product_name:'',
  product_type:''
})

const dto = (currentPage,pageSize)=>{
  const data = {
    product_name:queryParam.product_name,

    product_type:queryParam.product_type,
  }

  axios({
    method:'post',
    url:`http://localhost:9091/Product/selectAllProductByPage?current=${currentPage}&size=${pageSize}`,data
  }).then((res)=>{
    console.log(res)
   table.value = res.data.records
    total.value = res.data.total
  }).catch((error)=>{
    console.log('error',error)
  })
}
const handlePagination = (page) => {
  table.value = [];
  currentPage.value = page;
  dto(page, pageSize.value);
};
const resetQueryParams = () => {
  queryParam.product_name = '';
  queryParam.product_type = '';
};
const flush =()=>{
  table.value = [];
  // currentPage.value
  dto(currentPage.value,pageSize.value)
}
</script>
<style>
.search{

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>