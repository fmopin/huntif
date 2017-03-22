<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>
<!-- <style lang="stylus" src="../Home/Home.styl"></style> -->



<template>
<div>

  <span>Post Id: </span>
  <span>{{this.$route.params.postId}}</span>
  <span> Post Name: </span>
  <span>{{this.$route.params.postName}}</span>

  <div class="chart">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>

</div>
</template>


<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'
  import Chart from 'chart.js'

  export default {

    data() {
      return {
        votes: [],
        // postId: this.$route.params.postId,
        loader:0,
        // votesTotal: this.$route.params.postVotes,
        lastVoteId: 0,
        dataSet: []
      }
    },

    created() {
      this.getVotes()
    },

    methods: {

      getVotes() {
        //requete ProductHunt

        console.log('get votes function executed')

        this.loader = 0
        axios.get(`v1/posts/${this.$route.params.postId}/votes`, {params: {newer: this.lastVoteId, order: 'asc'}})
        // axios.get(`v1/posts/${this.$route.params.postId}/votes`)
          .then((response) => {

            // console.log(response)

            if (this.votes.length < this.$route.params.postVotes) {

              for (let i = 0; i < response.data.votes.length; i++) {
                this.votes.push({
                  id: response.data.votes[i].id,
                  date: response.data.votes[i].created_at
                })
              }
              this.lastVoteId = this.votes[this.votes.length-1].id

              this.getVotes()
            }
            else {
              this.votes = this.votes.splice(0, this.$route.params.postVotes)
              this.votesPerDay()
            }
          })
          .catch(function (error) {
            console.log(error)
          });

        // console.log('getPosts...')
      },

      votesPerDay() {

        let hours = []
        let count = {}

        for (var i = 0; i < this.votes.length; i++) {
          hours.push(new Date(this.votes[i].date).getHours())
        }

        hours.forEach(function(i) { count[i] = (count[i]||0)+1;  });
        this.dataSet = count
        this.createChart()
      },

      createChart() {

        var ctx = document.getElementById("myChart").getContext("2d")
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(this.dataSet),
                datasets: [{
                    label: 'Numbers of Votes per hours',
                    data: Object.values(this.dataSet),
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                }]
            },

            option: {
              responsive: true,
              maintainAspectRatio: false,
            }
        })
      }
  }
}

</script>
