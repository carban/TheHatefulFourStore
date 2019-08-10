<template lang="html">

  <v-container grid-list-xs,sm,md,lg,xl>
    <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="success">
      Updated!
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snack2" top right multi-line :timeout=6000 color="error">
      Please check your input
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-tabs v-model="active" color="dark" slider-color="primary">
      <v-tab>
        Profile
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>CLIENT PROFILE</h1>
            <v-form>
              <v-text-field v-model="user.cliusuario" prepend-icon="person" name="name" label="Username" type="text" disabled></v-text-field>
              <v-text-field v-model="user.clinombre" prepend-icon="person" name="name" label="Name" type="text" required></v-text-field>
              <v-text-field v-model="user.clicorreo" prepend-icon="email" name="email" label="email" type="email" required></v-text-field>
              <v-text-field v-model="user.clifechanac" prepend-icon="add_location" name="birthday" label="birthday" type="date" required></v-text-field>
            </v-form>
            <v-btn color="secondary" @click="updateProfile">Update</v-btn>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        MY GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <h1>MY GAMES</h1>
          <v-layout row wrap>

            <!-- <v-card v-for="(item, index) in products" :key="index" dark
            :color=item.color :style="{'width': item.width, 'margin-right': '10px', 'margin-bottom':'10px'}"> -->
            <v-card v-for="(item, index) in mygames" :key="index" dark
            :color=item.color :style="{'width':'350px', 'margin-right': '10px', 'margin-bottom':'10px'}">

              <v-layout class="product" justify-space-between>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{item.junombre}}</div>
                      <!-- <div>{{item.comp}}</div> -->
                      <!-- <div>({{item.year}})</div> -->
                      <div>{{item.juprecio}}</div>
                    </div>
                  </v-card-title>

                </v-flex>
                <v-img class="shrink ma-2" contain height="125px" src="https://res.cloudinary.com/teepublic/image/private/s--xeppzKEN--/t_Preview/b_rgb:191919,t_Watermark/c_limit,f_jpg,h_630,q_90,w_630/v1540525490/production/designs/3389495_0.jpg"
                  style="flex-basis: 125px"
                ></v-img>
              </v-layout>

              <v-divider dark></v-divider>
              <v-card-actions class="pa-3">
                <v-btn color="info">
                  CLAIM
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>


            </v-card>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab>
        CLAIMS
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <h1>CLAIMS</h1>
          <center><h2>Coming soon</h2></center>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  computed:{
    user(){
      return this.$store.getters.profile;
    },
    mygames(){
      return this.$store.getters.myGames;
    }
  },
  data(){
    return{
      active: null,
      snack: false,
      snack2: false,
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('getGames');
    this.$store.dispatch('profileInfo')

  },
  methods: {

    updateProfile(){
      var newProfile = {
        cliusuario: this.user.cliusuario,
        clinombre: this.user.clinombre,
        clicorreo: this.user.clicorreo,
        clifechanac: this.user.clifechanac
      }
      this.$store.dispatch('updateProfileInfo', newProfile)
        .then(res => {
          console.log(res.data.msg);
          this.$store.dispatch('profileInfo')
            .then(res => {
              this.snack = true;
            })
            .catch(err => {
              this.snack2 = true;
          })
       })
    },

  }
}
</script>

<style lang="css" scoped>
</style>
