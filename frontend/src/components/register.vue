<template lang="html">
  <div>
    <v-app id="inspire">
      <!-- <v-content> -->
        <v-container>
          <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="error">
            Please check your input
            <v-btn color="white" flat @click="snack = false">
              Close
            </v-btn>
          </v-snackbar>
          <v-snackbar v-model="snackT" top right multi-line :timeout=6000 color="success">
            Registered Successfully
            <v-btn color="white" flat @click="snackT = false">
              Close
            </v-btn>
          </v-snackbar>
          <v-layout align-center justify-center>
            <v-flex xs12 sm10 md6>
              <v-card class="elevation-20">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="user.username" prepend-icon="person" name="name" label="Username" type="text" required></v-text-field>
                    <v-text-field v-model="user.name" prepend-icon="person" name="name" label="Name" type="text" required></v-text-field>
                    <v-text-field v-model="user.email" prepend-icon="email" name="email" label="email" type="email" required></v-text-field>
                    <v-text-field v-model="user.date" prepend-icon="person" name="birthday" label="birthday" type="date" required></v-text-field>
                    <v-text-field v-model="user.password" prepend-icon="lock" name="password" label="password" id="password" type="password" required></v-text-field>
                    <v-text-field v-model="confirm" prepend-icon="lock" name="confirm" label="confirm" id="password" type="password" required></v-text-field>
                  </v-form>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="pink" @click="register()">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      <!-- </v-content> -->
    </v-app>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:{
        username: null,
        name: null,
        email: null,
        date: null,
        password: null,
        fondos: 0
      },
      confirm: null,
      snack: false,
      snackT: false
    }
  },
  methods: {
    register(){
      if (this.user.password == this.confirm) {
        if (this.user.username != null || this.user.name != null || this.user.email != null || this.user.date != null || this.user.fondos != null) {
          this.$store.dispatch('api_register', this.user)
          .then(response => {
            this.snackT = true;
            this.$router.push({name: 'login'});
          })
          .catch(err => {
            this.snack = true;
          })
        }
      }else{
        this.snack = true;
      }

    }
  }
}
</script>

<style lang="css" scoped>
</style>
