<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <center>
       <img src="https://66.media.tumblr.com/7814b667c7e3df33c8a42599bf3fc55a/tumblr_mqk9sjvjc21stkxqjo1_500.gif" alt="">
    </center>

    <div class="bye">
      <h1>See you space cowboy</h1>
      <router-link :to="{ name: 'Hello', params: {} }"><h2>Home</h2></router-link>
    </div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
  .bye{
    margin-top: 10%;
    margin-left: 70%;
  }
</style>
