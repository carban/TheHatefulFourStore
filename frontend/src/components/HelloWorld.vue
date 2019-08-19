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

        <!-- <v-card v-for="(item, index) in products" :key="index" dark
        :color=item.color :style="{'width': item.width, 'margin-right': '10px', 'margin-bottom':'10px'}"> -->
        <v-card v-for="(item, index) in allgames" :key="index" dark
        :color=item.color :style="{'width':'369px', 'margin-right': '10px', 'margin-bottom':'10px'}">

          <v-layout class="product" v-on:click="setCurrent_product(item)" justify-space-between>
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
            <v-rating v-model="item.jurating" background-color="white" color="yellow accent-4" dense half-increments hover size="18">
            </v-rating>
          </v-card-actions>


        </v-card>
      </v-layout>

      <v-layout v-if="allgames.length == 0" row wrap>
        <h1>No Results</h1>
      </v-layout>

      <v-dialog light v-model="dialog" persistent max-width="900px">
                <v-card>
                  <iframe width="100%" height="480" src="https://www.youtube.com/embed/piIgkJWDuQg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <v-card-text>
                     <h1>{{current_product.junombre}}</h1>
                     <h3>{{current_product.judescription}}</h3>

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
  export default {
    beforeCreate(){
      this.$store.dispatch('getGames');
    },
    computed: {
      allgames(){
        return this.$store.getters.games;
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
        {src: 'https://i.imgur.com/S7CV4nw.gif'},
        {src: 'https://i.imgur.com/N0haYzT.gif'},
        {src: 'https://www.symmetrymagazine.org/sites/default/files/styles/2015_hero/public/images/standard/FINAL_gaming_031919.jpg'},
      ],
      dialog: false,
      current_product: {junombre: null, judescription: null},
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
      }
    }
  }
</script>

<style>
  .product{
    cursor: pointer;
  }
</style>
