<template>
  <a-modal
      v-model:open="visible"
      title="Create a new Product"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="insert()"
  >
    <a-form  :model="form" layout="vertical" name="form_in_modal">
      <a-form-item
          name="name"
          label="商品名称"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item name="purchas" label="进价"
                   :rules="[{ required: true, message: 'Please input the title of collection!' }]"
      >
        <a-input v-model:value="form.purchas" />
      </a-form-item>
      <a-form-item
          name="sell"
          label="售价"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
      >
        <a-input v-model:value="form.sell" />
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

import { reactive, ref} from "vue";



const visible= ref(false)

const emit = defineEmits(['refresh'])

const form = reactive({

  name: '',
  purchas: '',
  sell: '',
  type: '',

})
//添加
const insert = ()=>{
  const data = {

    product_name:form.name,
    purchas_price:form.purchas,
    sell_price:form.sell,
    product_type:form.type,
  }

  axios({
    method:'post',
    url:'http://localhost:9091/Product/insert',data
  }).then((res)=>{
    console.log(res)
    emit('refresh')
  }).catch((error)=>{
    console.log('error',error)
  })
}
</script>