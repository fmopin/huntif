<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>
<!-- <style lang="stylus" src="../Home/Home.styl"></style> -->



<template>
<div>

  <span>Post Id: </span>
  <span>{{this.postId}}</span>
  <span> Post Name: </span>
  <span>{{this.$route.params.postName}}</span>

  <canvas id="myChart" width="400" height="400"></canvas>

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
        postId: this.$route.params.postId,
        loader:0,
        votesTotal: this.$route.params.postVotes,
        days: _.range(31),
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
        this.loader = 0
        axios.get(`v1/posts/${this.postId}/votes`, {params: {newer: this.lastVoteId, order: 'asc'}})
        // axios.get(`v1/posts/${this.postId}/votes`)
          .then((response) => {

            // console.log(response)

            if (this.votes.length < this.votesTotal) {

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
              this.votes = this.votes.splice(0, this.votesTotal)
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

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(this.dataSet),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(this.dataSet),
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)'
                    // ],
                    // borderColor: [
                    //     'rgba(255,99,132,1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
      }
  }
}

</script>
