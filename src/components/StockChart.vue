<template>
  <div class="row">
    <h3 style="font-family: monospace" class="green my-2">
      Regenerate mock data
    </h3>
    <form @submit.prevent="regenerateData">
      <div class="row">
        <div class="col">
          <input
            type="number"
            class="form-control"
            placeholder="Total records to generate"
            v-model="generateNumber"
          />
        </div>
        <div class="col">
          <div class="form-check form-check-inline my-2">
            <input
              class="form-check-input"
              type="radio"
              name="generateInterval"
              id="inlineRadio2"
              value="hourly"
              checked
              v-model="generateInterval"
            />
            <label class="form-check-label" for="inlineRadio1">Hourly</label>
          </div>
          <div class="form-check form-check-inline my-2">
            <input
              class="form-check-input"
              type="radio"
              name="generateInterval"
              id="inlineRadio1"
              value="daily"
              v-model="generateInterval"
            />
            <label class="form-check-label" for="inlineRadio2">Daily</label>
          </div>
        </div>
        <div class="col-12">
          <button
            type="submit"
            class="btn my-2"
            style="
              background-color: rgb(27, 131, 131);
              color: aliceblue;
              width: 100%;
            "
            :disabled="generateNumber < 1"
          >
            Re-Generate mock data
          </button>
        </div>
      </div>
    </form>
    <div class="col-12 my-4" v-if="chartDrawn">
      <h3 style="font-family: monospace" class="green">Stock Details</h3>
      <div id="chartContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { store } from "../dataStore/store";
import { useToast } from "primevue/usetoast";
import { showToast } from "../services/toastService";
import { io } from "socket.io-client";

import {
  createChart,
  type CandlestickData,
  type CandlestickSeriesOptions,
  type CandlestickStyleOptions,
  type DeepPartial,
  type IChartApi,
  type ISeriesApi,
  type SeriesOptionsCommon,
  type Time,
  type WhitespaceData,
  type HistogramData,
  type HistogramSeriesOptions,
  type HistogramStyleOptions,
} from "lightweight-charts";
import { onUnmounted, watch, nextTick } from "vue";

// for toast notifications
const toast = useToast();

// initialising the local component state
let chart: IChartApi | null;
let candlestickSeries: ISeriesApi<
  "Candlestick",
  Time,
  CandlestickData<Time> | WhitespaceData<Time>,
  CandlestickSeriesOptions,
  DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>
>;
let volumeSeries: ISeriesApi<
  "Histogram",
  Time,
  WhitespaceData<Time> | HistogramData<Time>,
  HistogramSeriesOptions,
  DeepPartial<HistogramStyleOptions & SeriesOptionsCommon>
>;

// v-model variables for storing data generation details
const generateInterval = ref("hourly");
const generateNumber = ref(0);

const serverURL = import.meta.env.VITE_SERVER_URL;
const socketServerURL = import.meta.env.VITE_SOCKET_SERVER_URL;
const chartDrawn = ref(false);

const socket = io(socketServerURL);

let instrumentChart: string | null = null;

// watcher triggers when the selected instrument or the interval changes
// renders charts
watch(store, ({ instrument, interval, dataLoading }, oldValue) => {
  if (interval && instrument && dataLoading) {
    instrumentChart = instrument;
    fetchDataAndDraw(interval, instrument);
  }

  store.value.dataLoading = false;
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
});

/**
 * function fetches data and calls drawChart()
 **/
function fetchDataAndDraw(interval: string, instrument: string) {
  fetch(serverURL + `/search?interval=${interval}&symbol=${instrument}`)
    .then((res) => res.json())
    .then((data) => {
      store.value.dataLoading = false;

      if (data.data) {
        showToast(
          toast,
          "error",
          "Error",
          data.data + ". Please regenerate the data if required",
          3000
        );
      } else {
        showToast(
          toast,
          "success",
          "Data fetched",
          "Data fetched. Rendering chart.",
          2000
        );

        const volumeArr = data.map((data) => {
          return { time: data.time, value: data.volume };
        });

        chartDrawn.value = true;

        nextTick(() => {
          drawChart();

          if (candlestickSeries && volumeSeries) {
            candlestickSeries.setData(data);

            volumeSeries.setData(volumeArr);
          }
        });
      }
    })
    .catch((err) => {
      showToast(toast, "error", "Error", err.message, 3000);
    });
}

