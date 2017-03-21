<!-- CSS -->
<style lang="stylus" src="./PostsList.styl"></style>

<!-- HTML -->
<template>
  <div class="wrapper">

    <div class="posts-list-filters">
      <select v-model='daysAgo' @change='getPosts(daysAgo)' class="" name="selectDate">
        <option v-for='day in days' :value="day">{{selectDaysLabel(day)}}</option>
      </select>
    </div>

    <ul class="posts-list-stats">
      <li class="posts-list-stats__li" v-for="stat in stats">
        <p class="posts-list-stats__li--nbr">{{stat.count}}</p>
        <p class="posts-list-stats__li--label">{{stat.label}}</p>
      </li>
    </ul>

    <ul class="posts-list">
      <posts-list-item v-if="loader === 1" v-for="post in posts" :key="post.id" :post="post" :loader="loader"></posts-list-item>
      <div class="posts-list__loader" v-if='loader === 0'>
        <img src="../../img/loader.gif" alt="loader">
      </div>
    </ul>

  </div>
</template>

<!-- JS -->
<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'

  // Import du composant PostsListItem
  import PostsListItem from '../PostsListItem/PostsListItem.vue'

  export default {

    components: {
      'posts-list-item': PostsListItem
    },

    data() {
      return {
        posts: null,
        loader:0,
        daysAgo: 0,
        days: _.range(31),
        stats: {
          posts: {
            count: 0,
            label: 'Posts'
          },
          votes: {
            count: 0,
            label: 'Votes'
          },
          comments: {
            count: 0,
            label: 'Comments'
          },
          makers: {
            count: 0,
            label: 'Makers'
          }
        }
      }
    },

    created() {

      this.getPosts()
    },

    methods: {

      getPosts() {
        //requete ProductHunt
        this.loader = 0
        axios.get('/v1/posts', {params: {days_ago: this.daysAgo}})
          .then((response) => {
            // console.log(response)
            this.posts = response.data.posts
            this.countStats()
            this.loader = 1
          })
          .catch(function (error) {
            console.log(error)
          });

        // console.log('getPosts...')
      },

      countStats() {
        // Appeler cette méthode pour calculer les stats à chaque fois qu'on récupère les posts
        this.stats.posts.count = this.posts.length
        let totalVotes = 0
        let totalComments = 0
        let totalMakers = 0
        _.each(this.posts, function(post) {
          totalVotes += post.votes_count
          totalComments += post.comments_count
          totalMakers += post.makers.length
        })

        this.stats.votes.count = totalVotes
        this.stats.comments.count = totalComments
        this.stats.makers.count = totalMakers

      },

      selectDaysLabel(day) {
        // Retourne "Today", "Yesterday", ou "X days ago" en fonction de "day"
        let label
        if (day === 0) label = 'Today'
        else if (day === 1) label = 'Yesterday'
        else label = `${day} days ago`
        return label
      }
    }
  }

</script>
