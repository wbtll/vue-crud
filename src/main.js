

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'animate.css';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";

axios.defaults.baseURL = 'http://localhosts:9091'
const app = createApp(App).use(Antd)

app.use(router).use(ElementPlus)


app.mount('#app')
