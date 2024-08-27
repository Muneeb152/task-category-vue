/* eslint-disable */ 
<template>
  <v-app>
    <router-view :key="$route.path"></router-view>
    <appBar></appBar>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import appBar from "@/components/Dashboard/headerBar.vue";

export default {
  name: "DashboardView",
  components: { appBar },

  mounted() {
    console.log('Component is mounted.');
    this.getDonor();
  },

  methods: {
    ...mapActions(["getDonor"]),
  },
};
</script>

<style>
table th + th {
  border-left: 1px solid black;
}
table td + td {
  border-left: 1px solid black;
}
</style>
