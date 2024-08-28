<template>
  <div>
    <v-btn
      class="mt-2 ml-3"
      color="primary"
      @click="openAddTaskModal"
    >
      Add Task
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="getDonorsData"
      :search="search"
      sort-by="u_id"
      class="elevation-1 ma-3"
    >
      <!-- DataTable content -->
      <template v-slot:top>
        <v-toolbar color="#03A9F4" flat>
          <v-toolbar-title class="white--text">Task's Listing</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-title class="mr-15">
            <v-text-field
              v-model="search"
              dark
              append-icon="mdi-magnify"
              label="Search Task"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-toolbar>
      </template>

      <!-- Image slot -->
      <template v-slot:item.image="{ item }">
        <div class="mx-auto my-2">
          <v-img
            v-if="item.image"
            :src="item.image"
            alt="Task Image"
            max-height="50px"
            max-width="50px"
          ></v-img>
        </div>
      </template>

      <!-- Actions slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <add-task-modal
      v-if="dialog"
      :task-detail="donorDetail"
      :categories="categories"
      @close="close"
      @save="save"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddTaskModal from "@/components/AddTaskModal.vue"; // Ensure correct import path

export default {
  name: "TaskListingComponent",
  components: {
    AddTaskModal,
  },
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        { text: "Id", align: "start", sortable: true, value: "id" },
        { text: "Task Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Category Name", value: "category_name", sortable: false },
        { text: "Task Image", value: "image", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      donorDetail: {},
      editedIndex: -1,
      categories: [],
    };
  },

  computed: {
    ...mapGetters(["getDonorsData"]),
  },

  watch: {
    getDonorsData: {
    handler(tasks) {
      const categoryMap = new Map();
      tasks.forEach(task => {
        if (!categoryMap.has(task.category_id)) {
          categoryMap.set(task.category_id, {
            id: task.category_id,
            name: task.category_name
          });
        }
      });
      this.categories = Array.from(categoryMap.values());
    },
    immediate: true,
  },
  },

  methods: {
    ...mapActions(["addTask", "updateDonor"]),

    openAddTaskModal() {
      this.donorDetail = {}; // Reset donorDetail for adding a new task
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.donorDetail = { ...item };
      this.editedIndex = this.getDonorsData.indexOf(item);
      this.dialog = true;
    },

    save(taskDetail) {
      // Use taskDetail.category_id directly as it should be updated correctly in the modal
      const updatedTaskDetail = {
        ...taskDetail,
      };
      if (this.editedIndex > -1) {
        this.updateDonor({
          donorIndex: this.editedIndex,
          updatedData: updatedTaskDetail,
        });
      } else {
        this.addTask(updatedTaskDetail);
      }
      this.close();
    },

    close() {
      this.dialog = false;
      this.donorDetail = {};
      this.editedIndex = -1;
    },
  },
};
</script>
