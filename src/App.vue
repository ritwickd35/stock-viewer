<script setup lang="ts">
import InstrumentPicker from "./components/InstrumentPicker.vue";
import StockChart from "./components/StockChart.vue";
</script>

<template>
  <Toast></Toast>
  <div class="container">
    <InstrumentPicker />

    <StockChart />
  </div>
</template>

<style scoped></style>
