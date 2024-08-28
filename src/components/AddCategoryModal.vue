<template>
  <v-dialog :value="dialog" max-width="500px" persistent @input="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Add Category</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="localCategoryDetail.name"
                label="Category Name"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="localCategoryDetail.description"
                label="Description"
                outlined
                dense
                rows="3"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="saveCategory"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddCategoryModal",
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      localCategoryDetail: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveCategory() {
      this.$emit('save', this.localCategoryDetail);
      this.closeModal();
    },
  },
};
</script>
