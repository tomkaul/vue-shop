<template>
  <div class="charts">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Chart Page</h3>
        <!-- <button @click="setData" class="btn btn-primary">Set Data</button> -->
      </div>
    </div>
    <div class="container" style="max-width: 600px">
      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
// eslint-disable-next-line no-unused-vars
import { fb, db } from "../firebase";

export default {
  name: "Charts",
  components: { LineChart },
  firestore() {
    return {
      dataC: db.collection("plotData").doc("Claus"),
      dataJ: db.collection("plotData").doc("Jaksen"),
      dataM: db.collection("plotData").doc("Manse"),
      dataT: db.collection("plotData").doc("Thomas")
    };
  },
  data() {
    return {
      dataC: null,
      dataJ: null,
      dataM: null,
      dataT: null,
      loaded: false,
      chartdata: {
        labels: [11, 12, 13, 14, 15, 16, 17],
        datasets: [
          {
            label: "Claus",
            fill: false,
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            data: [
              { x: 11, y: this.randomScalingFactor() },
              { x: 12, y: this.randomScalingFactor() },
              { x: 13, y: this.randomScalingFactor() },
              { x: 14, y: this.randomScalingFactor() },
              { x: 15, y: this.randomScalingFactor() },
              { x: 16, y: this.randomScalingFactor() },
              { x: 17, y: this.randomScalingFactor() }
            ]
          },
          {
            label: "Manse",
            fill: false,
            backgroundColor: "#000",
            borderColor: "#36a2eb",
            data: [
              { x: 11, y: this.randomScalingFactor() },
              { x: 12, y: this.randomScalingFactor() },
              { x: 13, y: this.randomScalingFactor() },
              { x: 14, y: this.randomScalingFactor() },
              { x: 15, y: this.randomScalingFactor() },
              { x: 16, y: this.randomScalingFactor() },
              { x: 17, y: this.randomScalingFactor() }
            ]
          },
          {
            label: "Jaksen",
            fill: false,
            backgroundColor: "#000",
            borderColor: "#8e5ea2",
            data: [
              { x: 11, y: this.randomScalingFactor() },
              { x: 12, y: this.randomScalingFactor() },
              { x: 13, y: this.randomScalingFactor() },
              { x: 14, y: this.randomScalingFactor() },
              { x: 15, y: this.randomScalingFactor() },
              { x: 16, y: this.randomScalingFactor() },
              { x: 17, y: this.randomScalingFactor() }
            ]
          },
          {
            label: "Thomas",
            fill: false,
            backgroundColor: "#000",
            borderColor: "#3cba9f",
            data: [
              { x: 11, y: this.randomScalingFactor() },
              { x: 12, y: this.randomScalingFactor() },
              { x: 13, y: this.randomScalingFactor() },
              { x: 14, y: this.randomScalingFactor() },
              { x: 15, y: this.randomScalingFactor() },
              { x: 16, y: this.randomScalingFactor() },
              { x: 17, y: this.randomScalingFactor() }
            ]
          },
          {
            label: "Target",
            fill: false,
            // legend
            // backgroundColor: "#000",
            // borderColor: "#3cba9f",
            data: [
              { x: 11, y: 9 },
              { x: 30, y: 0 }
            ]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Chart.js Line Chart"
        },
        // tooltips: {
        //   mode: "index",
        //   intersect: false
        // },
        // hover: {
        //   mode: "nearest",
        //   intersect: true
        // },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Week #"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    randomScalingFactor() {
      // return Math.random();
      return Math.floor(Math.random() * 10);
    }
    // setData() {
    //   this.$firestore.dataC.update({
    //     data: [
    //       { x: 11, y: 93.3 },
    //       { x: 12, y: 92.8 },
    //       { x: 13, y: 92.3 },
    //       { x: 14, y: 88.9 },
    //       { x: 15, y: 88.7 },
    //       { x: 16, y: 86.9 },
    //       { x: 17, y: 88.2 }
    //     ]
    //   });
    //   this.$firestore.dataJ.update({
    //     data: [
    //       { x: 11, y: 88.7 },
    //       { x: 12, y: 87.3 },
    //       { x: 13, y: 86.7 },
    //       { x: 14, y: 85.7 },
    //       { x: 15, y: 86.3 },
    //       { x: 16, y: 85.9 },
    //       { x: 17, y: 84.9 }
    //     ]
    //   });
    //   this.$firestore.dataM.update({
    //     data: [
    //       { x: 11, y: 108.2 },
    //       { x: 12, y: 107.1 },
    //       { x: 13, y: 107.1 },
    //       { x: 14, y: 106.9 },
    //       { x: 15, y: 106.5 },
    //       { x: 16, y: 107.2 },
    //       { x: 17, y: 107.1 }
    //     ]
    //   });
    //   this.$firestore.dataT.update({
    //     data: [
    //       { x: 11, y: 96.4 },
    //       { x: 12, y: 95.0 },
    //       { x: 13, y: 95.6 },
    //       { x: 14, y: 95.3 },
    //       { x: 15, y: 94.6 },
    //       { x: 16, y: 95.2 },
    //       { x: 17, y: 94.4 }
    //     ]
    //   });
    // }
  },
  async mounted() {
    // eslint-disable-next-line no-unused-vars
    const user = await fb.auth().currentUser;

    this.loaded = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
