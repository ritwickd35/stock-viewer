<template>
  <h3 class="green">Stock Details</h3>
  <div id="chartContainer" ref="chart"></div>
</template>

<script setup lang="ts">
import { store } from "./store";
import { createChart, type IChartApi } from "lightweight-charts";
import { onMounted, onUnmounted, watch } from "vue";

function resize(width: number, height: number) {
  if (chart) chart.resize(width, height);
}

let chart: IChartApi | null;
let candlestickSeries;
let volumeSeries;

const serverURL = import.meta.env.VITE_SERVER_URL;

watch(store, ({ instrument, interval }, oldValue) => {
  console.log("got changes ion chart", oldValue);
  fetch(serverURL + `/search?interval=${interval}&symbol=${instrument}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      candlestickSeries.setData(data);
    });
});

onMounted(() => {
  const chartOptions = {
    layout: {
      background: { color: "#dfe9ff" },
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
    // setTimeout(() => {
    //   candlestickSeries.update({
    //     time: "2021-12-31",
    //     open: 109.87,
    //     high: 114.69,
    //     low: 85.66,
    //     close: 112,
    //   });
    // }, 2000);
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
      color: "#182233",
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

    // chart.subscribeCrosshairMove((param) => {
    //   // const x = param.point.x;
    //   console.log(
    //     param.seriesData.forEach((data) => {
    //       console.log(data);
    //     })
    //   );
    //   // const data = param.seriesData.get(series);
    //   // const price = data.value !== undefined ? data.value : data.close;
    //   // console.log(`The data point is at position: ${x}`);
    // });

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      resize(cr.width, cr.height);
    });

    ro.observe(chartContainer);

    window.addEventListener("resize", () => {
      resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
    });

    volumeSeries.setData([
      { time: "2018-10-19", value: 19103293.0 },
      { time: "2018-10-22", value: 21737523.0 },
      { time: "2018-10-23", value: 29328713.0 },
      { time: "2018-10-24", value: 37435638.0 },
      { time: "2018-10-25", value: 25269995.0 },
      { time: "2018-10-26", value: 24973311.0 },
      { time: "2018-10-29", value: 22103692.0 },
      { time: "2018-10-30", value: 25231199.0 },
      { time: "2018-10-31", value: 24214427.0 },
      { time: "2018-11-01", value: 22533201.0 },
      { time: "2018-11-02", value: 14734412.0 },
      { time: "2018-11-05", value: 12733842.0 },
      { time: "2018-11-06", value: 12371207.0 },
      { time: "2018-11-07", value: 14891287.0 },
      { time: "2018-11-08", value: 12482392.0 },
      { time: "2018-11-09", value: 17365762.0 },
      { time: "2018-11-12", value: 13236769.0 },
      { time: "2018-11-13", value: 13047907.0 },
      { time: "2018-11-14", value: 18288710.0 },
      { time: "2018-11-15", value: 17147123.0 },
      { time: "2018-11-16", value: 19470986.0 },
      { time: "2018-11-19", value: 18405731.0 },
      { time: "2018-11-20", value: 22028957.0 },
      { time: "2018-11-21", value: 18482233.0 },
      { time: "2018-11-23", value: 7009050.0 },
      { time: "2018-11-26", value: 12308876.0 },
      { time: "2018-11-27", value: 14118867.0 },
      { time: "2018-11-28", value: 18662989.0 },
      { time: "2018-11-29", value: 14763658.0 },
      { time: "2018-11-30", value: 31142818.0 },
      { time: "2018-12-03", value: 27795428.0 },
      { time: "2018-12-04", value: 21727411.0 },
      { time: "2018-12-06", value: 26880429.0 },
      { time: "2018-12-07", value: 16948126.0 },
      { time: "2018-12-10", value: 16603356.0 },
      { time: "2018-12-11", value: 14991438.0 },
      { time: "2018-12-12", value: 18892182.0 },
      { time: "2018-12-13", value: 15454706.0 },
      { time: "2018-12-14", value: 13960870.0 },
      { time: "2018-12-17", value: 18902523.0 },
      { time: "2018-12-18", value: 18895777.0 },
      { time: "2018-12-19", value: 20968473.0 },
      { time: "2018-12-20", value: 26897008.0 },
      { time: "2018-12-21", value: 55413082.0 },
      { time: "2018-12-24", value: 15077207.0 },
      { time: "2018-12-26", value: 17970539.0 },
      { time: "2018-12-27", value: 17530977.0 },
      { time: "2018-12-28", value: 14771641.0 },
      { time: "2018-12-31", value: 15331758.0 },
      { time: "2019-01-02", value: 13969691.0 },
      { time: "2019-01-03", value: 19245411.0 },
      { time: "2019-01-04", value: 17035848.0 },
      { time: "2019-01-07", value: 16348982.0 },
      { time: "2019-01-08", value: 21425008.0 },
      { time: "2019-01-09", value: 18136000.0 },
      { time: "2019-01-10", value: 14259910.0 },
      { time: "2019-01-11", value: 15801548.0 },
      { time: "2019-01-14", value: 11342293.0 },
      { time: "2019-01-15", value: 10074386.0 },
      { time: "2019-01-16", value: 13411691.0 },
      { time: "2019-01-17", value: 15223854.0 },
      { time: "2019-01-18", value: 16802516.0 },
      { time: "2019-01-22", value: 18284771.0 },
      { time: "2019-01-23", value: 15109007.0 },
      { time: "2019-01-24", value: 12494109.0 },
      { time: "2019-01-25", value: 17806822.0 },
      { time: "2019-01-28", value: 25955718.0 },
      { time: "2019-01-29", value: 33789235.0 },
      { time: "2019-01-30", value: 27260036.0 },
      { time: "2019-01-31", value: 28585447.0 },
      { time: "2019-02-01", value: 13778392.0 },
      { time: "2019-02-04", value: 15818901.0 },
      { time: "2019-02-05", value: 14124794.0 },
      { time: "2019-02-06", value: 11391442.0 },
      { time: "2019-02-07", value: 12436168.0 },
      { time: "2019-02-08", value: 12011657.0 },
      { time: "2019-02-11", value: 9802798.0 },
      { time: "2019-02-12", value: 11227550.0 },
      { time: "2019-02-13", value: 11884803.0 },
      { time: "2019-02-14", value: 11190094.0 },
      { time: "2019-02-15", value: 15719416.0 },
      { time: "2019-02-19", value: 12272877.0 },
      { time: "2019-02-20", value: 11379006.0 },
      { time: "2019-02-21", value: 14680547.0 },
      { time: "2019-02-22", value: 12534431.0 },
      { time: "2019-02-25", value: 15051182.0 },
      { time: "2019-02-26", value: 12005571.0 },
      { time: "2019-02-27", value: 8962776.0 },
      { time: "2019-02-28", value: 15742971.0 },
      { time: "2019-03-01", value: 10942737.0 },
      { time: "2019-03-04", value: 13674737.0 },
      { time: "2019-03-05", value: 15749545.0 },
      { time: "2019-03-06", value: 13935530.0 },
      { time: "2019-03-07", value: 12644171.0 },
      { time: "2019-03-08", value: 10646710.0 },
      { time: "2019-03-11", value: 13627431.0 },
      { time: "2019-03-12", value: 12812980.0 },
      { time: "2019-03-13", value: 14168350.0 },
      { time: "2019-03-14", value: 12148349.0 },
      { time: "2019-03-15", value: 23715337.0 },
      { time: "2019-03-18", value: 12168133.0 },
      { time: "2019-03-19", value: 13462686.0 },
      { time: "2019-03-20", value: 11903104.0 },
      { time: "2019-03-21", value: 10920129.0 },
      { time: "2019-03-22", value: 25125385.0 },
      { time: "2019-03-25", value: 15463411.0 },
      { time: "2019-03-26", value: 12316901.0 },
      { time: "2019-03-27", value: 13290298.0 },
      { time: "2019-03-28", value: 20547060.0 },
      { time: "2019-03-29", value: 17283871.0 },
      { time: "2019-04-01", value: 16331140.0 },
      { time: "2019-04-02", value: 11408146.0 },
      { time: "2019-04-03", value: 15491724.0 },
      { time: "2019-04-04", value: 8776028.0 },
      { time: "2019-04-05", value: 11497780.0 },
      { time: "2019-04-08", value: 11680538.0 },
      { time: "2019-04-09", value: 10414416.0 },
      { time: "2019-04-10", value: 8782061.0 },
      { time: "2019-04-11", value: 9219930.0 },
      { time: "2019-04-12", value: 10847504.0 },
      { time: "2019-04-15", value: 7741472.0 },
      { time: "2019-04-16", value: 10239261.0 },
      { time: "2019-04-17", value: 15498037.0 },
      { time: "2019-04-18", value: 13189013.0 },
      { time: "2019-04-22", value: 11950365.0 },
      { time: "2019-04-23", value: 23488682.0 },
      { time: "2019-04-24", value: 13227084.0 },
      { time: "2019-04-25", value: 17425466.0 },
      { time: "2019-04-26", value: 16329727.0 },
      { time: "2019-04-29", value: 13984965.0 },
      { time: "2019-04-30", value: 15469002.0 },
      { time: "2019-05-01", value: 11627436.0 },
      { time: "2019-05-02", value: 14435436.0 },
      { time: "2019-05-03", value: 9388228.0 },
      { time: "2019-05-06", value: 10066145.0 },
      { time: "2019-05-07", value: 12963827.0 },
      { time: "2019-05-08", value: 12086743.0 },
      { time: "2019-05-09", value: 14835326.0 },
      { time: "2019-05-10", value: 10707335.0 },
      { time: "2019-05-13", value: 13759350.0 },
      { time: "2019-05-14", value: 12776175.0 },
      { time: "2019-05-15", value: 10806379.0 },
      { time: "2019-05-16", value: 11695064.0 },
      { time: "2019-05-17", value: 14436662.0 },
      { time: "2019-05-20", value: 20910590.0 },
      { time: "2019-05-21", value: 14016315.0 },
      { time: "2019-05-22", value: 11487448.0 },
      { time: "2019-05-23", value: 11707083.0 },
      { time: "2019-05-24", value: 8755506.0 },
      { time: "2019-05-28", value: 3097125.0 },
    ]);

    // chartContainer.addEventListener("scroll", () => {
    //   // Check if the user has scrolled to the end of the chart
    //   // if (
    //   //   chartContainer.scrollTop + chartContainer.clientHeight ===
    //   //   chartContainer.scrollHeight
    //   // ) {
    //   alert("scroll");
    //   // Load more data here and add it to the chart series
    //   // For example, you can fetch data from a server or update your data array
    //   // Then, use candlestickSeries.update() to add new data points to the chart
    //   // }
    // });

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
