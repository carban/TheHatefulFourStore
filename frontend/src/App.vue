<template>
  <v-app class="bg">

    <!-- TOP BANNER -->
    <template>
      <v-toolbar dark fixed color="primary">
        <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">
          <v-icon medium>videogame_asset</v-icon>
          The Hateful 4 Store
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

        <v-btn icon v-if="logged && !addd" v-on:click="commitSheet()">
          <v-badge left color="red">
            <template v-slot:badge>
              <span>{{itemsOnCar}}</span>
            </template>
            <v-icon>
              shopping_cart
            </v-icon>
          </v-badge>
        </v-btn>

        <v-btn @click="getGamess()" icon>
          <v-icon>refresh</v-icon>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
              <v-list v-if="logged">
                <v-list-tile>
                  <v-list-tile-title  class="outme" v-on="on" @click="logout()">
                    Logout
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
         </v-menu>



      </v-toolbar>
    </template>

    <!-- CONTENT -->
    <v-content id="acontent">
      <v-container grid-list-xs,sm,md,lg,xl>
        <router-view/>
      </v-container>
    </v-content>

    <!-- LEFT MENU -->
    <template>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list>
          <!-- logged ? : true -->
          <!-- item.title == 'Login' && item.title == 'Register' -->
          <v-list-tile v-for="item in items" :key="item.title" :to="item.url" v-if="logged ? (item.title != 'Login' && item.title != 'Register') : item.title != 'Profile'">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>

          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Categories</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-group v-for="(item, index) in categos" :key="index" no-action sub-group value="true">
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>
                    {{item.catnombre}}
                  </v-list-tile-title>
                </v-list-tile>
              </template>

              <v-list-tile v-for="(sub, i) in subcategos[index]" :key="i" @click="searchBy(sub.subnombre)">
                <v-list-tile-action>
                  <v-icon>gamepad</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{sub.subnombre}}</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </template>

    <car/>

  <!-- FOOTER -->
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
    },
    logged(){
      return this.$store.getters.loggedIn;
    },
    categos(){
      return this.$store.getters.catego;
    },
    subcategos(){
      return this.$store.getters.subcatego;
    },
    addd(){
      console.log(this.$store.getters.admin);
      return this.$store.getters.admin;
    }
  },
  beforeCreate(){
    this.$store.dispatch('getCategories');
    this.$store.dispatch('getSubcategories');
    this.$store.dispatch('getGames');
  },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', url: '/' },
        { title: 'Profile', icon: 'person', url: '/profile'},
        { title: 'About', icon: 'question_answer', url:'/myabout' },
        { title: 'Login', icon: 'account_box', url:'/login' },
        { title: 'Register', icon: 'accessibility', url:'/register' }
      ],
      // catego: [
      //     { title: 'Cat 1', url: '/' },
      //     { title: 'Cat 2', url: '/' },
      //     { title: 'Cat 3', url: '/' },
      //     { title: 'Cat 4', url: '/' },
      //     { title: 'Cat 5', url: '/' },
      //   ],
      // subcatego: [
      //       [{ title: 'sub 1', icon: 'gamepad', url: '/register' },
      //        { title: 'sub 1', icon: 'gamepad', url: '/register' }],
      //       [{ title: 'sub 2', icon: 'gamepad', url: '/register' }],
      //       [{ title: 'sub 3', icon: 'gamepad', url: '/register' }],
      //       [{ title: 'sub 4', icon: 'gamepad', url: '/register' }],
      //       [{ title: 'sub 5', icon: 'gamepad', url: '/register' }],
      //     ],
      searching: false,
      snack: false,
      logout() {
        this.$store.dispatch("logout");
        this.$store.dispatch('getGames');
        this.$store.commit('setAdmin', false);
        this.$router.push({name: 'logoutmsg'});
      }
    }
  },
  methods: {
    commitSheet(){
      this.$store.commit('sheet');
    },
    searchBy(title){
      this.$store.dispatch('getGamesSearchBy', title);
    },
    getGamess(){
      this.$store.dispatch('getGames');
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
  .outme{
    cursor: pointer;
  }
</style>
