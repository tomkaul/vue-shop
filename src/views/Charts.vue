<template>
  <div class="charts">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Chart Page</h3>
        <!-- <button @click="addData" class="btn btn-primary">Add Data</button> -->
      </div>
    </div>
    <div class="container" style="max-width: 600px">
      <line-chart v-if="dataReady" :chartData="chartData" :options="options" />
    </div>
    <div
      v-if="updateReady"
      class="row h-100 justify-content-center align-items-center"
    >
      <div class="col-md-12 float-left">
        <h4>Indtast din nye vægt herunder</h4>
      </div>
      <div class="col-md-8">
        <input
          v-model="newWeight"
          type="text"
          placeholder="Fx: 92.3"
          name="x"
          id="y"
        />
      </div>
      <div class="col-md-4">
        <button @click="addData" class="btn btn-primary">Add Data</button>
      </div>
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
      dataAll: db.collection("plotData")
    };
  },
  data() {
    return {
      dataAll: null,
      dataReady: false,
      updateReady: false,
      listener: null,
      newWeight: "",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Chart.js Line Chart"
        },
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
                labelString: "Weight-loss (kg)"
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    chartData() {
      let chartData = {
        // 20 weeks starting from week 11
        labels: Array.from({ length: 20 }, (v, k) => k + 11),
        datasets: []
      };
      if (this.dataAll) {
        const colors = ["#ff6384", "#36a2eb", "#8e5ea2", "#3cba9f"];
        let i = 0;
        for (let data of this.dataAll) {
          let startWeight = data.data[0].y;
          chartData.datasets.push({
            label: data.id,
            data: data.data.map(val => {
              return { x: val.x, y: val.y - startWeight };
            }),
            fill: false,
            backgroundColor: "#000",
            borderColor: colors[i++]
          });
        }
        // Set the target line
        chartData.datasets.push({
          label: "Target",
          fill: false,
          data: [
            { x: 11, y: 0 },
            { x: 30, y: -10 }
          ]
        });
      }
      return chartData;
    }
  },
  methods: {
    canDataBeAdded() {
      var user = fb.auth().currentUser;
      for (let data of this.dataAll) {
        if (data.id === user.displayName) {
          let lastDataWeek = data.data[data.data.length - 1].x;
          this.updateReady = lastDataWeek < this.getWeekNumber(); // | true
          break;
        }
      }
    },
    addData() {
      var user = fb.auth().currentUser;
      // console.log(user.displayName);
      for (let data of this.dataAll) {
        if (data.id === user.displayName) {
          let dd = { ...data };
          dd.data.push({
            x: this.getWeekNumber(),
            y: this.newWeight
              .trim()
              .replace(/,/g, ".")
              .split(" ")[0]
          });
          db.collection("plotData")
            .doc(user.displayName)
            .update(dd)
            .then(() => {
              console.log("Added data to " + data.id);
            })
            .catch(err => {
              console.log(err);
            });
          break;
        }
      }
    },
    getData() {
      db.collection("plotData")
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push({ id: doc.id, data: doc.data().data });
          });
          this.dataAll = data;
          this.dataReady = true;
          // console.log("DATA FETCHED!");
          // Check if data update is possible
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    getWeekNumber() {
      // Get week number (2020)
      let date = new Date();
      // eslint-disable-next-line prettier/prettier
      let wn = Math.ceil((((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000 + 2) / 7));
      // console.log(wn);
      return wn;
    }
  },
  mounted() {
    // Listen to updates
    this.listener = db.collection("plotData").onSnapshot(
      () => {
        this.getData();
        this.canDataBeAdded();
      },
      error => {
        console.log(error);
      }
    );
  },
  beforeDestroy() {
    this.listener();
  }
};
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
