<template light>
  <div class="text-xs-center">

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="succPay" max-width="300">
          <v-card>
            <v-card-title class="headline">Successful Payment :D</v-card-title>
            <img :src="imgcup" width="300px" height="300px"></img>
            <v-card-text>
              Now you can enjoy your games on your profile ;)
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>


    <template>
      <v-layout row justify-center>
        <v-dialog light v-model="dialogCash" max-width="400" persistent>
          <v-card>
            <v-card-title class="headline">Complete your information about Cash Payment</v-card-title>
            <v-card-text>
              <form @submit.prevent="confirmCash()">
                <v-text-field v-model="aNameCash" label="Confirm your Name" required></v-text-field>
                <v-text-field v-model="codeCash" type="number" label="Number of Card" placeholder="#" required></v-text-field>
                <v-btn type="submit" color="lime">CONFIRM</v-btn>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>



    <template>
      <v-layout row justify-center>
        <v-dialog light v-model="dialogAhorros" max-width="400" persistent>
          <v-card>
            <v-card-title class="headline">Complete your information about Cash Payment</v-card-title>
            <v-card-text>
              <form @submit.prevent="confirmAhorros()">
                <v-text-field v-model="aNameAhorros" label="Confirm your Name" required></v-text-field>
                <v-text-field v-model="codeAhorros" type="number" label="Number of Card" placeholder="#" required></v-text-field>
                <v-btn type="submit" color="lime">CONFIRM</v-btn>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>



    <template>
      <v-layout row justify-center>
        <v-dialog light v-model="dialogCredit" max-width="400" persistent>
          <v-card>
            <v-card-title class="headline">Complete your information about Cash Payment</v-card-title>
            <v-card-text>
              <form @submit.prevent = "confirmCredit()">
                <v-text-field v-model="aNameCredit" label="Confirm your Name" required></v-text-field>
                <v-text-field v-model="codeCredit" type="number" label="Number of Card" placeholder="#" required></v-text-field>
                <v-btn type="submit" color="lime">CONFIRM</v-btn>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>





    <v-bottom-sheet v-model="sheet" persistent>

        <template light>
  <v-stepper light v-model="e1">
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
        <center><h1 v-if="car.length == 0" class="blackk">Please select any element to buy</h1></center>

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
          <v-layout row>
            <v-flex grow pa-1>
              <v-list>
                <v-list-tile-title>
                  <h2>Cash</h2>
                </v-list-tile-title>
              <v-radio-group v-model="cashSelected" row>
                <div @click="porcCash = 0" ><v-radio label="None">None</v-radio></div>
                <v-radio v-for="(item, index) in payCash" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
                <v-btn v-if="cashSelected" :color="confirmers[0]" @click="dialogCash = true">Confirm Information</v-btn>
              </v-radio-group>
              <v-list-tile-title>
                <h2>Savings</h2>
              </v-list-tile-title>
              <v-radio-group v-model="ahorrosSelected" row>
                <div @click="porcAhorros = 0" ><v-radio label="None">None</v-radio></div>
                <v-radio v-for="(item, index) in payAhorro" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
                <v-btn v-if="ahorrosSelected" :color="confirmers[1]" @click="dialogAhorros = true">Confirm Information</v-btn>
              </v-radio-group>
              <v-list-tile-title>
                <h2>Credit Card</h2>
              </v-list-tile-title>
              <v-radio-group v-model="creditSelected" row>
                <div @click="porcCredit = 0" ><v-radio label="None">None</v-radio></div>
                <v-radio v-for="(item, index) in payCredit" :key="index" :label="item.name" :value="item.name" color="pink"></v-radio>
                <v-btn v-if="creditSelected" :color="confirmers[2]" @click="dialogCredit = true">Confirm Information</v-btn>
              </v-radio-group>

              </v-list>
            </v-flex>
            <v-flex shrink pa-1>
              <img width="100%" height="350px" :src="creditimg" alt="">
            </v-flex>
            </v-layout>
        </template>

        <v-btn color="primary" @click="validatePayChoose()">
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
                  <h3>SAVINGS</h3>
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

              <v-flex shrink pa-1 class="larrge2">
                <v-card>
                  <!-- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. -->
                  <!-- <button @click="exportpdf()">PDF</button> -->
                  <h2 id="brh">Results</h2>
                  <h1>Total Price: ${{total}}</h1>
                  <h1>Total percentage: {{porTotal}}%</h1>
                </v-card>
              </v-flex>

          </v-layout>
          <v-btn color="secondary" @click="verifyPercentages()">
            BUY
          </v-btn>
          <v-btn @click="e1 = 3">Back</v-btn>
        </template>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card-text>
          <center>
            <!-- <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular> -->
            <!-- <img :src="chulo" alt=""> -->
            <h1 class="blackk">Thanks for your purchase <3 </h1>
          </center>
        </v-card-text>
        <v-btn color="primary" v-on:click="finishBuy()">
          Close
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

