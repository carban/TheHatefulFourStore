<template>
  <div class="">
    <v-container grid-list-xs,sm,md,lg,xl>
      <!-- <v-snackbar v-model="snackbar" top right multi-line timeout="6000" color="success">
        hola
        <v-btn color="white" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar> -->
      <v-carousel v-if="banner" hide-controls>
        <v-carousel-item
          v-for="(item,i) in pics" :key="i" :src="item.src">
        </v-carousel-item>
      </v-carousel>

      <v-layout v-if="allgames.length > 0" row wrap>

        <v-card v-for="(item, index) in allgames" :key="index" dark
        :color=item.color :style="{'width':'369px', 'margin-right': '10px', 'margin-bottom':'10px'}">

          <v-layout class="product" v-on:click="setCurrent_product(item)" justify-space-between>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.junombre}}</div>
                  <div>{{item.jucompany}}</div>
                  <div>({{item.juyear}})</div>
                  <div v-if="item.judescuentoactual > 0" ><del><b>{{item.juprecio}}</b></del></div>
                  <div v-if="item.judescuentoactual > 0" class="price_style"><b>{{beirut(item.juprecio, item.judescuentoactual, index)}}</b></div>
                  <div v-if="item.judescuentoactual > 0" class="oferta">
                    <center>
                      <b>{{item.judescuentoactual}}% OFF</b>
                    </center>
                  </div>

                  <div v-if="item.judescuentoactual == 0" class="price_style"><b>{{item.juprecio}}</b></div>
                </div>
              </v-card-title>

            </v-flex>
            <v-img class="shrink ma-2" contain height="125px" :src="item.juimage"
              style="flex-basis: 125px"
            ></v-img>
          </v-layout>

          <v-divider dark></v-divider>
          <v-card-actions class="pa-3">
            <v-btn absolute v-if="!item.added && logged" color="primary" v-on:click="addItem(index)" >
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn absolute v-if="item.added && logged" color="warning" v-on:click="removeItem(index)">
              <v-icon>cancel</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 caption mr-2">
              ({{item.jurating}})
            </span>
            <v-rating v-model="item.jurating" readonly background-color="white" color="yellow accent-4" dense half-increments hover size="18">
            </v-rating>
          </v-card-actions>


        </v-card>
      </v-layout>

      <v-layout v-if="allgames.length == 0" row wrap>
        <h1>No Results</h1>
      </v-layout>

      <v-dialog light v-model="dialog" max-width="900px">
                <v-card>
                  <iframe width="100%" height="480" src="https://www.youtube.com/embed/piIgkJWDuQg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <v-card-text>
                     <h1>{{current_product.junombre}}</h1>
                     <h3>{{current_product.jucompany}}</h3>
                     <p>{{current_product.judescription}}</p>

                     <v-list two-line>
                       <v-subheader>
                         Comments
                       </v-subheader>

                               <template v-for="(item, index) in comments">

                                 <v-divider></v-divider>

                                 <v-list-tile>
                                   <v-list-tile-avatar>
                                     <img :src="item.avatar">
                                   </v-list-tile-avatar>

                                   <v-list-tile-content>
                                     <v-list-tile-title v-html="item.user"></v-list-tile-title>
                                     <v-list-tile-sub-title v-html="item.msg"></v-list-tile-sub-title>
                                   </v-list-tile-content>
                                 </v-list-tile>
                               </template>

                               <template>

                                 <v-divider></v-divider>

                                 <v-list-tile>
                                   <v-list-tile-avatar>
                                     <img :src="user.avatar">
                                   </v-list-tile-avatar>
                                   <v-list-tile-content>
                                     <v-list-tile-title>{{user.cliusuario}}</v-list-tile-title>
                                     <br>
                                     <v-list-tile-sub-title>
                                       <v-list-tile avatar>
                                         <v-text-field></v-text-field>
                                         <v-btn color="primary">Comment</v-btn>
                                       </v-list-tile>


                                       <!-- <v-bt n color="primary">Comment</v-btn> -->
                                     </v-list-tile-sub-title>
                                   </v-list-tile-content>
                                 </v-list-tile>
                               </template>

                             </v-list>



                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
      </v-dialog>



    </v-container>

  </div>
</template>

<script>

  var blade = require('@/assets/blade.gif');
  var spacegirl = require('@/assets/spacegirl.gif');
  var gaming = require('@/assets/gaming.jpg');
  var drive = require('@/assets/drive.gif');
  var pc = require('@/assets/pc.gif');



  export default {
    beforeCreate(){
      if (this.banner) {
        this.$store.dispatch('getGames');
      }
    },
    computed: {
      user(){
        return this.$store.getters.profile;
      },
      allgames(){
        // return this.$store.getters.games.filter((game) => {
        //   let low_game = game.junombre.toLowerCase();
        //   return low_game.match(this.$store.getters.getWordSearch.toLowerCase());
        // })
        let presentGames = this.$store.getters.games;
        let buseta = this.$store.getters.car;

        // Verifica que se encuentren seleccionados los elementos que ya estan en el carro
        // de compras, entonces no el usuario no puede volver a seleccionar el mismo juego
        if (buseta.length > 0) {
            for(let i in buseta){
              if(buseta[i].added){
                for(let j in presentGames){
                  if (presentGames[j].juid == buseta[i].juid) {
                    presentGames[j].added = true;
                  }
                }
              }
            }
        }

        return presentGames;
      },
      logged(){
        return this.$store.getters.loggedIn;
      },
      banner(){
        return this.$store.getters.banner;
      }
    },
    data: () => ({
      pics: [
        {src: blade},
        {src: spacegirl},
        {src: gaming},
        {src: pc},
        {src: drive},
      ],
      dialog: false,
      current_product: {junombre: null, judescription: null},
      comments: [{user: "user1", msg: "sdkfjskdjfkdsjfksd kdsjf ksjd kfsjd ksjf ksdjfksjfs"},
      {user: "user1", msg: "sdkfjskdjfkdsjfksd kdsjf ksjd kfsjd ksjf ksdjfksjfs"},
      {user: "user1", msg: "sdkfjskdjfkdsjfksd kdsjf ksjd kfsjd ksjf ksdjfksjfs"},
      {user: "user1", msg: "sdkfjskdjfkdsjfksd kdsjf ksjd kfsjd ksjf ksdjfksjfs"},
      ]
    }),
    methods: {
      addItem(index){
        this.allgames[index].added = true;
        this.$store.commit('AdditemsOnCar', this.allgames[index]);
      },
      removeItem(index){
        this.allgames[index].added = false;
        this.$store.commit('RemoveitemsOnCar', this.allgames[index].juid);
      },
      setCurrent_product(proc){
        this.dialog = !this.dialog;
        this.current_product = proc;
      },
      beirut(real, desc, index){
        let price = real.split("$");
        let priceFloat = parseFloat(price[1]);
        let priceWithDiscount = (priceFloat - (priceFloat * desc) / 100).toFixed(2);
        return "$"+priceWithDiscount;
      }
    }
  }
</script>

<style>
  .product{
    cursor: pointer;
  }
  .price_style{
    font-size: 20px;
  }
  .oferta{
    margin-left: 70px;
    margin-top: -30px;
    position: absolute;
    height: 25px;
    width: 80px;
    background-color: yellow;
    color: red;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -webkit-box-shadow: 0px 20px 41px -29px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 20px 41px -29px rgba(0,0,0,0.75);
    box-shadow: 0px 20px 41px -29px rgba(0,0,0,0.75);
  }

</style>
