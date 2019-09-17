<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-snackbar v-model="snack" top right multi-line :timeout=6000 color="success">
      Updated!
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snack2" top right multi-line :timeout=6000 color="error">
      Please check your input
      <v-btn color="white" flat @click="snack = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-tabs v-model="active" color="dark" slider-color="primary">
      <v-tab>
        Profile
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>SUPPORT USER PROFILE</h1>

            <v-btn color="pink" @click="updateProfile">Update</v-btn>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        MY GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
         <v-container grid-list-xs,sm,md,lg,xl>
          <h1>MY GAMES</h1>

          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab>
        Bills
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>Bills</h1>

          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab>
        CLAIMS
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>CLAIMS</h1>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      active: null,
      snack: false,
      snack2: false,
    }
  }
}
</script>

<style lang="css" scoped>
</style>
