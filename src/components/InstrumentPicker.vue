<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { store } from "../dataStore/store";
import { useToast } from "primevue/usetoast";
import { showToast } from "../services/toastService";

// for toast notifications
const toast = useToast();

// local component state
const instrument: Ref<string> = ref("Select the instrument");
const instruments: Ref<never[] | string[]> = ref([]);
const interval: Ref<string | null> = ref("hourly");

// fetch the instruments available when component mounts
onMounted(() => {
  // fetches the available instruments on mount
  const serverURL = import.meta.env.VITE_SERVER_URL;
  console.log(serverURL);
  fetch(serverURL + "/instruments")
    .then((res) => res.json())
    .then((data) => {
      instruments.value = data;
    })
    .catch((err) => {
      showToast(toast, "error", "Error", err.message, 2000);
      instruments.value = [
        "AAPL",
        "GOOGL",
        "AMZN",
        "MSFT",
        "TSLA",
        "FB",
        "NVDA",
        "NFLX",
        "BRK",
        "V",
      ];
    });
});

// update the instrument selection in store for data fetching
function onInstrumentSelected() {
  store.value = {
    instrument: instrument.value,
    interval: interval.value,
    dataLoading: true,
  };
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
                  This tool helps you view all your financial instruments. It
                  uses lightweight charts and is based on canvas element. Select
                  the instrument you want to view from the dropdown. You can see
                  both hourly and daily data for the instrument you have
                  selected.
                  <strong
                    >This tool also allows you to regenerate the data on the
                    backend side</strong
                  >. <br /><br />
                  Both daily and hourly data can be regenerated,
                  <strong
                    >simply select the radio button for which interval(daily or
                    hourly) you want to regenerate data, and mention the number
                    of datapoints to be generated</strong
                  >. Once the points have been generated, the client will be
                  informed via sockets of the completion of the data generation
                  task. Please note that generating a lot of data points,
                  although supported, may slow down the server due to resource
                  limitation of the cloud service the server the code is
                  deployed in(GCP free-tier in this case). Try out the various
                  options below!
                </p>
              </div>
            </div>
          </section>
        </div>
        <div class="col-md-6 py-md-5 my-md-5 py-xs-2 my-xs-2">
          <div class="col-12 text-center" style="margin-bottom: 30px">
            <img src="../assets/logo.svg" alt="logo" />
          </div>
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
              <div class="form-check mx-3">
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
              <div class="form-check mx-3">
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

            <button
              type="submit"
              class="btn btn-primary mb-2 col-12 py-2 my-2"
              style="height: 70px"
              :disabled="instrument === 'Select the instrument'"
            >
              <h3 style="display: inline-block; position: relative; top: 2px">
                View Chart
              </h3>
              <div
                class="spinner-border text-light mx-2"
                role="status"
                style="
                  padding-top: 13px;
                  top: 6px;
                  left: 10px;
                  position: relative;
                "
                v-if="store.dataLoading"
              >
                <span class="sr-only"></span>
              </div>
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
../dataStore/store
