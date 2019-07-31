<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <v-list>
        <v-btn color="error" left v-on:click="commitSheet()">
          <v-icon>close</v-icon>
        </v-btn>
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
        <template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
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

        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card height="100px"></v-card>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn @click="e1 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card height="100px"></v-card>

        <v-btn color="primary" v-on:click="finishBuy()">
          Continue
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

        <!-- <v-btn v-if="car.length>0" color="primary">BUY</v-btn> -->
      </v-list>

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
      e1: 0
    }
  },
  methods: {
    commitSheet(){
      this.$store.commit('sheet');
    },
    removeItem(index){
      this.car[index].added = false;
      this.$store.commit('RemoveitemsOnCar', this.car[index].id);
    },
    finishBuy(){
      this.e1 = 1;
      this.commitSheet();
      this.$store.commit('setEmptyCar');
    }
  }
}
</script>

<style lang="css" scoped>
  .custom_scroll{
    height: 100%;
  }
</style>
