<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    width="350"
    fixed
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list 
    dense>
      <v-list-group 
      value="true"
      prepend-icon="mdi-table-large">
        <template v-slot:activator>
          <v-list-item-title>Table</v-list-item-title>
        </template>
        <v-list-item 
        v-for="item in items" :key="item.title" link
        :to="{name:item.path}">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-list dense>
      <v-list-group
      value="true" 
      prepend-icon="mdi-chart-areaspline-variant">
        <template v-slot:activator>
          <v-list-item-title>Chart</v-list-item-title>
        </template>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      bodyheight: document.body.clientHeight,
      drawer: true,
      items: [
        { title: "用户表", icon: "mdi-home-city",path:'tablelist' },
        { title: "歌单表", icon: "mdi-account",path:'SonglistTable' },
        { title: "评论表", icon: "mdi-account-group-outline",path:'tablelist3' },
      ],
      chartitems:[
        {},
        {},
        {},
      ],
      mini: false,
    };
  },
  watch:{
      mini(newval,oldval){
          console.log(newval,oldval,'changed size')
            this.$emit('changesize')
      }
  },
  created(){
    //  alert('created')
  }
};
</script>

<style lang="less" scoped>
.bar {
  width: 10%;
}
</style>