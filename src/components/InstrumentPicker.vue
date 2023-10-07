<script setup lang="ts">
const instrument: string | null = null;
function onInstrumentSelected(event) {
  alert(instrument);
}
</script>

<template>
  <div class="greetings">
    <form @submit.prevent="onInstrumentSelected">
      <div class="form-group mb-2">
        <label for="staticEmail2" class="sr-only">Stock name</label>
        <input type="text" id="staticEmail2" v-model="instrument" />
      </div>
      <button type="submit" class="btn btn-primary mb-2">View Chart</button>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
