<template lang="html">

  <div>

    <v-tabs v-model="active" color="white" slider-color="primary">
      <v-tab>
        Profile
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-container grid-list-xs,sm,md,lg,xl>
            <h1>CLIENT PROFILE</h1>
            <v-form>
              <v-text-field v-model="user.cliusuario" prepend-icon="person" name="name" label="Username" type="text" disabled></v-text-field>
              <v-text-field v-model="user.clinombre" prepend-icon="person" name="name" label="Name" type="text" required></v-text-field>
              <v-text-field v-model="user.clicorreo" prepend-icon="email" name="email" label="email" type="email" required></v-text-field>
              <v-text-field v-model="user.clifechanac" prepend-icon="add_location" name="birthday" label="birthday" type="date" required></v-text-field>
            </v-form>
            <v-btn color="secondary" @click="update">Update</v-btn>
          </v-container>

        </v-card>
      </v-tab-item>
      <v-tab>
        MY GAMES
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <h1>MY GAMES</h1>
        </v-card>
      </v-tab-item>
      <v-tab>
        FIGHTS
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <h1>FIGHTS</h1>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  computed:{
    user(){
      console.log(this.$store.getters.profile.clifechanac);
      return this.$store.getters.profile;
    }
  },
  data(){
    return{
      active: null,
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('profileInfo')

  },
  methods: {
    /*
    updateProfileInfo(){
      var newProfile = {
        cliusuario: this.user.username,
        clinombre: this.user.name,
        clicorreo: this.user.email,
        clifechanac: this.user.date,
        clipassword: this.user.password
        clifondos: this.user.fondos
      }
      this.$store.dispatch('updateProfileInfo', newProfile)
        .then(res => {
          console.log(res.data.msg);
          this.$store.dispatch('profileInfo')
            .then(res => {
              this.flashalert = true;
              this.flashMe({ message: 'Profile Updated', variant: 'success' });
            })
        })
    },*/

  }
}
</script>

<style lang="css" scoped>
</style>
