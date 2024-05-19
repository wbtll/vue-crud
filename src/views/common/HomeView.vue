<script setup>
import Type from "@/components/Type.vue";
import AllProduct from "@/components/AllProduct.vue";
import ProductDto from "@/components/ProductDto.vue";
</script>

<template>

  <div style="padding-top: 20px;background-color: #c6e2ff;position: relative">
    <div style="position: absolute;left: 15%" class="animate__animated  animate__fadeInLeftBig animate__delay-0.5s	">
      <AllProduct></AllProduct>
    </div>
    <div style="position: absolute;left: 39%" class="animate__animated  animate__fadeIn animate__delay-1s	">
      <Type></Type>
    </div>
    <div style="position: absolute;left: 63%" class="animate__animated animate__fadeInLeftBig animate__delay-2s	">
      <ProductDto></ProductDto>
    </div>
  </div>


</template>
<style scoped>


</style>
