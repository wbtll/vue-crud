<template>
  <a-modal
      v-model:open="visible"
      title="Create a new Type"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="insertType"
  >
    <a-form  :model="form" layout="vertical" name="form_in_modal">
      <a-form-item
          name="id"
          label="ID"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
      >
        <a-input v-model:value="form.id" />
      </a-form-item>
      <a-form-item
          name="type"
          label="商品类型"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
      >
        <a-input v-model:value="form.type" />
      </a-form-item>

    </a-form>
  </a-modal>

  <a-button type="dashed" @click="visible = true">insert</a-button>
  </template>
<script setup>
import axios from "axios";

import {inject, reactive, ref, } from "vue";



const visible= ref(false)


 const All = inject('All');

const form = reactive({

  id: '',

  type: '',

})
//添加
const insertType = ()=>{
  const data = {

    id:form.id,
    type:form.type,
  }

  axios({
    method:'post',
    url:'http://localhost:9091/Type/insert',data
  }).then((res)=>{
    console.log(res)
    All()
  }).catch((error)=>{
    console.log('error',error)
  })
  visible.value = false
}
</script>