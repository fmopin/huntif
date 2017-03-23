<!-- CSS -->
<style lang="stylus" src="./PostsListComment.styl"></style>

<!-- HTML -->
<template>

  <li class="post-list-comment">

    <p class="post-list-comment__p">{{comment.body}}</p>

  </li>

</template>

<!-- JS -->
<script>

  export default {
    props: ['comment']
  }

</script>
