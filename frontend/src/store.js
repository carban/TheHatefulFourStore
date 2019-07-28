import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openMenu: null,
    sheet: false,
    theCar: []
  },
  getters: {
    itemsOnCar: state => {
      return state.theCar.length;
    },
    sheet: state => {
      return state.sheet;
    },
    car: state => {
      return state.theCar;
    }
  },
  mutations: {
    AdditemsOnCar: (state, item) => {
      state.theCar.push(item);
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
    }
  },
  actions: {

  }
})
