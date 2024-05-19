<template>
  <el-button link ghost  @click="visible = true" size="small">编辑</el-button>
  <a-modal
      v-model:open="visible"
      title="Create a new Product"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="update()"
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
</template>
<script setup>

import {reactive, ref, inject, watch} from "vue";
import axios from "axios";

const visible= ref(false)

const form = reactive({
  id:'',
  name: '',
  purchas: '',
  sell: '',
  type: '',
})
const emit = defineEmits(['refresh'])
const props = defineProps({
  dataSource: {
    type:Array,
    required: true,
    default: () => ({  })
  }
});


form.id = props.dataSource.id;
form.name = props.dataSource.product_name;
form.purchas = props.dataSource.purchas_price;
form.sell = props.dataSource.sell_price;
form.type = props.dataSource.product_type;
function update(id){
  console.log( props.dataSource.id)

  const data = {
     id:form.id,
    product_name:form.name,
    purchas_price:form.purchas,
    sell_price:form.sell,
    product_type:form.type,
  }
  axios({
    method:'post',
    url:`http://localhost:9091/Product/updateById?id=${id}`,
    data
  }).then((res)=>{
    console.log('success',res)
    emit('refresh')
  }).catch(error=>{
    console.log("更改失败",error)
  })
visible.value =false
}
</script>