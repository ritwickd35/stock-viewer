<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { store } from "./store";

const instrument: Ref<string | null> = ref(null);
const instruments = ref([]);
const interval = ref("hourly");

onMounted(() => {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  console.log(serverURL);
  fetch(serverURL + "/instruments")
    .then((res) => res.json())
    .then((data) => {
      instruments.value = data;
    });
});

function onInstrumentSelected() {
  store.value = { instrument: instrument.value, interval: interval.value };
}
</script>

<template>
  <div class="greetings">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <section class="banner">
            <div class="container" style="margin-top: 30px">
              <div class="banner-text">
                <h1 style="font-family: monospace">Stock Viewer</h1>
                <p id="pageInfo">
                  <strong>
                    Easily track your favourite financial instruments.</strong
                  >
                  This tool helps you view all your financial instruments and
                  allows you to download a record of them for saving. This tool
                  uses lightweight charts and is based on canvas element. Select
                  the instrument you want to view from the dropdown. You can see
                  both hourly and daily data for the instrument you have
                  selected.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div class="col-md-6 py-md-5 my-md-5 py-xs-2 my-xs-2S">
          <form @submit.prevent="onInstrumentSelected" class="form-inline row">
            <div class="form-group mb-2 col-12">
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                v-model="instrument"
              >
                <option disabled :selected="true">Select the instrument</option>
                <option v-for="instrument of instruments" :value="instrument">
                  {{ instrument }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <div class="form-check">
                <input
                  name="interval"
                  class="form-check-input"
                  type="radio"
                  value="hourly"
                  id="flexCheckDefault"
                  checked
                  v-model="interval"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Hourly
                </label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-check">
                <input
                  name="interval"
                  class="form-check-input"
                  type="radio"
                  value="daily"
                  id="flexCheckChecked"
                  v-model="interval"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Daily
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary mb-2 col-12 py-2 my-2">
              <small>View Chart</small>
            </button>
          </form>
        </div>
      </div>
    </div>
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
