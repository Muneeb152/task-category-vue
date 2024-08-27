<!--  This is dashboard page which containe welcom messages and some tiles view that direct us to specific page -->
<template>
  <v-col cols="12" md="12" sm="12">
    <!---------------------------- Welcome Row ----------------------------->
    <v-row no-gutters class="text-center">
      <v-col cols="12" md="12" sm="12">
        <v-card elevation="0" class="mt-4">
          <h1 style="color:red">Welcome to Blood Donation System</h1>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-card elevation="0" class="mt-4">
          <strong class="blue-grey--text text--darken-1">
            Donate Blood, Save a Life
          </strong>
        </v-card>
      </v-col>
    </v-row>
    <!--------------------- Tiles Views and Nevigations ------------------->
    <v-row no-gutters class="center mt-4 mx-16">
      <img width="100%" height="350" src="@/assets/drip.gif"/>
    </v-row>
    <!------------------------------------------------------------------------->
  </v-col>
</template>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
