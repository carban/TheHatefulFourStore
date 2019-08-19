<template lang="html">

  <v-container grid-list-xs,sm,md,lg,xl>
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
    <v-tabs v-model="active" color="dark" slider-color="primary">
      <v-tab>
        Cateogories
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h2>Create</h2>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-form>
                  <v-text-field v-model="cate" name="login" label="Category Name" type="text" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn fab dark color="pink" @click="addCategory()">
                      <v-icon dark>add</v-icon>
                    </v-btn>

                  </v-card-actions>
                </v-form>
                <v-list>
                <v-list-tile class="listBg elevation-5" ipple v-for="(item, index) in new_categos" :key="index">

                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-icon @click="removeCategory(index)" class="white--text">close</v-icon>

                </v-list-tile>
                </v-list>
                <center>
                  <v-btn v-if="new_categos.length > 0" color="success" @click="createCategory()">CREATE</v-btn>
                </center>

              </v-card-text>
            </v-card>
            <br>
            <h2>Edit</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="items" label="Select Category" v-model="editCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="pink" @click="editdialog = true">EDIT</v-btn>
              </center>
              <v-dialog v-model="editdialog" max-width="500px">
                  <v-card>
                    <v-container grid-list-xs,sm,md,lg,xl>
                    <h1>Edit Name</h1>
                    <v-text-field name="login" label="Category Name" type="text" v-model="editCat" required></v-text-field>
                    <center><v-btn color="pink" @click="editCatego()">Save</v-btn></center>

                    </v-container>
                  </v-card>
              </v-dialog>
            </v-card>
            <br>
            <h2>Delete</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="items" label="Select Category" v-model="deleteCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="error" @click="deletedialog = true">DELETE</v-btn>
              </center>
            </v-card>
            <v-dialog v-model="deletedialog" max-width="500px">
                <v-card>
                  <v-container grid-list-xs,sm,md,lg,xl>
                  <center><h1>Are you sure to delete Category {{deleteCom}} ?</h1>
                  <v-btn color="error" @click="deleteCatego()">Sisas pri</v-btn></center>
                  </v-container>
                </v-card>
            </v-dialog>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        Sub-Categories
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h2>Create</h2>
            <v-card class="elevation-20" >
              <v-card-text>
                <v-combobox :items="items" label="Select Category" v-model="com"></v-combobox>
                <v-form>
                  <v-text-field  v-model = "sub" name="login" label="Sub-category Name" type="text" required></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn fab dark color="pink" @click="addSubcategory()">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-form>
                <v-list>
                <v-list-tile class="listBg elevation-5" ipple v-for="(item, index) in new_subcategos" :key="index">

                  <v-list-tile-content>
                    <v-list-tile-title>{{item.sub}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.cate }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-icon @click="removeSubcategory(index)" class="white--text">close</v-icon>

                </v-list-tile>
                </v-list>
                <center>
                  <v-btn v-if="new_subcategos.length > 0" color="success" @click="createSubcategory()">CREATE</v-btn>
                </center>
              </v-card-text>
            </v-card>
            <br>
            <h2>Edit</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="itemssub" label="Select Subcategory" v-model="subeditCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="pink" @click="subeditdialog = true">EDIT</v-btn>
              </center>
              <v-dialog v-model="subeditdialog" max-width="500px">
                  <v-card>
                    <v-container grid-list-xs,sm,md,lg,xl>
                    <h1>Edit Name</h1>
                    <v-text-field name="login" label="Subcategory Name" type="text" v-model="subeditSub" required></v-text-field>
                    <center><v-btn color="pink" @click="editSubcatego()">Save</v-btn></center>
                    </v-container>
                  </v-card>
              </v-dialog>
            </v-card>
            <br>
            <h2>Delete</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="items" label="Select Subcategory" v-model="subdeleteCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="error" @click="subdeletedialog = true">DELETE</v-btn>
              </center>
            </v-card>
            <v-dialog v-model="subdeletedialog" max-width="500px">
                <v-card>
                  <v-container grid-list-xs,sm,md,lg,xl>
                  <center><h1>Are you sure to delete Category {{subdeleteCom}} ?</h1>
                  <v-btn color="error">Sisas pri</v-btn></center>
                  </v-container>
                </v-card>
            </v-dialog>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h2>Create</h2>
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
                  <v-text-field  v-model="game.juimage" name="login" label="URL" type="text" required></v-text-field>
                  <v-spacer></v-spacer>
                  <center><v-btn color="success" @click="createGame()">CREATE</v-btn></center>
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
  </v-container>
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
        juimage: '',
        subnombre: '',
      },
      cate: null,
      com: ' ',
      editCom: ' ',
      editCat: ' ',
      deleteCom: ' ',
      subeditCom: ' ',
      subeditSub: ' ',
      subdeleteCom: ' ',
      sub: null,
      items: [],
      itemssub: [],
      new_categos: [],
      new_subcategos: [],
      editdialog: false,
      deletedialog: false,
      subeditdialog: false,
      subdeletedialog: false
    }
  },

  methods: {
    addCategory(){
      if (this.cate != null) {
        this.new_categos.push({'title': this.cate});
        this.cate = null;

      }else{
        this.snack = true;
      }
    },
    removeCategory(i){
      this.new_categos.splice(i, 1);
    },
    createCategory(){
      this.$store.dispatch('createCategory', this.new_categos)
        .then(r => {
          this.snack2 = true;
          this.cate = null;
          this.new_categos = [];
          this.$store.dispatch('getCategories');
          this.getCatsforCombo();
        })
        .catch(err => {
          console.log(err);
        })
    },
    editCatego(){

      if (this.editCat!=' ') {

        var cats = this.$store.getters.catego;
        for (var i = 0; i < cats.length; i++) {
          if (cats[i].catnombre == this.editCom) {
            var thecat = cats[i];
            break;
          }
        }
        this.$store.dispatch('editCategory', {'catnombre': this.editCat, 'catid': thecat.catid})
          .then(res => {
            this.snack2 = true;
            this.editCom = ' ';
            this.editCat = ' ';
            this.editdialog = false;
            this.$store.dispatch('getCategories');
            this.getCatsforCombo();
          })
          .catch(err => {
            console.log(err);
          })
      }

    },
    deleteCatego(){
      var cats = this.$store.getters.catego;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].catnombre == this.deleteCom) {
          var thecat = cats[i];
          break;
        }
      }
      console.log(thecat.catnombre, thecat.catid);
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
    addSubcategory(){
      if (this.sub != null || this.com != null) {
        this.new_subcategos.push({'sub': this.sub, 'cate': this.com});
        this.cate = '';
        this.sub = '';
      }else{
        this.snack = true;
      }
    },
    removeSubcategory(i){
      this.new_subcategos.splice(i, 1);
    },
    createSubcategory(){
      this.$store.dispatch('createSubcategory', this.new_subcategos)
        .then(r => {
          this.snack2 = true;
          this.com = '';
          this.sub = '';
          this.new_subcategos = [];
          this.$store.dispatch('getSubcategories');
          this.getSubCatsforCombo();
        })
        .catch(err => {
          console.log(err);
        })
    },
    editSubcatego(){
      if (this.subeditSub!=' ') {

        this.$store.dispatch('getSubcategoriesCombo')
          .then(res => {
            var cats = res;
            for (var i = 0; i < cats.length; i++) {
              if (cats[i].subnombre == this.subeditCom) {
                var thecat = cats[i];
                break;
              }
            }
            this.$store.dispatch('editSubcategory', {'subnombre': this.subeditSub, 'subid': thecat.subid})
              .then(res => {
                this.snack2 = true;
                this.subeditCom = ' ';
                this.subeditSub = ' ';
                this.subeditdialog = false;
                this.$store.dispatch('getSubcategories');
                this.getSubCatsforCombo();
              })
              .catch(err => {
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err);
          })
      }
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
          this.game.juprecio = '';
          this.game.juyear = '';
          this.game.jurating = '';
          this.game.subnombre = '';
          this.game.juimage = '';
        })
        .catch(err => {
          console.log(err);
        })
    }

  }
}
</script>

<style lang="css" scoped>
  .listBg{
    background-color: #514455;
    margin-top: 10px;
  }
</style>
