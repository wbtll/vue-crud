<template>
  <div class="animate__animated  animate__fadeIn animate__delay-0.1s">
    <a-layout class="layout" >
      <a-affix :offset-top="top">
        <a-layout-header>
          <div style="display: flex">

            <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '64px' }"
            >
              <a-menu-item key="1" @click="home">首页</a-menu-item>
              <a-menu-item key="2" @click="test">Test</a-menu-item>

            </a-menu>
            <div style="height: 20px;position: absolute; right:45px; bottom:35px;width: 10px">
              <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
            </div>
          </div>

        </a-layout-header>
      </a-affix>

      <a-layout-content class="content">
        <div class="product">
          <h1 >商品管理系统</h1>
        </div>
        <a-divider />
        <router-view></router-view>
      </a-layout-content>
      <!--    <a-divider />-->
      <a-layout-footer style="text-align: center">
        <a-divider />
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>

</template>
<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
const selectedKeys = ref(['1']);
const top = ref(1)

const home=()=> {
  router.push({
    path: '/'
  })
}
const test=()=> {
  router.push({
    path: '/test'
  })
}
</script>
<style>
.content{
  height: 1000px;
}
.product{
  line-height: 30px;
  text-align: center;
  font-size: large;
  padding-top: 100px;
  padding-bottom: 20px;
  background-color: #c6e2ff;
}

</style>