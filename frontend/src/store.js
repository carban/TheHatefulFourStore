import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    admin_token: localStorage.getItem('admin_token') || null,
    openMenu: null,
    sheet: false,
    // wordSearch: '',
    theCar: [],
    profile: { cliusuario: null, clinombre: null, clicorreo: null, clifondos: null, clifechanac: null },
    // admin: false,
    banner: true,
    catego: [],
    subcatego: [],
    games: [],
    myGames: [],
    categoInactivas: [],
    subCatsInactivas: [],
    bills: []
  },
  getters: {
    token: state => {
      return state.token;
    },
    admin_token: state => {
      return state.admin_token;
    },
    loggedIn: state => {
      return state.token !== null;
    },
    loggedIn_admin: state => {
      return state.admin_token !== null;
    },
    profile: state => {
      return state.profile;
    },
    bills: state => {
      return state.bills;
    },
    // getWordSearch: state => {
    //   return state.wordSearch;
    // },
    // admin: state => {
    //   return state.admin;
    // },
    itemsOnCar: state => {
      return state.theCar.length;
    },
    sheet: state => {
      return state.sheet;
    },
    games: state => {
      return state.games;
    },
    myGames: state => {
      return state.myGames;
    },
    car: state => {
      return state.theCar;
    },
    banner: state => {
      return state.banner;
    },
    catego: state => {
      return state.catego;
    },
    subcatego: state => {
      return state.subcatego;
    },
    categoInactivas: state => {
      return state.categoInactivas;
    },
    subCatsInactivas: state => {
      return state.subCatsInactivas;
    }
  },
  mutations: {
    tokenMutation: (state, token) => {
      state.token = token;
    },
    admin_tokenMutation: (state, token) => {
      state.admin_token = token;
    },
    destroyToken: state => {
      state.token = null;
      state.admin_token = null;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
    },
    setBills: (state, b) => {
      state.bills = b;
    },
    // setWordSearch: (state, word) => {
    //
    //   if (word!='') {
    //     state.banner = false;
    //   }else{
    //     state.banner = true;
    //   }
    //
    //   state.wordSearch = word;
    //
    // },
    // setAdmin: (state, val) => {
    //   state.admin = val;
    // },
    AdditemsOnCar: (state, item) => {
      // let isInserted = false
      // for (var i = 0; i < state.car.length; i++) {
      //   if(state.car[i].juid == item.juid){
      //     isInserted = true;
      //   }
      // }
      // if (isInserted) {
      //   alert("This product is already on car")
      // }else{
      //   state.theCar.push(item);
      // }

      state.theCar.push(item);

    },
    setEmptyCar: state => {
      state.theCar = [];
    },
    RemoveitemsOnCar: (state, id) => {

      var index = null;
      for (var i = 0; i < state.theCar.length; i++) {
        if (state.theCar[i].juid == id) {
          index = i;
          break;
        }
      }
      state.theCar.splice(index, 1);
    },
    sheet: state => {
      state.sheet = !state.sheet;
    },
    setGames: (state, games) => {
      state.games = games;
    },
    setmyGames: (state, myGames) => {
      state.myGames = myGames;
    },
    setbanner: (state, ban) => {
      state.banner = ban;
    },
    setCatego: (state, cats) => {
      state.catego = cats;
    },
    setSubcatego: (state, subcats) => {
      state.subcatego = subcats;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
    },
    setcategoInactivas: (state, cats) => {
      state.categoInactivas = cats;
    },
    setsubCatsInactivas: (state, subcats) => {
      state.subCatsInactivas = subcats;
    }
  },
  actions: {
    api_register: (context, credentials) => {
      var tosend = {
        cliusuario: credentials.username,
        clipassword: credentials.password,
        clinombre: credentials.name,
        clicorreo: credentials.email,
        clifondos: credentials.fondos,
        clifechanac: credentials.date
      };
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/user/signup', tosend)
          .then(res => {
            console.log(res.data.msg);
            resolve(res);
          })
          .catch(err => {
            //console.log(err);
            reject(err);
          })
      })
    },
    api_login: (context, credentials) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/user/login',
          { cliusuario: credentials.user, clipassword: credentials.password })
          .then(res => {
            const token = res.data.token;
            // magic 3 lines, just keep it, i know that ypu know, you write magic
            if (token == undefined) {
              const { user } = jwtDecode(context.getters.token)
            }
            // *-*
            localStorage.setItem('access_token', token);
            context.commit('tokenMutation', token);

            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    logout: context => {
      if (context.getters.loggedIn) {
        localStorage.removeItem('access_token');
        context.commit('destroyToken');
      } else if (context.getters.loggedIn_admin) {
        localStorage.removeItem('admin_token');
        context.commit('destroyToken');
      }
    },
    profileInfo: context => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        // console.log(decoded);
        axios.post('http://localhost:8001/user/profile', { "username": decoded.userExistent })
          .then(res => {
            console.log(res.data.profileInfo.clifechanac);
            context.commit('setProfile', res.data.profileInfo);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    updateProfileInfo: (context, info) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        // console.log(decoded);
        axios.post('http://localhost:8001/user/updateProfile', info)
          .then(res => {
            // context.commit('setProfile', res.data.profileInfo);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    getBills: context => {
      const decoded = jwtDecode(context.getters.token);
      axios.post('http://localhost:8001/user/billsForClient', { "username": decoded.userExistent })
        .then(res => {
          context.commit('setBills', res.data.allbills);
        })
        .catch(err => {
          console.log(err);
        })
    },
    getGames: context => {

      if (context.getters.loggedIn) {
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8001/game/gamesForClient', { "username": decoded.userExistent })
          .then(res => {
            context.commit('setGames', res.data.allgames);
            context.commit('setmyGames', res.data.yourgames);
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        axios.get('http://localhost:8001/game')
          .then(res => {
            context.commit('setGames', res.data.games);
          })
          .catch(err => {
            console.log(err);
          })
      }

    },
    getGamesForAdmin: context => {
      axios.get('http://localhost:8001/game/gamesAdmin')
        .then(res => {
          context.commit('setGames', res.data.allgames);
        })
        .catch(err => {
          console.log(err);
        })
    },
    searchWordKey: (context, value) => {
      if (context.getters.loggedIn) {
        const decoded = jwtDecode(context.getters.token);
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8001/game/searchGamesKeyWordForClient', { "username": decoded.userExistent, "kword": value })
            .then(res => {
              context.commit('setGames', res.data.games);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
        });
      } else {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8001/game/searchGamesKeyWord', { "kword": value })
            .then(res => {
              context.commit('setGames', res.data.games);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
        });
      }
    },
    getGamesSearchBy: (context, value) => {
      if (context.getters.loggedIn) {
        const decoded = jwtDecode(context.getters.token);
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8001/game/searchGamesByForClient', { "username": decoded.userExistent, "subcat": value })
            .then(res => {
              console.log(res.data.games);
              context.commit('setGames', res.data.games);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
        });
      } else {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8001/game/searchGamesBy', { "subcat": value })
            .then(res => {
              context.commit('setGames', res.data.games);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
        });
      }
    },
    getCategories: context => {
      // axios.get('http://localhost:8001/user/categories')
      axios.get('http://localhost:8001/category/')
        .then(res => {
          context.commit('setCatego', res.data.cats);
        })
        .catch(err => {
          console.log(err);
        })
    },
    getCategoriesCombo: context => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8001/category/')
          .then(res => {
            resolve(res.data.cats);
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCategoriesInactivasCombo: context => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8001/category/inactivas')
          .then(res => {
            //console.log(res.data.cats);
            context.commit('setcategoInactivas', res.data.cats);
            resolve(res.data.cats);
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getSubcategoriesCombo: context => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8001/subcategory/combo')
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getSubcategoriesInactivasCombo: context => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8001/subcategory/inactivas')
          .then(res => {
            context.commit('setsubCatsInactivas', res.data);
            resolve(res.data);
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    createCategory: (context, cat) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/category/', { 'list': cat })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    editCategory: (context, cat) => {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8001/category/', cat)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    reactivateCategory: (context, cat) => {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8001/category/reactivate', { 'catid': cat })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    reactivateSubcategory: (context, subcat) => {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8001/subcategory/reactivate', { 'subid': subcat })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    deleteCategory: (context, cat) => {
      return new Promise((resolve, reject) => {
        axios.delete('http://localhost:8001/category/' + cat)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    deleteSubcategory: (context, subcat) => {
      return new Promise((resolve, reject) => {
        axios.delete('http://localhost:8001/subcategory/' + subcat)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    getSubcategories: context => {
      axios.get('http://localhost:8001/subcategory')
        .then(res => {
          //console.log(res.data.subcats);

          context.commit('setSubcatego', res.data.subcats);
        })
        .catch(err => {
          console.log(err);
        })
    },
    createSubcategory: (context, be) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/subcategory', { 'list': be })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });

    },
    editSubcategory: (context, sub) => {
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8001/subcategory/', sub)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    createGame: (context, game) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/game/crearGame', game)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    searchToEdit: (context, value) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/game/searchGamesKeyWord', { "kword": value })
          .then(res => {
            resolve(res.data.games);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    editGame: (context, obj) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/game/editGame', obj)
          .then(res => {
            resolve(res.data.games);
          })
          .catch(err => {
            console.log(err);
          })
      });
    },
    purchase: (context, obj) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8001/sales', {'allinfo': obj, "username": decoded.userExistent})
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
          })
      });
    }
  }
})
