<!-- This Component is used to Sign Up to Blood Donation System -->
<template>
  <v-card
  max-width="600"
  class="pa-8 mt-8 mb-8 rounded mx-auto"
  outlined
  >
    <v-card-text  xs4>
      <v-layout row class=" mb-n6" wrap justify-space-between>
        <v-flex xs12 >
          <v-layout row wrap justify-space-between>
                <!--Main Heading-->
            <v-flex xs12 lg12 class="mb-2">
              <div style="text-align:center; color:black">
              <!--SignUp Heading-->
           <h2 class="font-weight-medium"> Sign Up</h2>
           <br>
           </div>
            </v-flex>
            <!--Name TextField-->
            <v-flex xs12 lg12 class="mb-n1">
              <v-text-field
                v-model="firstname"
                label="Name"
                type="text"
                outlined
                dense
                :rules="[() => !!firstname || 'This field is required']"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 lg12 class="mb-n1">
              <v-text-field
                v-model="Email"
                label="Email"
                type="text"
                outlined
                dense
                required
                :rules="emailRules"
              ></v-text-field>
              <!--Contact Number TextField-->
            </v-flex>
            <v-flex xs12 md6 class="pr-2">
                <v-text-field
           v-model="pasword"
            required
            outlined
            dense
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            @click:append="show3 = !show3"
             :rules="passwordRules"
          ></v-text-field>
           <!--Confirm Password TextField-->
            </v-flex>
            <v-flex xs12 md6 class="pl-2">
                <v-text-field
           v-model="cpasword"
            required
            outlined
            dense
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm Password"
            class="input-group--focused"
            @click:append="show4 = !show4"
             :rules="passwordRules"
          ></v-text-field>
            </v-flex>
          <!--Sign In Link-->
            <v-flex lg6 class="mt-5 mb-5">
              <h4>
                <router-link to="/" class=" text-decoration-none ">
                  <a class="primary--text " >LogIn to Account</a>
                </router-link>
              </h4>
            </v-flex>
            <!-- Sign Up Button-->
            <v-flex lg4 class="mt-8 mr-n12">
              <v-btn
              class="mt-n8 white--text"
              width="100"
              color="primary"
              link
              @click="newRegister"
              >
                SIGN UP
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  
  data() {
    return {
        show3:false,
        show4:false,
      checkbox: false,
      firstname:'',
      Email: "",
      pasword:'',
      cpasword:'',
      user:'',
      cnumber:'',
       emailRules: [
  v => !!v || 'E-mail is required',
  v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
 ],
      passwordRules: [
  v => !!v || 'Password is required',
  v => v.length >= 6 || "Min 8 characters",
 ],
      
    };
  },
  computed:
  {
   ...mapGetters(["getRegistrations"]),
  },
  methods:
  {
       ...mapActions(["Registrations"]),
    newRegister() {
      this.signupLoader = true;
      this.Registrations({
        name: this.firstname,
        email: this.Email,
        password: this.pasword,
        password_confirmation:this.cpasword,
        
      }).then(
        (response) => {
          console.log(response.data);
          this.signupLoader = false;
          alert("Sign Up Sucessfully");
          this.$router.push("/");
        },
        (error) => {
          console.log("error:::", error);
          this.signupLoader = false;
          this.snackbar = true;
          this.text = "Something Went Wrong";
          this.color = "error";
        }
      );
    },
  },
  };
</script>
<style scoped>
.addSpaceRight{
  margin-right: 250px;
}
.reducewidth{
  width: 198px;
}
</style>
