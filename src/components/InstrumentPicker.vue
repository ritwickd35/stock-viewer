<script setup lang="ts">
const instrument: string | null = null;
function onInstrumentSelected() {
  // alert(instrument);
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
                  uses lightweight charts and is based on canvas.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div class="col-md-6 py-md-5 my-md-5 py-xs-2 my-xs-2S">
          <form @submit.prevent="onInstrumentSelected" class="form-inline row">
            <div class="form-group mb-2 col-12">
              <input
                type="text"
                id="staticEmail2"
                class="form-control"
                v-model="instrument"
                placeholder="Enter Instrument Name"
              />
            </div>
            <div class="col-6">
              <div class="form-check">
                <input
                  name="interval"
                  class="form-check-input"
                  type="radio"
                  value="hourly"
                  id="flexCheckDefault"
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
                  checked
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
