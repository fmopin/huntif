<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>
<!-- <style lang="stylus" src="../Home/Home.styl"></style> -->



<template>

<div v-if='loader < 2' class="posts-list__loader">
  <img src="../../img/loader.gif" alt="loader">
</div>

<div v-else-if="loader===2" class="wrapper-post">

  <img class="post-banner" :src="post.screenshot_url['850px']" alt="">

  <div class="post-main">
    <div class="post-main-desc">
      <div class="post-main-desc-project">
        <img class="post-main-desc-project__img" :src="post.thumbnail.image_url" alt="">
        <h2 class="post-main-desc-project__h2">{{post.name}}</h2>
        <p class="post-main-desc-project__p">{{post.tagline}}</p>
      </div>

      <div class="post-main-desc-maker">
        <img class="post-main-desc-maker__img" v-for="maker in post.makers" :src="maker.image_url['120px']" alt="">
        <h2 class="post-main-desc-maker__h2" v-for="maker in post.makers">{{maker.name}}</h2>
        <a v-for="maker in post.makers" :href="twitterUrl(maker)" taget="_blank"><img class="post-main-desc-maker__twitterimg" src="../../img/logo_twitter.png" alt="Twitter"></a>
      </div>
    </div>

    <ul class="post-comments">
      <post-list-comment v-for="comment in post.comments" :key="post.id" :comment="comment"></post-list-comment>
    </ul>
  </div>

  <aside class="post-votes">
    <a class="post-votes__button" v-on:click="postVote()" >Voter pour ce projet</a>
    <audio id="audio" :src="sound"></audio>

    <div class="post-votes__chart">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </aside>

</div>
</template>


<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'
  import Chart from 'chart.js'

  // Import du composant PostsListComment
  import PostListComment from '../PostListComment/PostListComment.vue'

  export default {

    name: 'post',

    components: {
      'post-list-comment': PostListComment
    },

    data() {
      return {
        votes: [],
        // postId: this.$route.params.postId,
        loader:0,
        // votesTotal: this.$route.params.postVotes,
        lastVoteId: 0,
        dataSet: [],
        post: null,
        response: false,
        sound: new Audio(this.getAbsoluteUrl('../../../Public/ah.mp3'))
      }
    },

    created() {
      this.getPost()
    },

    methods: {

      twitterUrl(maker) {
        return `https://twitter.com/${maker.twitter_username}`
      },

      getVotes() {
        //requete ProductHunt

        console.log('get votes function executed')

        axios.get(`v1/posts/${this.post.id}/votes`, {params: {newer: this.lastVoteId, order: 'asc'}})
        // axios.get(`v1/posts/${this.$route.params.postId}/votes`)
          .then((response) => {

            // console.log(response)

            if (this.votes.length < this.post.votes_count) {

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
              this.votes = this.votes.splice(0, this.post.votes_count)
              this.loader += 1
              this.$nextTick(() => {
                this.votesPerDay()
              })
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
                    lineTension: 0.3,
                    backgroundColor: "rgba(109, 102, 203, 0.8)",
                    borderColor: "rgb(210, 209, 214)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgb(215, 136, 169)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 5,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(215, 136, 169)",
                    pointHoverBorderColor: "rgb(215, 136, 169)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                }]
            },

            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                xAxes: [{
                          gridLines: {
                              display:false
                          }
                        }],
                yAxes: [{
                          gridLines: {
                              display:false
                          }
                        }]
              }
            }
        })
      },

      getPost () {
        https://api.producthunt.com/v1/docs/posts/posts_show_get_details_of_a_post
        axios.get(`v1/posts/${this.$route.params.postId}/`, {params: {id: this.$route.params.postId}})
          .then((response) => {
            console.log(response.data.post)
            this.post = response.data.post
            this.getVotes()
            this.loader += 1

          })
          .catch(function (error) {
            console.log(error)
          });
      },

      getAbsoluteUrl(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
      },

      postVote () {

        console.log(this.sound)
        this.sound.play()

      }
  }
}

</script>
