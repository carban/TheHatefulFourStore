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
            <v-btn color="pink" @click="updateProfile">Update</v-btn>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        MY GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
         <v-container grid-list-xs,sm,md,lg,xl>
          <h1>MY GAMES</h1>
          <v-layout row wrap>

            <!-- <v-card v-for="(item, index) in products" :key="index" dark
            :color=item.color :style="{'width': item.width, 'margin-right': '10px', 'margin-bottom':'10px'}"> -->
            <v-card v-for="(item, index) in mygames" :key="index"
            :color=item.color :style="{'width':'350px', 'margin-right': '10px', 'margin-bottom':'10px'}">

              <v-layout class="product" justify-space-between>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{item.junombre}}</div>
                      <div>{{item.jucompany}}</div>
                      <div>({{item.juyear}})</div>
                      <div>{{item.juprecio}}</div>
                    </div>
                  </v-card-title>

                </v-flex>
                <v-img class="shrink ma-2" contain height="125px" :src="item.juimage"
                  style="flex-basis: 125px"
                ></v-img>

              </v-layout>
              <v-divider dark></v-divider>
            </v-card>
          </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab>
        CLAIMS
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>CLAIMS</h1>
            <br>
            <br>

            <v-card class="elevation-20">
              <v-list-tile avatar>
                <v-text-field v-model="newClaim.title" label="Title"></v-text-field>
                <v-text-field v-model="newClaim.description" label="Description"></v-text-field>

                <v-btn fab dark color="#45a2d2" name="addbtn" @click="addclaim()">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-list-tile>
            </v-card>

            <br><br><br>
            <!-- LIST OF CLAIMS -->
            <v-list-tile class="climlistbg elevation-5" ipple v-for="(item, index) in claims" :key="index" @click="openAClaim(index)">

              <v-list-tile-content>
                <v-list-tile-title>
                  <b>{{item.title}}: </b>
                  <b v-if="item.state == 'Active'" class="activeR">Active</b>
                  <b v-if="item.state == 'Resolved'" class="resolvedR">Resolved</b>

                </v-list-tile-title>
                <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <!--  -->

            <!-- Dialog for claims  -->
            <!--  -->
            <v-dialog light v-model="claim_dialog" max-width="900px">
              <v-card>
                <v-card-text>
                  <v-layout row wrap>
                    <v-card-text>
                      <v-list-tile avatar>
                        <h1>{{aClaim.title}}:</h1>
                        <h1 v-if="aClaim.state == 'Active'" class="activeR" >&nbsp;Active</h1>
                        <h1 v-if="aClaim.state == 'Resolved'" class="resolvedR" >&nbsp;Resolved</h1>
                      </v-list-tile>
                    </v-card-text>
                    <v-card>
                      <v-card-text>
                        {{aClaim.description}}
                      </v-card-text>
                    </v-card>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <center>
                    <v-list-tile>
                      <v-btn color="error" @click="claim_dialog = false">CLOSE</v-btn>
                    </v-list-tile>
                  </center>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!--  -->
            <!--  -->



          </v-container>
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
      claims: [{title: 'Claim 1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', state: 'Active'},
    {title: 'Claim 2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    state: 'Resolved'}],
      aClaim: {title: null, description: null, state: null},
      claim_dialog: false,
      newClaim: {title: null, description: null, state: 'Active'}
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
    openAClaim(index){
      this.aClaim.title = this.claims[index].title;
      this.aClaim.description = this.claims[index].description;
      this.aClaim.state = this.claims[index].state;
      this.claim_dialog = true;
    },
    addclaim(){
      this.claims.push(this.newClaim);
    }
  }
}
</script>

<style lang="css" scoped>
.climlistbg{
  cursor: pointer;
  background-color: #45a2d2;
  margin-top: 10px;
}
.activeR{
  color: lime
}
.resolvedR{
  color: orange;
}
</style>
