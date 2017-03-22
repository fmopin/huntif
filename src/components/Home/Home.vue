<!-- CSS -->
<style lang="stylus" src="./Home.styl"></style>

<!-- HTML -->


<template>
  <div>

    <posts-list ></posts-list>

  </div>
</template>


<!-- JS -->
<script>

  // Import du composant PollsList
  import PostsList from '../PostsList/PostsList.vue'

  export default {

    components: {
      'posts-list': PostsList
    }

  }

</script>
