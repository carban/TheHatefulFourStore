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
            <v-card v-for="(item, index) in mygames" :key="index" @click = "opengamedialog(index)"
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
          <!-- DIALOG GAME -->
          <!--  -->
          <!--  -->
          <!--  -->
          <!--  -->
          <v-dialog dark v-model="dialoggame" max-width="500px">
            <v-card>
              <v-card-text>
                <center>
                  <h1>{{gamecal.junombre}}</h1>
                  <p>Rate this game:</p>
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{gamecal.jurating}})
                </span>
                <v-rating v-model="gamecal.jurating" background-color="white" color="yellow" half-increments hover size="38">
                </v-rating>
                <v-divider></v-divider>
                <br>
                <v-btn color="success" href="http://shellshockers.io" block>INSTALL GAME</v-btn>
              </center>
              </v-card-text>
              <v-card-actions>
                <center>
                  <v-list-tile>
                  </v-list-tile>
                </center>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialoggame = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab>
        Bills
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>Bills</h1>
            <template>
              <div>
                  <v-divider
                    class="mx-2"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog light v-model="billdialog" max-width="500px">

                    <v-card>
                      <v-card-text>
                        <v-container grid-list-md>
                          <center>
                            <h1>Description of Bill</h1>
                          </center>
                          <br><br>
                          <v-layout v-for="(item, index) in aBill" :key="index">
                            <v-list-tile class="separate_bill">
                              <img :src="item.juimage" width="90px" height="90px" class="billimage"></img>
                              <v-text-field v-model="item.title" label="Title name" readonly></v-text-field>
                              <v-text-field v-model="item.price" label="Price name" readonly></v-text-field>
                            </v-list-tile>
                          </v-layout>
                          <v-list-tile>
                            <h1>Total: {{totalPriceBill}}</h1>
                          </v-list-tile>

                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="billdialog = false">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
                <v-data-table
                  :headers="headers"
                  :items="bills"
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td>Single Bill</td>
                    <td class="text-xs">{{ props.item.info.pagoid }}</td>
                    <td class="text-xs">{{ props.item.info.fechapago }}</td>
                    <td class="text-xs">{{ props.item.info.valoruno }}</td>
                    <td class="text-xs">{{ props.item.info.valordos }}</td>
                    <td class="text-xs">{{ props.item.info.valortres }}</td>
                    <td class="justify-center layout px-0">
                      <v-icon small class="mr-2" @click="showBill(props.item.games)">
                        edit
                      </v-icon>
                    </td>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="">Reset</v-btn>
                  </template>
                </v-data-table>
              </div>
            </template>
          Kill Bill
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
    },
    bills(){
      console.log(this.$store.getters.bills);
      return this.$store.getters.bills;
    },
    totalPriceBill(){
      let l = 0.0;
      for (var i = 0; i < this.aBill.length; i++) {
        let real = this.aBill[i].price;
        let price = real.split("$");
        let priceFloat = parseFloat(price[1]);
        l += priceFloat;
      }
      return "$"+l;
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
      newClaim: {title: null, description: null, state: 'Active'},
      // bills: [
      //   {game: "BILL 1", pagoid: "1", fechapago: "05/04/2019", valoruno: 40, valordos: 20, valortres: 70, games: [{title: "dfdfd", price: 23232}, {title: "dfdfd", price: 23232}]},
      //   {game: "BILL 3", pagoid: "3", fechapago: "05/04/2019", valoruno: 40, valordos: 20, valortres: 70},
      //   {game: "BILL 4", pagoid: "4", fechapago: "05/04/2019", valoruno: 40, valordos: 20, valortres: 70},
      //   {game: "BILL 5", pagoid: "5", fechapago: "05/04/2019", valoruno: 40, valordos: 20, valortres: 70},
      //   {game: "BILL 6", pagoid: "6", fechapago: "05/04/2019", valoruno: 40, valordos: 20, valortres: 70},
      // ],
      headers: [
        {
          text: 'List of games',
          sortable: false,
        },
        { text: 'Payment ID', value: 'pagoid' },
        { text: 'Date', value: 'fechapago' },
        { text: 'Fraction in Cash', value: 'valoruno' },
        { text: 'Fraction in Saving', value: 'valordos' },
        { text: 'Fraction in Credit', value: 'valortres' },
        { text: 'Actions', value: 'Actions' },
        ],
      rowsPerPage: 1,
      aBill: [{title: 'sds', price: '34343', juimage: 'sdf'}, {title: 'sds', price: '34343', juimage: 'fasfa'}],
      billdialog: false,
      dialoggame: false,
      gamecal: {junombre: null, juyear: null, juprecio: null}
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('getGames');
    this.$store.dispatch('profileInfo');

    this.$store.dispatch('getBills');

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
    opengamedialog(index){
      this.gamecal.junombre = this.mygames[index].junombre;
      this.gamecal.juyear = this.mygames[index].juyear;
      this.gamecal.jurating = this.mygames[index].jurating;
      this.dialoggame = true;
    },
    openAClaim(index){
      this.aClaim.title = this.claims[index].title;
      this.aClaim.description = this.claims[index].description;
      this.aClaim.state = this.claims[index].state;
      this.claim_dialog = true;
    },
    addclaim(){
      this.claims.push(this.newClaim);
    },
    showBill(item){
      this.billdialog = true;
      this.aBill = item;
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
.separate_bill{
  margin-bottom: 80px;
}
.billimage{
  border-radius: 50%;
}
</style>
