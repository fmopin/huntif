<!-- CSS -->
<style lang="stylus" src="./PostsListComment.styl"></style>

<!-- HTML -->
<template>

  <li class="post-list-comment">

    <p class="post-list-comment__content">{{comment.body}}</p>
    <a v-if="response === true" class="post-list-comment__readMore" v-on:click="displayChildComments()">Lire Moins</a>
    <a v-if="response === false && comment.child_comments.length > 0" class="post-list-comment__readMore" v-on:click="displayChildComments()">Lire Plus</a>

    <ul v-if="response === true" class="post-list-comment">
      <li class="post-list-comment__content" v-for="child in comment.child_comments">
        {{child.body}}
      </li>
    </ul>

  </li>

</template>

<!-- JS -->
<script>

  export default {
    props: ['comment'],

    data() {
      return {
        response: false
      }
    },

    methods: {

      displayChildComments() {
        if (this.response ===false) {
          this.response = true
        }
        else {
          this.response = false
        }
      }

    }
  }

</script>
