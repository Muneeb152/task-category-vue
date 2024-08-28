<!-- This Component is used to Log In to Blood Donation System -->
<template>
<!--V-Card-->
  <v-card class="justify-center pt-20 pa-18" elevation="0">
    <v-row>
      <v-col cols="12" class="mt-13">
       <v-card ref="form" width="400" class="mx-auto" >
        <v-card-text>
            <div style="text-align:center;">
                <!--Main Heading-->
                <!--Sign In Heading-->
           <h2 style="color:black;" class="font-weight-medium"> Sign In</h2>
           <br>
           </div>
             <!--Email Text Field-->
          <v-text-field
          class="ml-6 mr-6"
            ref="name"
            v-model="Email"
            :rules="emailRules"
            :error-messages="errorMessages"
            label="Email"
            required
            outlined
          ></v-text-field>
            <!--Password Text Field-->
           <v-text-field
           v-model="pasword"
            required
            outlined
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            class="input-group--focused ml-6 mr-6"
            @click:append="show3 = !show3"
             :rules="passwordRules"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="my-n4">
            <!--Sign Up Link-->
            <router-link to="/SignUp"><a class="primary--text font-weight-bold ml-8" href="">Create Account </a></router-link>
          <v-spacer></v-spacer>
            <!--Log In Button-->
          <v-btn
            class="mr-7 mb-2 white--text" 
            color="primary"
            @click="setSignInInfo"
          >
           LogIn
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
  export default {
    data: () => ({
      errorMessages: '',
      Email:'',
      pasword:'',
      name: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      formHasErrors: false,
      show3: false,
emailRules: [
  v => !!v || 'E-mail is required',
  v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
 ],
 passwordRules: [
  v => !!v || 'Password is required',
  v => v.length >= 6 || "Min 6 characters",
 ],
    }),

    computed: {
      ...mapGetters(["getSignInCredentials"]),
    },
    watch: {
      name () {
        this.errorMessages = ''
      },
    },
    mounted() {
  
      localStorage.clear();
},

    methods: {
        ...mapActions(["SignInCredentials","getDonor",]),
    setSignInInfo() {
      this.loginLoader = true;
      this.SignInCredentials({
        email: this.Email,
        password: this.pasword,
      }).then(
        (response) => {
          console.log(response.data);
          
          this.loginLoader = false;
          this.getDonor();
          this.$router.push("/dashboard");
        },
        (error) => {
          alert("Email or Password Doesnot Match  "+ error);
          console.log("error:::", error);
          this.loginLoader = false;
        }
      );
    },
    },
  }
</script>
<style scoped>
a{
  text-decoration: none;
}
</style>