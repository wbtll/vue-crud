<template>

  <div class="div">
    <el-row>
      <el-col class="col" >
        <el-card   class="animate__animated animate__fadeInLeftBig" style="margin-top: 10px">
          <el-space :size="size" :spacer="spacer">
<!--            增加-->
            <insert @refresh="fetch(currentPage,pageSize)"></insert>
<!--            excel导出-->
            <el-button type="primary" @click="getExport">导出</el-button>
<!--            <el-button @click="fetch(currentPage, pageSize)">All</el-button>-->
          </el-space>
<!--          表格-->
          <el-table  :data="dataSource" class="row-class" :row-style="{height:'40px'}">
            <el-table-column prop="id" label="ID" width="120" />
            <el-table-column prop="product_name" label="商品名称" width="120" />
            <el-table-column prop="purchas_price" label="进价" width="120" />
            <el-table-column prop="sell_price" label="售价" width="120" />

            <el-table-column prop="product_type" label="商品类型" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="{row}">
                <update :dataSource="row" @refresh="fetch(currentPage,pageSize)"></update>
                <el-popconfirm
                    confirm-button-text="Yes"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="Are you sure to delete this?"
                    @confirm="deleteLine(row.id)"
                    @cancel="cancelEvent"
                >
                  <template #reference>
                    <el-button link ghost plain size="small">Delete</el-button>
                  </template>
                </el-popconfirm>
<!--                <el-button link ghost @click="" size="small">删除</el-button>-->
                <!--            <el-button link type="primary" size="small">Edit</el-button>-->
              </template>
            </el-table-column>
          </el-table>
<!--          分页-->
          <a-pagination :pageSize="pageSize"  :currentPage="currentPage"  @change="handlePagination" :total="total" show-less-items/>
        </el-card>
        <div id="main" style="width: 700px;height:400px;"></div>
      </el-col>
    </el-row>
  </div>

 </template>
<script setup>
import {ref, onMounted,h} from "vue";
import axios from "axios";
import insert from "@/components/AllProductListItemTable/insert.vue";
import Update from "@/components/AllProductListItemTable/update.vue";
import {ElDivider, ElNotification} from "element-plus";
import {InfoFilled} from "@element-plus/icons-vue";
import * as echarts from 'echarts';

const size = ref(10)
const spacer = h(ElDivider, { direction: 'vertical' })
const visible= ref(false)

const currentPage = ref(1)
const pageSize = ref(7);
const dataSource = ref([])
const total = ref(0)

const data = ref([])
// excel导出
const getExport =()=>{
  axios({
    method:'get',
    url:'http://localhost:9091/Product/export',
    responseType: 'blob',
  }).then((res)=>{
    const blob = new Blob([res.data],{ type: 'application/octet-stream' })
    const URL = window.URL.createObjectURL(blob)
    const  a =document.createElement("a");//创建A标签
    a.href = URL;//相当于<a href="URL">将流文件写入a标签的href属性值
    a.setAttribute("download","Product.xlsx")//设置文件名
    document.body.appendChild(a);//追加a标签到文档对象中
    a.click()//相当于点击事件
    a.remove();//然后删除（一次性）
    console.log("已导出。。。。")
  }).catch((error)=>{
    console.log("error",error)
  })
}
//显示所有数据（分页）
const fetch = (currentPage, pageSize,) =>{
  axios({
    method:'get',
url:`http://localhost:9091/Product/selectAllByPage?current=${currentPage}&size=${pageSize}`,

  }).then((res)=>{
    console.log("AllProduct",res)
    dataSource.value = res.data.records
    total.value = res.data.total
  }).catch((error)=>{
    console.log('error',error)
  })
}

const handlePagination = (page) => {
  dataSource.value = [];
  currentPage.value = page;
  fetch(page, pageSize.value);
};

//删除
const deleteLine =  (id)=>{//删除商品
  console.log("要删除的行数据:", id); // 添加日志输出
  axios({
    method:'get',
    url:'http://localhost:9091/Product/deleteById?id=' + id
  }).then((response)=>{
    console.log(response)
    fetch(currentPage.value,pageSize.value);
    ElNotification({
      title: 'Success',
      message: '删除成功',
      type: 'success',
    })
  }).catch(error=>{
    console.log("删除请求失败:",error)
  })
}
let name = []
let sell = []




//图表
const chart = ()=>{
  const myChart = echarts.init(document.getElementById('main'));
// const chartData = ref
  let  option ={
    title: {
      text: '售价'
    },
    tooltip: {},
    xAxis: {
      data: name,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        rotate: -45, // 标签旋转角度
        formatter: function (value) {
          // 自定义标签显示内容，可根据实际情况进行调整
          return value
        }
      },
    },
    // y轴
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sell
      }
    ]
  };
  myChart.setOption(option);
}
onMounted(()=>{
  fetch(currentPage.value,pageSize.value);//显示所有数据（分页）
  axios({
    method:'get',
    url:`http://localhost:9091/Product/selectAllProduct`,
  }).then((res)=>{
    console.log("AllProducts",res)
    data.value = res.data
    console.log(data.value)
    data.value.forEach((item)=>{
      name.push(item.product_name)
      sell.push(item.sell_price)
    })
    chart()
  }).catch((error)=>{
    console.log('error',error)
  })
})
</script>
<style scoped>
.div{
  position: absolute;
  left: 5%;
  padding-top: 10px;


}
.col{
  display: flex;
  flex-direction: row;
  justify-content: left;
}
#main{
  margin-left: 5%;
  margin-top: 2%;
}
.row-class{
  width: 500px;
  height:320px;
  line-height: 20px;
  text-align: left;
  //display: flex;

}


</style>