var cup = require('@/assets/cup.gif');
var bbvaI = require('@/assets/bbva.png');
var creimg = require('@/assets/credits.gif');

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
      creditimg: creimg,
      imgcup: cup,
      e1: 0,
      total: 0,
      dividers: 8,
      iva: 0.19,
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
      bbva: bbvaI,
      succPay: false,
      confirmers: ["red", "red", "red"],
      dialogCash: false,
      dialogAhorros: false,
      dialogCredit: false,
      codeCash: null,
      codeAhorros: null,
      codeCredit: null,
      aNameCash: null,
      aNameAhorros: null,
      aNameCredit: null
    }
  },
  methods: {
    exportpdf(){
      var columns = [{title: 'Cash', dataKey: 'name'}, {title: 'Price', dataKey: 'porc'}]
      var doc = new jsPDF('p', 'pt');
      var mode = [{name: this.cashSelected, porc: this.porcCash},
        {name: this.ahorrosSelected, porc: this.porcAhorros},
        {name: this.creditSelected, porc: this.porcCredit}];
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
      var sumatotal = 0;
      // this.productsToBuy = this.car.slice();
      this.productsToBuy = JSON.parse(JSON.stringify(this.car));
      console.log(this.productsToBuy);
      // Actualiza los precios con descuento a los productos que se van a comprar
      for (var i = 0; i < this.productsToBuy.length; i++) {
        if (this.productsToBuy[i].judescuentoactual > 0) {
          let desc = this.productsToBuy[i].judescuentoactual;
          let real = this.productsToBuy[i].juprecio;
          let price = real.split("$");
          let priceFloat = parseFloat(price[1]);
          let priceWithDiscount = (priceFloat - (priceFloat * desc) / 100).toFixed(2);
          sumatotal += parseFloat(priceWithDiscount);
          this.productsToBuy[i].juprecio = "$"+priceWithDiscount;
        }else{
          let ireal = this.productsToBuy[i].juprecio;
          let iprice = ireal.split("$");
          let ipriceFloat = parseFloat(iprice[1]).toFixed(2);
          sumatotal += parseFloat(ipriceFloat);
        }
      }
      let ivaCompra = parseFloat(parseFloat(this.iva*parseFloat(sumatotal)).toFixed(2));
      let totalAPagar = parseFloat(sumatotal)+ivaCompra;

      this.productsToBuy.push({juprecio: "$"+ivaCompra, junombre: "Total IVA (19%)"});

      this.total = Math.round(totalAPagar* 100) / 100;
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
        // this.e1 = 5;
        confirm("Confirm your Payment");
        this.makeShop();
      }else{
        alert("Check your input please")
      }
    },
    validatePayChoose(){
      if (this.cashSelected == null && this.ahorrosSelected == null && this.creditSelected == null) {
        alert("Please select a Payment method");
      }else{
        if (this.cashSelected != null && this.codeCash == null) {
            alert("Check the confirmation")
        }else if (this.ahorrosSelected != null && this.codeAhorros == null) {
          alert("Check the confirmation")
        }else if (this.creditSelected != null && this.codeCredit ==null) {
          alert("Check the confirmation")
        }
        else{
          this.e1 = 4;
        }
      }
    },
    makeShop(){

      let modals = [{type: null, mode: null, money: null},{type: null, mode: null, money: null}, {type: null, mode: null, money: null}];

      if (this.cashSelected!=null && this.cashSelected!='none') {
        modals[0]={type: 'cash', mode: this.cashSelected, money: parseInt(this.porcCash)};
      }
      if(this.ahorrosSelected!=null && this.ahorrosSelected!='none'){
        modals[1]={type: 'Ahorros', mode: this.ahorrosSelected, money: parseInt(this.porcAhorros)};
      }
      if(this.creditSelected!=null && this.creditSelected!='none'){
        modals[2]={type: 'Credit', mode: this.creditSelected, money: parseInt(this.porcCredit)};
      }

      let obj = {modals: modals, games: this.car, total: parseFloat(this.total)}
      // console.log(obj);
      this.$store.dispatch('purchase', obj)
        .then(res => {
          if (res.res == "SOLD") {
            // alert("dfsdf")
            this.productsToBuy = [];
            this.cashSelected = null;
            this.ahorrosSelected = null;
            this.creditSelected = null;
            this.porcCash = 0;
            this.porcAhorros = 0;
            this.porcCredit = 0;

            this.confirmers = ["red", "red", "red"],
            this.dialogCash = false;
            this.dialogAhorros = false;
            this.dialogCredit = false;
            this.codeCash = null;
            this.codeAhorros = null;
            this.codeCredit = null;
            this.aNameCash = null;
            this.aNameCredit = null;
            this.aNameAhorros = null;


            this.$store.commit('setEmptyCar');
            this.$store.dispatch('getGames');
          }
          // alert("Successful payment")
          this.succPay = true;
          // this.commitSheet();
          this.e1 = 5;
        })


    },
    finishBuy(){
      this.e1 = 1;
      this.commitSheet();
    },
    confirmCash(){
      this.dialogCash = false;
      this.confirmers[0] = 'lime';
    },
    confirmAhorros(){
      this.dialogAhorros = false;
      this.confirmers[1] = 'lime';
    },
    confirmCredit(){
      this.dialogCredit = false;
      this.confirmers[2] = 'lime';
    },
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
  .larrge2{
    width: 30%;
  }
  .small-field{
    /* width: 75%; */
  }
  .left-margin-sliders{
    margin-left: 30px;
  }
  #brh{
    color: purple;
    margin-bottom: 10px;
  }
  .blackk{
    color: black;
  }
</style>
