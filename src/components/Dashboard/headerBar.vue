<!-- In this components we are going to make a header bar and a drawer menu 
in drawer menu we are doing to import "DrawerMenu" component -->
<template>
  <v-app id="inspire">
    <!----------------------------Nav Drawer ----------------------------------->
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      app
      stateless
      oveflow-hidden
      class="blue lighten-1 disable-resize-watcher"
      dark
    >
      <drawermenu />
    </v-navigation-drawer>
    <!-------------------------App BAr ---------------------------------->
    <v-app-bar app class="white--text"
    color="primary" >
      >
      <v-app-bar-nav-icon @click="drawer = !drawer" dark tile class="light-blue"
        ><v-icon v-if="drawer">menu_open</v-icon>
        <v-icon v-else>menu</v-icon></v-app-bar-nav-icon
      >

      <v-toolbar-title style="cursor: pointer"
        >Task Management</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!------------------------- Sign Out Button ------------------------->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            tile
            elevation="0"
            @click="SignOutClear"
            class="light-blue white--text"
            v-bind="attrs"
            v-on="on"
          >
          <v-icon>logout</v-icon>
          Sign Out
          </v-btn>
        </template>
        <span>Log Out</span>
      </v-tooltip>
    </v-app-bar>
    <!------------------------------------------------------------------------->
  </v-app>
</template>

<script>
import drawermenu from "@/components/Dashboard/drawerMenu.vue";
import { mapActions } from "vuex";
export default {
  data: () => ({ drawer: true }),
  components: { drawermenu },
  methods: {
    ...mapActions(["SignOutClear"]),
  },
};
</script>