/**
 * resizes the chart
 **/
function resize(width: number, height: number) {
  if (chart) chart.resize(width, height);
}

/**
 * sends a request to backend to regenerate the charts
 **/
function regenerateData() {
  const serverURL = import.meta.env.VITE_SERVER_URL;

  fetch(
    `${serverURL}/generate-data?interval=${generateInterval.value}&totalRecords=${generateNumber.value}`
  )
    .then((res) => res.text())
    .then((data) => {
      showToast(
        toast,
        "success",
        data,
        "Data is being generated. You will get a notification when it is done",
        2000
      );
    })
    .catch((err) => {
      showToast(toast, "error", "Error", err.message, 2000);
    });
}

/**
 * draws chart
 **/
function drawChart() {
  if (chart) {
    chart.remove();
    chart = null;
  }
  const chartOptions = {
    layout: {
      background: { color: "#eff4ff" },
      textColor: "#ef452f",
    },
    grid: {
      vertLines: {
        color: "rgba(42, 46, 57, 0)",
      },
      horzLines: {
        color: "rgba(42, 46, 57, 0.6)",
      },
    },
    height: 400,
  };
  const chartContainer = document.getElementById("chartContainer");
  if (chartContainer) {
    chart = createChart(chartContainer, chartOptions);
    candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
    });

    volumeSeries = chart.addHistogramSeries({
      color: "rgba(0,0,0,0.3)",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    chart.priceScale("").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const toolTipWidth = 135;

    // Create and style the tooltip html element
    const toolTip = document.createElement("div");
    toolTip.style = `width: ${toolTipWidth}px; height: 110px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = "white";
    toolTip.style.color = "black";
    toolTip.style.borderColor = "#2962FF";
    chartContainer.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      const timeout = setTimeout(() => {
        toolTip.style.display = "none";
      }, 500);

      if (param && param.sourceEvent) {
        const { clientX, clientY } = param.sourceEvent;
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainer.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainer.clientHeight
        ) {
          toolTip.style.display = "none";
        } else {
          // time will be in the same format that we supplied to setData.
          // thus it will be YYYY-MM-DD
          const dateStr = param.time;
          toolTip.style.display = "block";
          const data = param.seriesData.get(candlestickSeries);
          const dataVolume = param.seriesData.get(volumeSeries);
          const price = data.value !== undefined ? data.value : data.close;
          toolTip.innerHTML = `<div style="color: ${"#2962FF"}">${instrumentChart}</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
			${Math.round(100 * price) / 100}
			</div><div><span style="color: ${"#2962FF"}">Volume: </span>${
            dataVolume.value
          }<div>`;

          const coordinate = candlestickSeries.priceToCoordinate(price);
          let shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(
              chartContainer.clientWidth - toolTipWidth,
              shiftedCoordinate
            )
          );
          toolTip.style.left = clientX + 20 + "px";
          toolTip.style.top =
            clientY + (20 + 290000 / window.innerWidth) + "px";
        }

        clearTimeout(timeout);
      }
    });

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      resize(cr.width, cr.height);
    });

    ro.observe(chartContainer);

    window.addEventListener("resize", () => {
      resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
    });
  }
}

socket.on("connect", () => {
  showToast(
    toast,
    "info",
    "Socket connected",
    "Socket connection established with server",
    2000
  );
});

// listen to data gneration event from BE and re-render charts based on the new data
socket.on("mock-data", ({ err, success }) => {
  if (!err && success) {
    showToast(
      toast,
      "info",
      "Data Generation Complete",
      "Data generation has been completed. Refetch to see the new data",
      4000
    );
  }
});
</script>
