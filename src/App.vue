<template>
 <div id="app">
   <transition>
     <v-app>
       
       <Navigationbar v-show="this.$store.state.navigationbar"></Navigationbar>
      <router-view />
        <div class="animationshow">
         <Musicplayer v-show="true"></Musicplayer>
        </div>
     
      </v-app>
      </transition>
  </div>
</template>

<script>
/* eslint-disable */
import Navigationbar from './views/navigationbar';
import Musicplayer from './views/component/player'
export default {
  name: 'App',

  components: {
    Navigationbar,
    Musicplayer
    // HelloWorld,
  },

  data() {
    return {
       ishidden:this.$store.state.navigationbar,
    }
  },
  mounted(){
   this.$data.ishidden=this.$store.state.navigationbar
  //  console.log(this.$store.state.navigationbar)
  },
  watch:{
    ishidden(){
      console.log("updated!",this.$data.ishidden)
      return this.$data.ishidden;
    }
  }

  
};
</script>
<style scoped>
.animationshow{
  
}
</style>
