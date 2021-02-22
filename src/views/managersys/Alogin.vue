<template>
    <v-card style="height:100%;display:flex">
    <div
     :class="test?'test':'testchaned'"></div>    
    <Mangerbar @changesize="testlog"></Mangerbar>
     <router-view
    class="contentbar"></router-view>
    </v-card>
</template>

<script>
import Mangerbar from "./managenavgationbar";
export default {
    data(){
        return{
            test:true
        }
    },
  components: { Mangerbar },
  mounted() {
    //   alert(3333)
  },
  methods:{
      testlog(){
        //   alert("i am your father")
          this.$data.test=!this.$data.test
      }
  },
  beforeRouteEnter(to, from, next) {
      var data=JSON.parse(localStorage.getItem('userinformation'))
      var role=data.data.role
      if(role!='admin'){
          alert('你不是管理员！')
        // this.$router.push('/homepage')
        next({name:'Homepage'});
      }else{
           next((vm) => {
      vm.$store.state.navigationbar = false;
    });
      }
   
  },
};
</script>

<style lang="less" scoped>
.navbar {
  width: auto;
  height: 100%;
}
.contentbar{
    position: relative;
    width: 100%;
    height: 100%;
    background: green;
}
.test{
    width: 473px;
    // // 56px
    height: 100%;
    // background: green;
}
.testchaned{
     width: 56px;
    // // 56px
    height: 100%;
    // background: green;
}
</style>