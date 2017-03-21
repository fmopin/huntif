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

  export default {

    data() {
      return {
        votes: [],
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
            // console.log(response)

            if (this.votes.length < this.votesTotal) {

              for (let i = 0; i < response.data.votes.length; i++) {
                this.votes.push(response.data.votes[i].created_at)
              }
              this.lastVoteId = this.votes[this.votes.length-1]

              this.getVotes()
            }
            else {
              this.votes = this.votes.splice(0, this.votesTotal)
            }
            
          })
          .catch(function (error) {
            console.log(error)
          });

        // console.log('getPosts...')
      }
    }
  }

</script>
