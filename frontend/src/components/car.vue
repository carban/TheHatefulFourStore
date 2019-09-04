<template dark>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <!-- <v-list>
        <v-btn color="error" left v-on:click="commitSheet()">
          <v-icon>close</v-icon>
        </v-btn> -->
        <!-- <v-layout row wrap>
          <v-card tile flat color="white">

            <v-card-text>
              <v-list-tile v-for="(item, index) in car" :key="index">
                <div class="text-xs-center">
                  <v-chip  @input="removeItem(index)" close>
                    <v-avatar>
                      <img src="https://res.cloudinary.com/teepublic/image/private/s--xeppzKEN--/t_Preview/b_rgb:191919,t_Watermark/c_limit,f_jpg,h_630,q_90,w_630/v1540525490/production/designs/3389495_0.jpg" alt="trevor">
                    </v-avatar>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-chip>
                </div>
              </v-list-tile>
            </v-card-text>
          </v-card>
        </v-layout> -->
        <template dark>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Confirm Products</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Choose Pay mode</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">fragmented payment</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">Everything Right</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <center><h1 v-if="car.length == 0">Please select any element to buy</h1></center>

        <v-card-text>
          <v-list-tile >
            <div class="text-xs-center" v-for="(item, index) in car" :key="index">
              <v-chip  light @input="removeItem(index)" close>
                <v-avatar>
                  <img :src="item.juimage" alt="trevor">
                </v-avatar>
                <v-list-tile-title>{{ item.junombre }}</v-list-tile-title>
              </v-chip>
            </div>
          </v-list-tile>
        </v-card-text>
      </v-card>

        <v-btn v-if="car.length > 0" color="primary" @click="buyStep()">Continue</v-btn>
        <v-btn color="error" left v-on:click="commitSheet()">
          <v-icon>close</v-icon>CLOSE
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card-text height="400px">

            <v-list>
              <v-list-tile>
                <v-list-tile-title>Number of Games: <b>{{car.length}}</b></v-list-tile-title>
              </v-list-tile>
             <v-list-tile v-for="(item, index) in productsToBuy" :key="index">

               <v-list-tile-content>
                 <v-list-tile-title v-html="item.junombre"></v-list-tile-title>
               </v-list-tile-content>

               <v-divider v-for="(div, index) in dividers" :key="index"></v-divider>


               <v-list-tile-action>
                 <v-list-tile-title v-html="item.juprecio"></v-list-tile-title>
               </v-list-tile-action>
             </v-list-tile>
             <v-list-tile>
               <v-list-tile-title><b>Total Price:</b></v-list-tile-title>
               <v-list-tile-action>
                 <h1>${{total}}</h1>
               </v-list-tile-action>
             </v-list-tile>

           </v-list>
           <center>

           </center>

        </v-card-text>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn @click="e1 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <template>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Cash</div>
              </template>
              <v-list-tile avatar>
                <v-checkbox v-for="(item, index) in payCash" :key="index" :label="item.name" v-model="item.v" type="checkbox"></v-checkbox>
              </v-list-tile>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Debito Ahorros</div>
              </template>
              <v-list-tile avatar>
                <v-checkbox label="Paypal" type="checkbox" required></v-checkbox>
                <v-checkbox label="Bancolombia" type="checkbox" required></v-checkbox>
              </v-list-tile>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Credit Card</div>
              </template>
              <v-list-tile avatar>
                <v-checkbox label="Caja social" type="checkbox" required></v-checkbox>
                <v-checkbox label="Davivienda" type="checkbox" required></v-checkbox>
              </v-list-tile>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <br>

          <v-card>
            <v-container grid-list-xs,sm,md,lg,xl>
              <v-list-tile>
              <div class="apercen" v-for="(item, index) in payCash" :key="index">
                <v-text-field :label="item.name" v-if="item.v" v-model="item.porc"></v-text-field>
              </div>
              </v-list-tile>
            </v-container>

          </v-card>


        </template>

        <v-btn color="primary" @click="e1 = 4">
          Continue
        </v-btn>
        <v-btn @click="e1 = 2">Back</v-btn>

      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card-text>
          <center>
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
          </center>
        </v-card-text>
        <v-btn color="primary" v-on:click="finishBuy()">
          Continue
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

        <!-- <v-btn v-if="car.length>0" color="primary">BUY</v-btn> -->
      <!-- </v-list> -->

    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  computed: {
    sheet(){
      return this.$store.getters.sheet;
    },
    car(){
      return this.$store.getters.car;
    }
  },
  data(){
    return{
      e1: 0,
      total: 0,
      dividers: 8,
      iva: "$3.00",
      productsToBuy: [],
      payCash: [{name: "Efecty", v:false, porc: 0}, {name: "Mercado Pago", v:false, porc: 0}, {name: "UPay", v:false, porc: 0}]
    }
  },
  methods: {
    commitSheet(){
      this.$store.commit('sheet');
    },
    removeItem(index){
      this.car[index].added = false;
      this.$store.commit('RemoveitemsOnCar', this.car[index].juid);
    },
    buyStep(){
      this.e1 = 2;
      let totaliva = 0;
      this.productsToBuy = this.car.slice();
      this.productsToBuy.push({juprecio: this.iva, junombre: "Total IVA"});
      var aux = 0;
      for (var i = 0; i < this.productsToBuy.length; i++) {
        var s = this.productsToBuy[i].juprecio.split("$");
        //Last element of productsToBuy, IVA * Number of products
        if (i == this.productsToBuy.length-1) {
          totaliva = parseFloat(this.productsToBuy.length-1)*parseFloat(s[1]);
          this.productsToBuy[i].juprecio = "$"+totaliva+".00" //Update new IVA * Number of products
          aux += totaliva;
        }else{
          aux += parseFloat(s[1]);
        }
      }
      this.total = Math.round(aux * 100) / 100;
    },
    finishBuy(){
      this.e1 = 1;
      this.commitSheet();
      // this.$store.commit('setEmptyCar');
    }
  }
}
</script>

<style lang="css" scoped>
  .custom_scroll{
    height: 100%;
  }
  .apercen{
    margin-left: 10px;
  }
</style>
