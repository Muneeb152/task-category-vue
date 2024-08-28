<template>
  <div>
    <v-btn
      class="mt-2 ml-3"
      color="primary"
      @click="openAddTaskModal"
    >
      Add Task
    </v-btn>

    <v-btn
      class="mt-2 ml-3"
      color="primary"
      @click="openAddTaskModal"
    >
      Add Category
    </v-btn>
    <v-btn
      class="mt-2 ml-3"
      color="primary"
      @click="exportToExcel"
    >
      Export to Excel
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
        <v-icon size="small" @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <add-task-modal
      v-if="dialog"
      :task-detail="donorDetail"
      :categories="categories"
      @close="close"
      @save="save"
    />

    <!-- Delete Modal -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this task?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDeleteModal">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="handledeleteTask()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddTaskModal from "@/components/AddTaskModal.vue";
import axios from 'axios'
export default {
  name: "TaskListingComponent",
  components: {
    AddTaskModal,
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
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
      taskToDelete: null,
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
    ...mapActions(["addTask", "updateTask", "deleteTask", "getDonor"]),

    openAddTaskModal() {
      this.donorDetail = {};
      this.editedIndex = -1;
      this.dialog = true;
    },

    editItem(item) {
      this.donorDetail = { ...item };
      this.editedIndex = item.id;
      this.dialog = true;
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.taskToDelete = item;
    },

    handledeleteTask() {
      this.closeDeleteModal();
      this.deleteTask({ taskId: this.taskToDelete.id }).then(() => {
        this.getDonor();

      });
    },

    save(taskDetail) {
      const formData = new FormData();
      for (const key in taskDetail) {
        if (key === "image" && taskDetail[key] instanceof File) {
          formData.append(key, taskDetail[key]);
        } else if (key !== "category_name") {
          formData.append(key, taskDetail[key]);
        }
      }

      if (this.editedIndex > -1) {
        this.updateTask({
          taskIndex: this.editedIndex,
          updatedData: formData,
        });
      } else {
        this.addTask(formData);
        this.getDonor();
      }
      this.close();
    },
    

    close() {
      this.dialog = false;
      this.donorDetail = {};
      this.editedIndex = -1;
    },

    closeDeleteModal() {
      this.deleteDialog = false;
      this.taskToDelete = null;
    },
    exportToExcel() {
      let token = localStorage.getItem("token");

      axios({
        url: "http://127.0.0.1:8000/api/task/export",
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "tasks.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting to Excel:", error);
        alert("Failed to export tasks. Please try again.");
      });
    },
  },
};
</script>
