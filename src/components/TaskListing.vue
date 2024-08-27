<template>
  <v-data-table
    :headers="headers"
    :items="getDonorsData"
    :search="search"
    sort-by="u_id"
    class="elevation-1 ma-3"
  >
    <template v-slot:top>
      <!---------Tool Bar----------->
      <v-toolbar color="#03A9F4" flat>
          <v-toolbar-title class="white--text" 
            >Task's Listing
          </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-title class="mr-15">
              <!---------Search Bar----------->
          <v-text-field
            v-model="search"
            dark
            append-icon="mdi-magnify"
            label="Search Task"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <!---------Text Fields Used to Display Data in the Data Table----------->
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <v-card>
            <v-divider></v-divider>
            <br />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.u_id"
                      label="Donor Id"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" >
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.blood_group"
                      label="Blood Group"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.name"
                      label="Donor Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.city"
                      label="Donor Address"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-------------------------------Message Button-------------------------------->
    <template v-slot:[`item.actions`]="{  }">
       <v-btn
       class="red lighten-2 white--text"
       outlined
       @click="chat">
        Message
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DonorComponent",
  data: () => ({
    dialog: false,
    search: "",
    dialogDelete: false,
    dialoginfo: false,
    headers: [
       {
        text: "Id",
        align: "start",
        sortable: true,
        value: "id",
      },
      // { text: "Id", value: "id", sortable: false },
      { text: "Task Name", value: "name" },
      { text: "Description", value: "description"},
      { text: "Start Date", value: "start_date"},
      { text: "End Date", value: "end_date"},
      { text: "Category Name", value: "category_id", sortable: false },
      { text: "Task Image", value: "image", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    donorId: -1,
    editedIndex: -1,
    donorDetail: {},
  }),

  computed: {
     ...mapGetters(["getDonorsData"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialoginfo(val) {
      val || this.close();
    },
  },

  methods: {
    ...mapActions(["addDonor"]),
    save() {
      if (this.editedIndex > -1) {
        this.updateDonor({
          donorIndex: this.editedIndex,
          updatedData: this.donorDetail,
        });
      } else {
        this.addDonor(this.donorDetail);
      }
      this.close();
    },
    chat()
    {
      this.$router.push("/Chat")
    },
  },
};
</script>
