<!-- CSS -->
<style lang="stylus" src="./PostsListItem.styl"></style>

<!-- HTML -->
<template>

  <li class="posts-list-item">

    <router-link class="posts-list-item__a" :to="{name:'post_component', params: {
        postId: post.id,
        postName: post.name.replace(/\s/g, '-'),
        /*postTagline: post.tagline,
        postVotes: post.votes_count,
        postImage: post.thumbnail.image_url,
        postScreenshot: post.screenshot_url,
        makerName: post.makers.name,
        makerImage: post.makers.image_url,
        makerTwitter: post.makers.twitter_username*/
      }}">
      <img :src="post.thumbnail.image_url" alt="">
    </router-link>

    <h2 class="posts-list-item__h2">{{post.name}}</h2>
    <p class="posts-list-item__p">{{post.votes_count}} Upvotes</p>
    <h4 class="posts-list-item__h4">{{post.tagline}}</h4>
  </li>

</template>

<!-- JS -->
<script>

  export default {
    props: ['post', 'loader']
  }

</script>
