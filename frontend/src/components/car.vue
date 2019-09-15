<template light>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet" persistent>

        <template light>
  <v-stepper dark v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Confirm Products</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Choose Pay mode</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">fragmented payment</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 4" step="4">Payment</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="5">Everything Right</v-stepper-step>
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
          <v-list>
            <v-list-tile-title>
              <h2>Cash</h2>
            </v-list-tile-title>
          <v-radio-group v-model="cashSelected" row>
            <div @click="porcCash = 0" ><v-radio label="None">None</v-radio></div>
            <v-radio v-for="(item, index) in payCash" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
          </v-radio-group>
          <v-list-tile-title>
            <h2>Ahorros</h2>
          </v-list-tile-title>
          <v-radio-group v-model="ahorrosSelected" row>
            <div @click="porcAhorros = 0" ><v-radio label="None">None</v-radio></div>
            <v-radio v-for="(item, index) in payAhorro" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
          </v-radio-group>
          <v-list-tile-title>
            <h2>Credit Card</h2>
          </v-list-tile-title>
          <v-radio-group v-model="creditSelected" row>
            <div @click="porcCredit = 0" ><v-radio label="None">None</v-radio></div>
            <v-radio v-for="(item, index) in payCredit" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
          </v-radio-group>

          </v-list>

        </template>

        <v-btn color="primary" @click="makeShop()">
          Continue
        </v-btn>
        <v-btn @click="e1 = 2">Back</v-btn>

      </v-stepper-content>

      <v-stepper-content step="4">
        <template>
          <v-layout row>
            <v-flex grow pa-1 class="larrge">
              <v-card>
                <div v-if="cashSelected != null && cashSelected != 'None'">
                  <h3>CASH</h3>
                  <v-list-tile>
                    <v-text-field :label="cashSelected" v-model="porcCash" type="number"></v-text-field>
                  <v-list-tile-action>
                    <h1>{{Math.round((porcCash / total)*1000)/10}}%</h1>
                  </v-list-tile-action>
                  </v-list-tile>
                </div>
                <div v-if="ahorrosSelected != null && ahorrosSelected != 'None'">
                  <h3>AHORROS</h3>
                  <v-list-tile>
                    <v-text-field :label="ahorrosSelected" v-model="porcAhorros" type="number"></v-text-field>
                  <v-list-tile-action>
                    <h1>{{Math.round((porcAhorros / total)*1000)/10}}%</h1>
                  </v-list-tile-action>
                  </v-list-tile>
                </div>
                <div v-if="creditSelected != null && creditSelected != 'None'">
                  <h3 >CREDIT</h3>
                  <v-list-tile>
                    <v-text-field :label="creditSelected" v-model="porcCredit" type="number"></v-text-field>
                  <v-list-tile-action>
                    <h1>{{Math.round((porcCredit / total)*1000)/10}}%</h1>
                  </v-list-tile-action>
                  </v-list-tile>
                </div>
              </v-card>
              </v-flex>

              <v-flex shrink pa-1>
                <v-card>
                  <!-- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. -->
                  <button @click="exportpdf()">PDF</button>
                  <h1>Total Price: ${{total}}</h1>
                  <h1>Total percentage: {{porTotal}}%</h1>
                </v-card>
              </v-flex>

          </v-layout>
          <v-btn color="primary" @click="verifyPercentages()">
            Continue
          </v-btn>
          <v-btn @click="e1 = 3">Back</v-btn>
        </template>
      </v-stepper-content>

      <v-stepper-content step="5">
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
    </v-bottom-sheet>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';

var bbvaI = require('@/assets/bbva.png');

export default {
  computed: {
    sheet(){
      return this.$store.getters.sheet;
    },
    car(){
      return this.$store.getters.car;
    },
    porTotal(){
      var t = 0;
      if (this.cashSelected!=null && this.cashSelected!='none') {
        t += parseFloat(this.porcCash);
      }
      if(this.ahorrosSelected!=null && this.ahorrosSelected!='none'){
        t += parseFloat(this.porcAhorros);
      }
      if(this.creditSelected!=null && this.creditSelected!='none'){
        t += parseFloat(this.porcCredit);
      }
      if (t >= 0 && t <= this.total){
        return Math.round((t*1000)/this.total)/10;
      }else{
        return "Error"
      }
    }
  },
  data(){
    return{
      e1: 0,
      total: 0,
      dividers: 8,
      iva: "$3.00",
      productsToBuy: [],
      payCash: [{name: "Efecty"}, {name: "Mercado Pago"}, {name: "Gane"}, {name: "Baloto"}],
      payAhorro: [{name: "Bancolombia"}, {name: "Davivienda"}, {name: "BBVA"}, {name: "Colpatria"}],
      payCredit: [{name: "Master Card"}, {name: "Visa"}, {name: "American Express"}, {name: "Diners Club"}],
      cashSelected: null,
      ahorrosSelected: null,
      creditSelected: null,
      porcCash: 0,
      porcAhorros: 0,
      porcCredit: 0,
      bbva: bbvaI
    }
  },
  methods: {
    exportpdf(){
      var columns = [{title: 'Cash', dataKey: 'name'}, {title: 'Price', dataKey: 'porc'}]
      var doc = new jsPDF('p', 'pt');
      var mode = [];
      for(var i in this.payCash){
        if (this.payCash[i].v) {
          mode.push(this.payCash[i]);
        }
      }
      console.log(mode);
      doc.autoTable(columns, mode);
      doc.save('table.pdf');
    },
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
    verifyPercentages(){

      var a = true;
      var b = true;
      var c = true;

      // Necesito validar que a los medios de pago que selecciono les de un valor mayor a 0
      // Porque si no deberia devolverse y desactivar el medio de pago
      //Si lo elige es porque va a pagar algo mayor a cero
      if (this.cashSelected!=null && this.cashSelected!='none') {
        if ((Math.round((this.porcCash / this.total)*1000)/10) == 0) {
          a = false;
        }
      }
      if(this.ahorrosSelected!=null && this.ahorrosSelected!='none'){
        if ((Math.round((this.porcAhorros / this.total)*1000)/10) == 0) {
          b = false;
        }
      }
      if(this.creditSelected!=null && this.creditSelected!='none'){
        if ((Math.round((this.porcCredit / this.total)*1000)/10) == 0) {
          c = false;
        }
      }

      if (this.porTotal == 100 && a && b && c) {
        this.e1 = 5;
      }else{
        alert("Oye tranquilo viejo")
      }
    },
    makeShop(){
      // if (this.porTotal==100) {
      //   this.e1 = 4;
      // }
      this.e1 = 4;
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
    margin-left: 21px;
  }
  .larrge{
    width: 50%;
  }
  .small-field{
    /* width: 75%; */
  }
  .left-margin-sliders{
    margin-left: 30px;
  }
</style>
