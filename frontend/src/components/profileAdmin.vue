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
        Categories
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
                    <v-btn fab dark color="pink" name="addbtn" @click="addCategory()">
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
                  <v-btn color="error" v-on:click="deletedialog = false" @click="deleteCatego()">Sisas pri</v-btn></center>
                  </v-container>
                </v-card>
            </v-dialog>
            <h2>Reactivate</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="itemscatsinactivas" label="Select category to reactivate" v-model="catactivateCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="green" @click="catactivatedialog = true">REACTIVATE</v-btn>
              </center>
            </v-card>
            <v-dialog v-model="catactivatedialog" max-width="500px">
                <v-card>
                  <v-container grid-list-xs,sm,md,lg,xl>
                  <center><h1>Are you sure to reactivate category {{catactivateCom}} ?</h1>
                  <v-btn color="error" v-on:click="catactivatedialog = false" @click="reactivateCatego()">Sisas pri</v-btn></center>
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
                <v-combobox :items="itemssub" label="Select Subcategory" v-model="subdeleteCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="error" @click="subdeletedialog = true">DELETE</v-btn>
              </center>
            </v-card>
            <v-dialog v-model="subdeletedialog" max-width="500px">
                <v-card>
                  <v-container grid-list-xs,sm,md,lg,xl>
                  <center><h1>Are you sure to delete subcategory {{subdeleteCom}} ?</h1>
                  <v-btn color="error" v-on:click="subdeletedialog = false" @click="deleteSubcatego()">Sisas pri</v-btn></center>
                  </v-container>
                </v-card>
            </v-dialog>
            <br>
            <h2>Reactivate</h2>
            <v-card class="elevation-20">
              <v-card-text>
                <v-combobox :items="itemssubinactivas" label="Select Subcategory to reactivate" v-model="subactivateCom"></v-combobox>
              </v-card-text>
              <center>
                <v-btn color="green" @click="subactivatedialog = true">REACTIVATE</v-btn>
              </center>
            </v-card>
            <v-dialog v-model="subactivatedialog" max-width="500px">
                <v-card>
                  <v-container grid-list-xs,sm,md,lg,xl>
                  <center><h1>Are you sure to reactivate subcategory {{subactivateCom}} ?</h1>
                  <v-btn color="error" v-on:click="subactivatedialog = false" @click="reactivateSubcatego()">Sisas pri</v-btn></center>
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

              <v-layout row wrap>
                <v-flex grow pa-1>
                  <v-card class="elevation-20">
                    <v-card-text>
                      <v-form>
                        <v-text-field  v-model="game.junombre" name="login" label="Game name" type="text" required></v-text-field>
                        <v-text-field  v-model="game.juprecio" name="login" label="Game Price" type="text" required></v-text-field>
                        <v-text-field  v-model="game.jucompany" name="login" label="Company of game" type="text" required></v-text-field>
                        <v-text-field  v-model="game.juyear" name="login" label="Year of game" type="text" required></v-text-field>
                        <v-text-field  v-model="game.jurating" name="login" label="Rating" type="text" required></v-text-field>
                        <v-textarea color="primary" label="Description" v-model="game.judescription"></v-textarea>
                        <v-spacer></v-spacer>
                        <center><v-btn color="success" @click="createGame()">CREATE</v-btn></center>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex shrink pa-1 class="resize">
                  <v-card class="elevation-20">
                    <v-card-text>
                      <p>No implement yet.........</p>
                      <v-combobox v-model="game.subnombre" :items="itemssub" label="Select Sub-category"></v-combobox>
                      <v-combobox v-model="game.judescuentoactual" :items="promotions" label="Select a promotion value"></v-combobox>
                      <v-text-field  v-model="game.juimage" name="login" label="URL" type="text" required></v-text-field>
                      <input type="file" @change="onFileSelected"></input>
                      <center>
                        <img v-if="preImage" :src="preImage" alt="">
                      </center>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>

              <br>

              <h2>Edit / Delete</h2>
              <v-card class="elevation-20">
                <v-list-tile avatar>
                  <v-text-field dark color="white"
                    label="Search"
                    v-model="wordSearch"
                    v-on:keyup.enter="searchToEdit()"
                  ></v-text-field>
                  <v-btn color="primary" @click="searchToEdit()"><v-icon>search</v-icon></v-btn>
                </v-list-tile>

                <br>

                <v-list-tile class="listBg elevation-5" ipple v-for="(item, index) in gamesForEdit" :key="index" @click="openEditPanel(item)">

                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.junombre"></v-list-tile-title>
                     <i>{{item.judescription}}</i>
                  </v-list-tile-content>

                </v-list-tile>


              </v-card>

              <!-- DIALOG EDIT PANEL -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <v-dialog dark v-model="dialog" max-width="900px">
                <v-card>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex grow pa-1>
                        <v-card>
                          <v-card-text>
                            <v-form>
                              <v-text-field  v-model="editAGame.junombre" name="login" label="Game name" type="text" required></v-text-field>
                              <v-text-field  v-model="editAGame.juprecio" name="login" label="Game Price" type="text" required></v-text-field>
                              <v-text-field  v-model="editAGame.jucompany" name="login" label="Company of game" type="text" required></v-text-field>
                              <v-text-field  v-model="editAGame.juyear" name="login" label="Year of game" type="text" required></v-text-field>
                              <v-text-field  v-model="editAGame.jurating" name="login" label="Rating" type="text" required></v-text-field>
                              <v-textarea color="primary" label="Description" v-model="editAGame.judescription"></v-textarea>
                              <v-spacer></v-spacer>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex shrink pa-1 class="resize">
                        <v-card>
                          <v-card-text>
                            <v-combobox v-model="editAGame.subnombre" :items="itemssub" label="Select Sub-category"></v-combobox>
                            <v-combobox v-model="editAGame.judescuentoactual" :items="promotions" label="Select a promotion value"></v-combobox>
                            <v-text-field  v-model="editAGame.juimage" name="login" label="URL" type="text" required></v-text-field>
                            <input type="file" @change="onFileSelected"></input>
                            <center>
                              <img v-if="preImage" :src="preImage" alt="">
                            </center>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <center>
                      <v-list-tile>
                        <v-btn color="success" @click="editGame()">Update</v-btn>
                        <v-btn color="error">Delete</v-btn>
                      </v-list-tile>
                    </center>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        ALL GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
         <v-container grid-list-xs,sm,md,lg,xl>
          <v-layout row wrap>

            <v-card v-for="(item, index) in totalGames" :key="index"
            :color=item.color :style="{'width':'350px', 'margin-right': '10px', 'margin-bottom':'10px'}">

              <v-layout class="product" justify-space-between>
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{item.junombre}}</div>
                      <div>{{item.jucompany}}</div>
                      <div>({{item.juyear}})</div>
                      <div>{{item.juprecio}}</div>
                      <div>
                        <h2>{{item.subnombre}}</h2>
                      </div>
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
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  computed:{
    totalGames(){
      return this.$store.getters.games;
    }
  },
  beforeCreate(){
    this.$store.dispatch('getGamesForAdmin');
  },
  created(){
    this.getCatsforCombo();
    this.getSubCatsforCombo();
    this.getSubCatsInactivasforCombo();
    this.getCatsInactivasforCombo();

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
      subactivateCom: ' ',
      catactivateCom:' ',
      sub: null,
      items: [],
      itemssub: [],
      itemssubinactivas: [],
      itemscatsinactivas: [],
      new_categos: [],
      new_subcategos: [],
      editdialog: false,
      deletedialog: false,
      subeditdialog: false,
      subdeletedialog: false,
      subactivatedialog: false,
      catactivatedialog: false,
      preImage: null,

      dialog: null,
      wordSearch: null,
      gamesForEdit: [],
      editAGame: {
        junombre: '',
        juprecio: '',
        jucompany: '',
        juyear: '',
        judescription: '',
        jurating: '',
        juimage: '',
        subnombre: '',
        judescuentoactual: '',
      },
      promo: null,
      promotions: [0, 5, 10, 15, 20, 25, 30, 40, 45, 50]
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
      this.$store.dispatch('deleteCategory',thecat.catid)
      .then(res => {
        //removeCategory(thecat.catid)
        this.$store.dispatch('getCategories');
        this.getCatsforCombo();
        this.$store.dispatch('getSubcategories');
        this.getSubCatsforCombo();
        this.getCatsInactivasforCombo();
        console.log('Categoria eliminada'); ///esto provisionalmente mientras ponemos algun anuncio
      })
      .catch(err => {
        console.log('Categoria no eliminada');
      })
    },
    deleteSubcatego(){
      var subcats = this.$store.getters.subcatego;
      for (var i = 0; i < subcats.length; i++) {
        for(var j = 0; j < subcats[i].length; j++){
          if (subcats[i][j].subnombre == this.subdeleteCom) {
            var thesubcat = subcats[i][j];
            break;
          }
        }
      }
      console.log(thesubcat.subnombre, thesubcat.subid);
      this.$store.dispatch('deleteSubcategory',thesubcat.subid)
      .then(res => {
        //removeCategory(thesubcat.subid)
        this.$store.dispatch('getSubcategories');
        this.getSubCatsforCombo();
        this.getSubCatsInactivasforCombo();
        console.log('Subcategoria eliminada'); ///esto provisionalmente mientras ponemos algun anuncio
      })
      .catch(err => {
        console.log('Subcategoria no eliminada');
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
    getCatsInactivasforCombo(){
      this.$store.dispatch('getCategoriesInactivasCombo')
        .then(res => {
          var ele = [];
          for (var i = 0; i < res.length; i++) {
            ele.push(res[i].catnombre);
          }
          this.itemscatsinactivas = ele;
        })
        .catch(err => {
          console.log(err);
        })
    },
    getSubCatsInactivasforCombo(){
      this.$store.dispatch('getSubcategoriesInactivasCombo')
        .then(res => {
          var ele = [];
          for (var i = 0; i < res.length; i++) {
            ele.push(res[i].subnombre);
          }
          this.itemssubinactivas = ele;
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
          this.game.judescuentoactual = '';
          this.$store.dispatch('getGamesForAdmin');
        })
        .catch(err => {
          console.log(err);
        })
    },
    onFileSelected(event){
      let file = event.target.files[0];
      this.preImage = URL.createObjectURL(file);
    },
    searchToEdit(){

      if (this.wordSearch != '') {
        this.$store.dispatch('searchToEdit', this.wordSearch)
          .then(res => {
            this.gamesForEdit = res;
          })
          .catch(err => {
            console.log(err);
          })
      }else{
        this.gamesForEdit = [];
      }
    },
    openEditPanel(item){
      this.dialog = true;
      this.editAGame = item;
    },
    editGame(){
      // QUEDA PENDIENTE MODICAR LA SUBCATEGORIA
      this.$store.dispatch('editGame', this.editAGame)
        .then(res => {
          this.dialog = false;
          this.snack2 = true;
          this.$store.dispatch('getGamesForAdmin');
        })
        .catch(err => {
          console.log(err);
        })
    },
    reactivateCatego(){
      var cats = this.$store.getters.categoInactivas;
      //console.log(cats[0].catid);
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].catnombre == this.catactivateCom) {
          var thecat = cats[i];
          break;
        }
      }
      console.log(thecat.catnombre, thecat.catid);
      this.$store.dispatch('reactivateCategory',thecat.catid)
      .then(res => {
        //removeCategory(thecat.catid)
        this.$store.dispatch('getCategories');
        this.getCatsforCombo();
        this.$store.dispatch('getSubcategories');
        this.getSubCatsforCombo();
        this.getCatsInactivasforCombo();
        console.log('Categoria reactivada'); ///esto provisionalmente mientras ponemos algun anuncio
      })
      .catch(err => {
        console.log('Categoria no reactivada');
      })
    },
    reactivateSubcatego(){
      var subcats = this.$store.getters.subCatsInactivas;
      for (var i = 0; i < subcats.length; i++) {
        if (subcats[i].subnombre == this.subactivateCom) {
          var thesubcat = subcats[i];
          break;
        }
      }
      console.log(thesubcat.subnombre, thesubcat.subid);
      this.$store.dispatch('reactivateSubcategory',thesubcat.subid)
      .then(res => {
        //removeCategory(thecat.catid)
        //this.$store.dispatch('getCategories');
        //this.getCatsforCombo();
        this.$store.dispatch('getSubcategories');
        this.getSubCatsforCombo();
        this.getCatsInactivasforCombo();
        this.getSubCatsInactivasforCombo();
        console.log('Subcategoria reactivada'); ///esto provisionalmente mientras ponemos algun anuncio
      })
      .catch(err => {
        console.log('Subcategoria no reactivada');
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
  .resize{
    width: 370px;
  }
</style>
