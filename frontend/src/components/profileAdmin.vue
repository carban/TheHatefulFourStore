<template lang="html">

  <div>
    <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="error">
      Please check your input
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snack2" top right multi-line :timeout=6000 color="success">
      Action made successfully
      <v-btn color="white" flat @click="snack2 = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-tabs v-model="active" color="white" slider-color="primary">
      <v-tab>
        Create Category
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-form>
                  <v-text-field v-model="cate" name="login" label="Category Name" type="text" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="createCategory()" >CREATE</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        Create Sub-Category
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-combobox :items="items" label="Select Category" v-model="com"></v-combobox>
                <v-form>
                  <v-text-field  v-model = "sub" name="login" label="Sub-category Name" type="text" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="createSubcategory()" >CREATE</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        CREATE GAME
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-form>
                  <v-text-field  v-model="game.junombre" name="login" label="Game name" type="text" required></v-text-field>
                  <v-text-field  v-model="game.juprecio" name="login" label="Game Price" type="text" required></v-text-field>
                  <v-text-field  v-model="game.jucompany" name="login" label="Company of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.juyear" name="login" label="Year of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.jurating" name="login" label="Rating" type="text" required></v-text-field>
                  <v-textarea color="primary" label="Description" v-model="game.judescription"></v-textarea>
                  <v-combobox v-model="game.subnombre" :items="itemssub" label="Select Sub-category"></v-combobox>
                  <v-btn color="info">Add Pic </v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="createGame()">CREATE</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        EDIT GAME
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-form>
                  <v-text-field  v-model="game.junombre" name="login" label="Game name" type="text" required></v-text-field>
                  <v-text-field  v-model="game.juprecio" name="login" label="Game Price" type="text" required></v-text-field>
                  <v-text-field  v-model="game.jucompany" name="login" label="Company of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.juyear" name="login" label="Year of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.jurating" name="login" label="Rating" type="text" required></v-text-field>
                  <v-textarea color="primary" label="Description" v-model="game.judescription"></v-textarea>
                  <v-combobox v-model="game.subnombre" :items="itemssub" label="Select Sub-category"></v-combobox>
                  <v-btn color="info">Add Pic </v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="createGame()">CREATE</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        DELETE GAME
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-form>
                  <v-text-field  v-model="game.name" name="login" label="Game name" type="text" required></v-text-field>
                  <v-text-field  v-model="game.comp" name="login" label="Company of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.year" name="login" label="Year of game" type="text" required></v-text-field>
                  <v-text-field  v-model="game.rating" name="login" label="Rating" type="text" required></v-text-field>
                  <v-combobox v-model="game.sub" :items="items" label="Select Sub-category"></v-combobox>
                  <v-btn color="info">Add Pic </v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error">DELETE</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-container>

        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  computed:{

  },
  created(){
    this.getCatsforCombo();
    this.getSubCatsforCombo();
  },
  data(){
    return{
      active: null,
      snack: false,
      snack2: false,
      game : {
        junombre: '',
        juprecio: '',
        jucompany: '',
        juyear: '',
        judescription: '',
        jurating: '',
        subnombre: '',
      },
      cate: null,
      com: ' ',
      sub: ' ',
      items: [],
      itemssub: []
    }
  },

  methods: {
    createCategory(){
      this.$store.dispatch('createCategory', this.cate)
        .then(r => {
          this.snack2 = true;
          this.cate = '';
          this.$store.dispatch('getCategories');
          this.getCatsforCombo();
        })
        .catch(err => {
          console.log(err);
        })
    },
    getCatsforCombo(){
      this.$store.dispatch('getCategoriesCombo')
        .then(res => {
          var ele = [];
          for (var i = 0; i < res.length; i++) {
            ele.push(res[i].catnombre);
          }
          this.items = ele;
        })
        .catch(err => {
          console.log(err);
        })
    },
    getSubCatsforCombo(){
      this.$store.dispatch('getSubcategoriesCombo')
        .then(res => {
          var ele = [];
          for (var i = 0; i < res.length; i++) {
            ele.push(res[i].subnombre);
          }
          this.itemssub = ele;
        })
        .catch(err => {
          console.log(err);
        })
    },
    createSubcategory(){
      var be = {"cate": this.com, "sub": this.sub}
      this.$store.dispatch('createSubcategory', be)
        .then(r => {
          this.snack2 = true;
          this.com = '';
          this.sub = '';
          this.$store.dispatch('getSubcategories');
          this.getSubCatsforCombo();
        })
        .catch(err => {
          console.log(err);
        })
    },
    combo(){
      console.log(this.com);
    },
    createGame(){
      this.$store.dispatch('createGame', this.game)
        .then(r => {
          this.snack2 = true;
          this.game.junombre = '';
          this.game.jucompany = '';
          this.game.judescription = '';
          this.game.juyear = '';
          this.game.jurating = '';
          this.game.subnombre = '';
        })
        .catch(err => {
          console.log(err);
        })
    }

  }
}
</script>

<style lang="css" scoped>
</style>
