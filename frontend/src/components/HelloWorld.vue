<template>
  <div class="">
    <h1>Top 20</h1>
    <v-container grid-list-xs,sm,md,lg,xl>
      <!-- <v-snackbar v-model="snackbar" top right multi-line timeout="6000" color="success">
        hola
        <v-btn color="white" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar> -->

      <v-layout row wrap>

        <!-- <v-card v-for="(item, index) in products" :key="index" dark
        :color=item.color :style="{'width': item.width, 'margin-right': '10px', 'margin-bottom':'10px'}"> -->
        <v-card v-for="(item, index) in products" :key="index" dark
        :color=item.color :style="{'width':'350px', 'margin-right': '10px', 'margin-bottom':'10px'}">

          <v-layout class="product" v-on:click="setCurrent_product(item)" justify-space-between>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.title}}</div>
                  <div>{{item.comp}}</div>
                  <div>({{item.year}})</div>
                  <div>$ 300</div>
                </div>
              </v-card-title>

            </v-flex>
            <v-img class="shrink ma-2" contain height="125px" src="https://res.cloudinary.com/teepublic/image/private/s--xeppzKEN--/t_Preview/b_rgb:191919,t_Watermark/c_limit,f_jpg,h_630,q_90,w_630/v1540525490/production/designs/3389495_0.jpg"
              style="flex-basis: 125px"
            ></v-img>
          </v-layout>

          <v-divider dark></v-divider>
          <v-card-actions class="pa-3">
            <v-btn absolute v-if="!item.added" color="primary" v-on:click="addItem(index)" >
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn absolute v-if="item.added" color="warning" v-on:click="removeItem(index)">
              <v-icon>cancel</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span class="grey--text text--lighten-2 caption mr-2">
              ({{item.rating}})
            </span>
            <v-rating v-model="item.rating" background-color="white" color="yellow accent-4" dense half-increments hover size="18">
            </v-rating>
          </v-card-actions>


        </v-card>
      </v-layout>

      <v-dialog v-model="dialog" persistent max-width="900px">
                <v-card>
                  <v-card-text>
                     <h1>{{current_product}}</h1>
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
    data: () => ({
      products: [
        {id: 1, title: 'Death Stranding', comp: 'Kojima Productions', year: 2019, color: 'dark', added: false, rating: 5},
        {id: 2, title: 'Uncharted', comp: 'Kojima Productions', year: 2019, color: 'red', added: false, rating: 5},
        {id: 3, title: 'The Last of Us', comp: 'Kojima Productions', year: 2019, color: 'dark', added: false, rating: 5},
        {id: 4, title: 'God of War', comp: 'Kojima Productions', year: 2019, color: 'accent', added: false, rating: 5},
        {id: 5, title: 'PES 2019', comp: 'Kojima Productions', year: 2019, color: 'success', added: false, rating: 5},
        {id: 6, title: 'FIFA 2019', comp: 'Kojima Productions', year: 2019, color: 'red', added: false, rating: 5},
        {id: 7, title: 'Space Invaders', comp: 'Kojima Productions', year: 2019, color: 'dark', added: false, rating: 5},
        {id: 8, title: 'GTA V', comp: 'Kojima Productions', year: 2019, color: 'info', added: false, rating: 5},
        {id: 8, title: 'GTA V', comp: 'Kojima Productions', year: 2019, color: 'info', added: false, rating: 5}
      ],
      dialog: false,
      current_product: null,
    }),
    methods: {
      addItem(index){
        this.products[index].added = true;
        this.$store.commit('AdditemsOnCar', this.products[index]);
      },
      removeItem(index){
        this.products[index].added = false;
        this.$store.commit('RemoveitemsOnCar', this.products[index].id);
      },
      setCurrent_product(proc){
        this.dialog = !this.dialog;
        // console.log(proc);
        this.current_product = proc.title;
      }
    }
  }
</script>

<style>
  .product{
    cursor: pointer;
  }
</style>
