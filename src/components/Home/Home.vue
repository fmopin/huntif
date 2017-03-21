<!-- CSS -->
<style lang="stylus" src="./Home.styl"></style>

<!-- HTML -->
<template>
  <div>


    <div class="app-header">
      <h1 class="app-title">ProductHunt</h1>
      <p class="app-tagline">The best new products, every day</p>
    </div>

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
