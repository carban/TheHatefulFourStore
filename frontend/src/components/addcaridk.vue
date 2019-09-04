<!-- <template lang="html">
  <div class="bgb">
    asas<input v-model="username"></input>
    asas<input v-model="name"></input>
    asas<input v-model="email"></input>
    asas<input v-model="date"></input>
    asas<input v-model="password"></input>
    asas<input v-model="confirm"></input>
    asas<button v-on:click="register()">CLICKME</button>
    <ul>
      <li v-for="item in new_categos">{{item}}</li>
    </ul>
  </div>

</template>

<script>
export default {
  data(){
    return{
      username: null,
      name: null,
      email: null,
      date: null,
      password: null,
      confirm: null,
      new_categos: [],
      cate: null,
      resp: false
    }
  },
  methods:{
    add(){
      this.new_categos.push(this.cate);
    },
    register(){
      if (this.password == this.confirm) {
        if (this.username != null || this.name != null || this.email != null || this.date != null) {
          this.resp = true;
        }
      }else{
       this.resp = false;
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .bgb{
    background-color: red
  }
</style> -->
<template lang="html">
  <div class="">
    <input v-model="user"></input>
    <input v-model="password"></input>
    <button v-on:click="login()">CLICKME</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user: null,
      password: null,
      success: false,
      snack: false,
    }
  },
  methods:{
    login(){
      this.success = false;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
