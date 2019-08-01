import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    openMenu: null,
    sheet: false,
    theCar: [],
    profile: {cliusuario: null, clinombre: null, clicorreo: null, clifondos: null, clifechanac: null},
    catego: [],
    subcatego: [],
    games: [],
    myGames: []
  },
  getters: {
    token: state => {
      return state.token;
    },
    loggedIn: state => {
      return state.token !== null;
    },
    profile: state => {
      return state.profile;
    },
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
    catego: state => {
      return state.catego;
    },
    subcatego: state => {
      return state.subcatego;
    }
  },
  mutations: {
    tokenMutation: (state, token) => {
      state.token = token;
    },
    destroyToken: state => {
      state.token = null;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
    },
    AdditemsOnCar: (state, item) => {
      state.theCar.push(item);
    },
    setEmptyCar: state => {
      state.theCar = [];
    },
    RemoveitemsOnCar: (state, id) => {
      var index = null;
      for(let i=0; i<=state.theCar.length; i++){
        if (state.theCar[i].id==id) {
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
    setCatego: (state, cats) => {
      state.catego = cats;
    },
    setSubcatego: (state, subcats) => {
      state.subcatego = subcats;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
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
        {cliusuario: credentials.user, clipassword: credentials.password})
          .then(res => {
            const token = res.data.token;
            localStorage.setItem('access_token', token);
            context.commit('tokenMutation', token);
            const {user} = jwtDecode(context.getters.token)
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    logout: context =>{
      if(context.getters.loggedIn){
        localStorage.removeItem('access_token');
        context.commit('destroyToken');
      }
    },
    profileInfo: context => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        // console.log(decoded);
        axios.post('http://localhost:8001/user/profile', {"username": decoded.userExistent})
          .then(res => {
            // console.log(res.data);
            context.commit('setProfile', res.data.profileInfo);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    getGames: context => {
      if (context.getters.loggedIn) {
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8001/user/gamesForClient', {"username": decoded.userExistent})
          .then(res => {
            context.commit('setGames', res.data.allgames);
            context.commit('setmyGames', res.data.yourgames);
          })
          .catch(err => {
            console.log(err);
          })
      }else{
        axios.get('http://localhost:8001/user/games')
          .then(res => {
            context.commit('setGames', res.data.games);
          })
          .catch(err => {
            console.log(err);
          })
      }

    },
    getGamesSearchBy: (context, value) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8001/user/searchGamesBy', {"subcat": value})
          .then(res => {
            context.commit('setGames', res.data.games);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });

    },
    getCategories: context => {
      axios.get('http://localhost:8001/user/categories')
        .then(res => {
          context.commit('setCatego', res.data.cats);
        })
        .catch(err => {
          console.log(err);
        })
    },
    getSubcategories: context => {
      axios.get('http://localhost:8001/user/subcategories')
        .then(res => {
          context.commit('setSubcatego', res.data.subcats);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
})
