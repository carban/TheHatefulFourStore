<template lang="html">
  <div>
    <v-app id="inspire">
      <!-- <v-content> -->
        <v-container >
          <v-layout align-center justify-center >
            <v-flex xs12 sm10 md6 >
              <v-card class="elevation-20" >
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success">Login</v-btn>
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
}
</script>

<style lang="css" scoped>

</style>
