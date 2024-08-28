<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ taskDetail.id ? "Edit Task" : "Add Task" }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <!-- Task Name -->
            <v-col cols="12">
              <v-text-field
                v-model="localTaskDetail.name"
                label="Task Name"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <!-- Description -->
            <v-col cols="12">
              <v-textarea
                v-model="localTaskDetail.description"
                label="Description"
                outlined
                dense
                rows="3"
                required
              ></v-textarea>
            </v-col>

            <!-- Start Date -->
            <v-col cols="6">
              <v-text-field
                v-model="localTaskDetail.start_date"
                label="Start Date"
                outlined
                dense
                type="date"
                required
              ></v-text-field>
            </v-col>

            <!-- End Date -->
            <v-col cols="6">
              <v-text-field
                v-model="localTaskDetail.end_date"
                label="End Date"
                outlined
                dense
                type="date"
                required
              ></v-text-field>
            </v-col>

            <!-- Select Category -->
            <v-col cols="12">
              <v-select
                v-model="localTaskDetail.category_id"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Select Category"
                outlined
                dense
                :value="localTaskDetail.category_id"
              ></v-select>
            </v-col>

            <!-- Task Image -->
            <v-col cols="12">
              <v-file-input
                v-model="localTaskDetail.image"
                label="Task Image"
                outlined
                dense
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('save', localTaskDetail)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddTaskModal",
  props: {
    taskDetail: Object,
    categories: Array,
  },


  data() {
    return {
      localTaskDetail: { ...this.taskDetail },
      dialog: true,
    };
  },
  watch: {
    taskDetail: {
      handler(newVal) {
        this.localTaskDetail = { ...newVal };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
