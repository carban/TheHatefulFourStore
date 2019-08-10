import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme:{
      primary: "#673AB7",
      secondary: "#ff5722",
      accent: "#607d8b",
      error: "#f44336",
      warning: "#ffc107",
      info: "#03a9f4",
      success: "#4caf50"
      },
  options: {
    customProperties: true
  },
  iconfont: 'md',
})
