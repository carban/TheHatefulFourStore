<template lang="html">
  <div>
    <v-app id="inspire">
      <!-- <v-content> -->
        <v-container >
          <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="error">
            Please check your input
            <v-btn color="white" flat @click="snack = false">
              Close
            </v-btn>
          </v-snackbar>
          <v-layout align-center justify-center >
            <v-flex xs12 sm10 md6 >
              <v-card class="elevation-20" >
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="login()">
                    <v-text-field v-model="access.user" prepend-icon="person" name="login" label="Login" type="text" required></v-text-field>
                    <v-text-field v-model="access.password" prepend-icon="lock" name="password" label="Password" id="password" type="password" required></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" color="pink">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
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
    return {
      access: {
        user: null,
        password: null
      },
      success: false,
      snack: false,
    }
  },
  methods: {
    login(){
      if (this.access.user == 'admin' && this.access.password == 'admin') {
        //TEMPORALY TRUCK, DONT DO THIS AGAIN
        // this.$store.commit('setAdmin', true);
        localStorage.setItem('admin_token', 'admin');
        this.$store.commit('admin_tokenMutation', 'admin');
        this.$router.push({name: 'profileAdmin'});
      }else{
        this.$store.dispatch('api_login', this.access)
          .then(response => {
            this.success = true;
            this.$router.push({name: 'profile'})
          })
          .catch(err => {
            this.snack = true;
          });
      }

    },
    login2(){
      this.$store.dispatch('api_login', this.access)
        .then(response => {
          this.success = true;
          this.$router.push({name: 'profile'})
        })
        .catch(err => {
          this.snack = true;
        });
    }
  }
}
</script>

<style lang="css" scoped>

</style>
