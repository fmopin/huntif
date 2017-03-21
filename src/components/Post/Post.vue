<!-- CSS -->
<style lang="stylus" src="./Post.styl"></style>
<!-- <style lang="stylus" src="../Home/Home.styl"></style> -->



<template>
<div>

  <span>Post Id: </span>
  <span>{{this.postId}}</span>
  <span> Post Name: </span>
  <span>{{this.$route.params.postName}}</span>

</div>
</template>


<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'

  console.log('coucou');

  export default {

    data() {
      return {
        votes: null,
        postId: this.$route.params.postId,
        loader:0,
        votesTotal: this.$route.params.postVotes,
        days: _.range(31),
        lastVoteId: 0
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
          .then((response) => {
            console.log(response)
            for (var i = 0; i < response.data.votes.length; i++) {
              this.votes.push = response.data.votes
            }

            this.lastVoteId = this.votes[this.votes.length-1]

            if (this.votes.length != this.votesTotal) {
              console.log(this.lastVoteId)
              console.log('pas assez de votes')
              this.getVotes()
            }
            else {
              console.log('assez de votes')
            }
            // this.countStats()
            // this.loader = 1
          })
          .catch(function (error) {
            console.log(error)
          });

        // console.log('getPosts...')
      }
    }
  }

</script>
