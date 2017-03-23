<!-- CSS -->
<style lang="stylus" src="./App.styl"></style>



<template lang="html">

  <div>

    <div class="app-header">
      <h1 class="app-title">ProductHunt</h1>
      <p class="app-tagline">The best new products, every day</p>
    </div>

    <keep-alive exclude="post">
      <router-view></router-view>
    </keep-alive>
  </div>


</template>


<script>
export default {
}
</script>
