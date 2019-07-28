<template>
  <v-app class="bg">

    <template>
      <v-toolbar dark fixed color="primary">
        <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">
          <v-icon medium>videogame_asset</v-icon>
          Store
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="!searching" v-on:click="searching = !searching" icon>
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn v-if="searching" v-on:click="searching = !searching" icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-flex v-if="searching">
          <v-text-field dark color="white"
            label="Search"
          ></v-text-field>
        </v-flex>

        <v-btn icon v-on:click="commitSheet()">
          <v-badge left color="red">
            <template v-slot:badge>
              <span>{{itemsOnCar}}</span>
            </template>
            <v-icon>
              shopping_cart
            </v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </template>


    <v-content id="acontent">
      <v-container grid-list-xs,sm,md,lg,xl>
        <router-view/>
      </v-container>
    </v-content>



    <template>
      <v-layout wrap style="height: 200px;">
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon medium>videogame_asset</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Store</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile v-for="item in items" :key="item.title" :to="item.url">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </template>



    <car/>


      <template>
      <v-footer dark height="auto">
        <v-card flat tile class="primary lighten-1 white--text text-lg-center ablock">
          <v-card-text class="white--text">
            &copy;2019 — <strong>The Hateful 4</strong>
          </v-card-text>
        </v-card>
      </v-footer>
  </template>

  </v-app>
</template>

<script>
import car from './components/car';
export default {
  name: 'App',
  components: {'car': car},
  computed: {
    itemsOnCar(){
      return this.$store.getters.itemsOnCar;
    },
    sheet(){
      return this.$store.getters.sheet;
    }
  },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', url: '/' },
        { title: 'About', icon: 'question_answer', url:'/myabout' },
        { title: 'Login', icon: 'account_box', url:'/login' },
        { title: 'Register', icon: 'accessibility', url:'/register' }
      ],
      searching: false
    }
  },
  methods: {
    commitSheet(){
      this.$store.commit('sheet');
    }
  }
}
</script>

<style scoped>
  .ablock{
    width: 100%;
  }
  #acontent{
    margin-top: 50px;
  }
</style>
