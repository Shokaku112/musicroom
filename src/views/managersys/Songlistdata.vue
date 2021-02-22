<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem._id"
                      disabled
                      label="id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.label"
                      label="label"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.logo"
                      label="logo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.listtitle"
                      label="Listtitle"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.listsubtitle"
                      label="Listsubtitle"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.listauthor"
                      label="Listauthor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.listauthorid"
                      label="Listauthorid"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.listauthoricon"
                      label="Listauthoricon"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item._id="{ item }">
      <p class="" style="margin: 0">
        {{ item._id }}
      </p>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    dialogcurrent: "",
    headers: [
      //   {
      //     text: "Dessert (100g serving)",
      //     align: "start",
      //     sortable: false,
      //     value: "name",
      //   },
      //   { text: "Calories", value: "calories" },
      //   { text: "Fat (g)", value: "fat" },
      //   { text: "Carbs (g)", value: "carbs" },
      //   { text: "Protein (g)", value: "protein" },

      { text: "ID", value: "_id" },
      { text: "Label", value: "label" },
      { text: "Logo", value: "logo" },
      { text: "Title", value: "listtitle" },
      { text: "Subtitle", value: "listsubtitle" },
      { text: "Author", value: "listauthor" },
      { text: "Listauthorid", value: "listauthorid" },
      { text: "Listauthoricon", value: "listauthoricon" },
      { text: "Actions", value: "actions", sortable: false },
      //   { text: "Createtime", value: "createtime"},
      //   { text: "Introduction", value: "listintroduction"},
      //   { text: "Songlist", value: "listsongid"},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      label: "",
      logo: "",
      listtitle: "",
      listsubtitle: "",
      listauthor: "defalut name",
      listauthorid: "",
      listauthoricon: "",
    },
    defaultItem: {
      id: "",
      label: "",
      logo: "",
      listtitle: "",
      listsubtitle: "",
      listauthor: "233333",
      listauthorid: "",
      listauthoricon: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.requestdata();
    // this.initialize();
  },

  methods: {
    initialize(data) {
      this.desserts = data;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.dialogcurrent = item;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedItem._id) {
        alert("updatelist");
        this.updatelist(this.editedItem)
      } else {
        alert("createlist");
         this.createlist(this.editedItem)
      }
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      // this.close();
    },
    requestdata() {
      var that = this;
      this.$.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/songlist",
        data: "data",
        success: function (response) {
          console.log("data:++", response);
          that.initialize(response);
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
    async deleteItemConfirm() {
      console.log(this.dialogcurrent._id);
      var that = this;
      this.$.ajax({
        type: "GET",
        url:
          "http://localhost:3000/admin/dellist?index=" + this.dialogcurrent._id,
        data: "data",
        dataType: "text",
        success: function (response) {
          console.log(response);
          if (response == "ok") {
            alert(1);
            that.requestdata();
          } else {
            alert(0);
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
      this.closeDelete();
    },
    formatdata(item){
      console.log(item)
      delete item.id
      var t1=item.label.split(',')
      item.label=t1
      return JSON.stringify(item)
    },
    async createlist(item){
      var formdata=this.formatdata(item)
      var that = this;
      this.$.ajax({
        type: "GET",
        url:
          "http://localhost:3000/admin/createlist?data="+formdata,
        dataType: "text",
        success: function (response) {
          console.log(response);
          if (response == "ok") {
            // alert(1);
            that.requestdata();
            that.close();
          } else {
            alert(0);
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
    async updatelist(item){
      var that=this
      console.log(item)
      var formdata=JSON.stringify(item)
      this.$.ajax({
        type: "GET",
        url:
          "http://localhost:3000/admin/updatelist?data="+formdata,
        dataType: "text",
        success: function (response) {
          console.log(response);
          if (response == "ok") {
            // alert(1);
            that.requestdata();
            that.close();
          } else {
            alert(0);
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    }

  },
};
</script>

<style>
</style>