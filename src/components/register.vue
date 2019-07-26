<template lang="html">
  <div>
    <v-app id="inspire">
      <!-- <v-content> -->
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 sm10 md6>
              <v-card class="elevation-20">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="name" label="Name" type="text" required></v-text-field>
                    <v-text-field prepend-icon="person" name="last name" label="Last Name" type="text" required></v-text-field>
                    <v-text-field prepend-icon="phone" name="phone" label="Phone" type="phone" required></v-text-field>
                    <v-text-field prepend-icon="email" name="email" label="email" type="email" required></v-text-field>
                    <v-text-field prepend-icon="add_location" name="address" label="Address" type="text" required></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="password" id="password" type="password" required></v-text-field>
                    <v-text-field prepend-icon="lock" name="confirm" label="confirm" id="password" type="password" required></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success">Register</v-btn>
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
