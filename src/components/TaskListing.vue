<template>
  <div>
    <v-row class="mt-3 ml-3">
      <v-col cols="12" md="auto">
        <v-btn class="mr-3" color="primary" @click="openAddTaskModal">
          Add Task
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn class="mr-3" color="primary" @click="openAddCategoryModal">
          Add Category
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn color="primary" @click="exportToExcel">
          Export to Excel
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="ml-3">
      <v-col cols="12" md="4">
        <!-- Category Filter Dropdown -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          item-value="id"
          item-text="name"
          label="Filter by Category"
          solo
        ></v-select>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn class="ml-md-3 mt-md-0 mt-2" color="primary" @click="filterByCategory">
          <v-icon left>mdi-magnify</v-icon>
          Search
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="filteredTasks" :search="search" sort-by="u_id" class="elevation-1 ma-3">
      <!-- DataTable content -->
      <template v-slot:top>
        <v-toolbar color="#03A9F4" flat>
          <v-toolbar-title class="white--text">Task's Listing</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-title class="mr-15">
            <v-text-field v-model="search" dark append-icon="mdi-magnify" label="Search Task" single-line hide-details></v-text-field>
          </v-card-title>
        </v-toolbar>
      </template>

      <!-- Image slot -->
      <template v-slot:item.image="{ item }">
        <div class="mx-auto my-2">
          <v-img v-if="item.image" :src="item.image" alt="Task Image" max-height="50px" max-width="50px"></v-img>
        </div>
      </template>

      <!-- Actions slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <add-category-modal :dialog="categoryDialog" @close="closeCategoryModal" @save="saveCategory" />
    <add-task-modal v-if="dialog" :task-detail="donorDetail" :categories="categories" @close="close" @save="save" />

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
import AddCategoryModal from "@/components/AddCategoryModal.vue";
import axios from 'axios'
export default {
  name: "TaskListingComponent",
  components: {
    AddTaskModal,
    AddCategoryModal,
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
      categoryDialog: false,
      selectedCategory: null,  // For category filter
      filteredTasks: [],  // To hold filtered tasks
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
              name: task.category_name,
            });
          }
        });
        this.categories = Array.from(categoryMap.values());
        this.filteredTasks = tasks;  // Initialize with all tasks
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(["addTask", "updateTask", "deleteTask", "getDonor", "addCategory"]),
    async fetchCategories() {
      let token = localStorage.getItem("token");
      
      try {
        const response = await axios({
          url: "http://127.0.0.1:8000/api/categories",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categories = response.data;
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },

    openAddCategoryModal() {
      this.categoryDialog = true;
    },
    closeCategoryModal() {
      this.categoryDialog = false;
    },
    saveCategory(categoryDetail) {
      this.closeCategoryModal();
      this.addCategory(categoryDetail);
      this.getDonor();
    },
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
    filterByCategory() {
      if (this.selectedCategory) {
        this.filteredTasks = this.getDonorsData.filter(
          (task) => task.category_id === this.selectedCategory
        );
      } else {
        this.filteredTasks = this.getDonorsData;  // Show all tasks if no category is selected
      }
    },
  },
};
</script>

