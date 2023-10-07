<template>
  <h3 class="green">Stock Details</h3>
  <div id="chartContainer" ref="chart"></div>
</template>

<script setup lang="ts">
import { createChart, type IChartApi } from "lightweight-charts";
import { onMounted, onUnmounted } from "vue";

function resize(width: number, height: number) {
  if (chart) chart.resize(width, height);
}

let chart: IChartApi | null;
// if (container) {
onMounted(() => {
  const chartOptions = {
    layout: {
      background: { color: "#dfe9ff" },
      textColor: "#ef452f",
    },
    grid: {
      vertLines: { color: "#444" },
      horzLines: { color: "#444" },
    },
    height: 400,
  };
  const chartContainer = document.getElementById("chartContainer");
  if (chartContainer) {
    chart = createChart(chartContainer, chartOptions);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData([
      {
        time: "2018-12-22",
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: "2018-12-24",
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: "2018-12-26",
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: "2018-12-28",
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: "2018-12-29",
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: "2018-12-30",
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      resize(cr.width, cr.height);
    });

    ro.observe(chartContainer);

    window.addEventListener("resize", () => {
      resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
    });

    chart.timeScale().fitContent();
  }

  // }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
});
</script>
