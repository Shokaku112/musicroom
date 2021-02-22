<template>
  <div>
    <v-row
      style="min-width: 1200px"
      class="navigationbar"
      justify="center"
      no-gutters
    >
      <v-col cols="12" md="8" align="center" class="midpart">
        <v-row class="contentpart">
          <div class="content">
            <div class="fontt">logo</div>
          </div>
          <div class="content turnflex" style="border: 0">
            <div
              v-for="(item, index) in navgationbar"
              v-bind:key="index"
              class="menuitem turnflex"
              @click="testroute"
              :data-id="index"
            >
              <p :data-id="index">{{ item.name }}</p>
            </div>
          </div>
          <!-- mid -->
          <div class="content">
            <div class="fontt">
              <v-row
                justify="center"
                style="
                  top: 12px;
                  right: 21% !important;
                  position: absolute;
                  border-radius: 20px;
                  margin:0;
                "
              >
                <v-autocomplete
                  style="border-radius: 28px; width: 200px"
                  v-model="model"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="symbol"
                  label="Search for a coin..."
                  solo
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for your favorite
                        <strong>Cryptocurrency</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left> mdi-bitcoin </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.symbol"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-bitcoin</v-icon>
                    </v-list-item-action>
                    
                  </template>
                </v-autocomplete>
              </v-row>
            </div>
          </div>
          <!-- userpart -->
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-row justify="center" style="flex-wrap: nowrap;margin:0;">
          <v-menu bottom min-width="200px" rounded dark offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on" style="margin-top: 10px">
                <v-avatar color="brown" size="56">
                  <img src="http://localhost:8080/image/15.jpg" />
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <img src="http://localhost:8080/image/15.jpg" />
                  </v-avatar>
                  <h3>{{ user.fullName }}</h3>
                  <p class="caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text> Edit Account </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text> Disconnect </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn to="/upload" depressed rounded text>Upload</v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" style="height: 30px; background-color: red;margin:0">
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    navgationbar:[
      {
        name:"首页",
        urlname:'Homepage'
      },
      {
         name:"我的音乐",
         urlname:'mymusic',
        //  id:'314'
      },
      {
         name:"我的好友",
         urlname:'Homepage'
      }
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4",
    ],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    menu: ["发现音乐", "我的音乐", "好友"],
    carousels: [],
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),
  methods: {
    testroute(e) {
      var index=Number(e.srcElement.dataset.id)
      console.log(this.$data.navgationbar[index]);
      this.$router.push({ name:this.$data.navgationbar[index].urlname})
    },
  },
  watch: {
    /* eslint-disable */
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped>
.hslatest {
  /*  
    padding: 30px;
    hyphens: auto;
    background: hsla(0,0%,100%,.5);
    overflow: hidden;
    position: relative; */
  filter: blur(10px);
}

.navigationbar {
  height: 70px;
  background-color: #242424;
  /* background-color:#ccc; */
}
.midpart {
  background-color: #242424;
  padding: 0;
}
.contentpart {
  height: 100%;
  background-color: #242424;
  align-items: center;
  padding: 0 !important;
  margin: 0;
}
.content {
  height: 100%;
  padding: 0;
  background-color: #242424;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  /* line-height:100%; */
}
.content:nth-child(1) {
  width: 30%;
}
.content:nth-child(2) {
  width: 50%;
}
.content:nth-child(3) {
  width: 20%;
}
.fontt {
  width: 100%;
  height: auto;
  font-size: 24px;
}
.menuitem:hover {
  background-color: black;
}
.menuitem {
  flex: 1;
  height: 100%;
  align-items: center;
}
.menuitem p {
  display: block;
  text-align: center;
  width: 100%;
  font-size: 20px;
  margin: 0 !important;
  color: white;
}
.turnflex {
  display: flex;
}

@media screen and (max-width: 1400px) {
  .menuitem p {
    font-size: 16px;
  }
  .searchbar {
  }
}
</style>
