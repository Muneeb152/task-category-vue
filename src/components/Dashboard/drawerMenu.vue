<!-- This component is bulding two lists one is used for data who loged in into system and other is to the navigation menu -->
<template>
  <!---------------------------Drawer Card ---------------------------------->
  <v-card elevation="0" color="primary" height="100vh">
    <v-list>
      <v-list-item class="justify-center">
        <v-avatar color="white" rounded size="42"
          ><span class="primary--text text-center"></span></v-avatar
        >
      </v-list-item>

      <v-list-item class="text-center">
        <v-list-item-content>
          <v-list-item-title class="title">
            
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="fetchData(item)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- loader -->
    <v-dialog v-model="loader" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text class="text-center">
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0 mt-1"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    user: {
      initials: "AD",
      fullName: "Muneeb Akhtar",
      userDesgnation: "Admin",
    },
    loader: false,
    items: [
      { title: "Tasks Listing", linkTo: "/dashboard", icon: "dashboard" },
      // { title: "Donors", linkTo: "/Donor", icon: "groups" },
      // { title: "Receiver", linkTo: "/Receiver", icon: "groups" },
      // { title: "Chat", linkTo: "/Chat", icon: "message" },
    ],
    employeeData: {
      empName: " ",
      empID: "",
      empEmail: " ",
    },
  }),
  computed: {
    ...mapGetters(["getSignInCredentials"]),

    getInitials() {
      console.log(this.getSignInCredentials);
      let name = this.getSignInCredentials.FullName;
      name = name.split(" ");
      let characters = "";
      if (name.length > 1) {
        for (let index = 0; index < name.length; index++) {
          characters += name[index][0];
        }
        return characters;
      }

      return (
        this.getSignInCredentials.FullName[0] +
        this.getSignInCredentials.FullName[1]
      );
    },
  },
  methods: {
    ...mapActions([ "getDonor", "getReceiver"]),
     
    fetchData(item) {
      //  if (item.title == "Donors") {
      //   this.getDonor().then(
      //     (response) => {
      //       if (response.status == 200) {
      //         this.loader = false;
      //         this.$router.push("/Donor").catch(() => {});
      //       }
      //     },
      //     (error) => {
      //       console.log("error::", error);
      //       this.loader = false;
      //     }
      //   );
      // } 
      // else if (item.title == "Receiver") {
      //   this.getReceiver().then(
      //     (response) => {
      //       if (response.status == 200) {
      //         this.loader = false;
      //         this.$router.push("/Receiver").catch(() => {});
      //       }
      //     },
      //     (error) => {
      //       console.log("error::", error);
      //       this.loader = false;
      //     }
      //   );
      // }
      if (item.title == "Dashboard") {
        this.getDonor().then(
          (response) => {
            if (response.status == 200) {
              this.loader = false;
              this.$router.push("/dashboard").catch(() => {});
            }
          },
          (error) => {
            console.log("error::", error);
            this.loader = false;
          }
        );
      } 
      else if (item.title == "Chat") {
        this.loader = false;
        this.$router.push("/Chat").catch(() => {});
      } 
    },
  },
};
</script>
