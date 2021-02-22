<template>
  <div>
    <!-- <v-img
      v-show="true"
      :src="coursral"
      :max-width="screenWith"
      :max-height="screenHeight"
      id="mytest"
      class="mainimg"
    ></v-img> -->
    <v-expand-transition>
     <v-card
     :style="{top:errortipheihgt + 'px!important'}"
     class="tip-1"
     ref="errortip"
    dark>
      <v-alert
      dense
      outlined
      type="error"
      dark
      style="margin:0;z-index:2"
    >
      <strong>登录时间</strong>过时<strong>请</strong>重新登录
    </v-alert>
    </v-card>
    </v-expand-transition>
    <img
      id="mytest"
      :src="coursral"
      :style="{ width: pc.width + 'px', height: pc.height + 'px' }"
    />

    <v-form
      v-if="login"
      ref="form"
      v-model="valid"
      lazy-validation
      class="myform"
    >
      <v-card-title class="headline lighten-2"> Login </v-card-title>
      <v-col cols="12" md="12" sm="4">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="pwd"
          :rules="pwdRules"
          label="Password"
          required
        ></v-text-field>
      </v-col>

      <v-btn
        color="primary"
        class="loginbtn col-md-11"
        elevation="2"
        large
        @click="home"
        >登录</v-btn
      >
    </v-form>
    <!-- 登录 -->
    <!-- 注册 -->
    <v-form ref="form" class="myform" v-if="register">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="500"
        src="https://picsum.photos/id/11/500/300"
      ></v-img>
      <v-card-title class="headline lighten-2"> YUIKINOCHATROOM </v-card-title>
      <v-col cols="12" md="12" sm="4">
        <v-btn
          block
          elevation="1"
          class="btn"
          color="primary"
          @click="openregister"
        >
          {{ fontregister }}
        </v-btn>
        <v-btn
          block
          elevation="1"
          class="btn"
          color="rgba(0, 0, 0, 0.04)"
          @click="renderlogin"
        >
          {{ fontlogin }}
        </v-btn>
      </v-col>
    </v-form>
    <Register></Register>
  </div>
</template>

<script>
/* eslint-disable */
import Register from "./register";
import request from "../router/request";
export default {
  components: {
    Register,
  },
  data: () => ({
    errortipheihgt:-1000,
    register: true,
    login: false,
    hidden: false,
    //  screenWith:document.body.clientWidth,
    //  screenHeight:document.body.clientHeight,
    coursral: "/image/1.jpg",
    coursalarray: [
      "/image/1.jpg",
      "/image/2.jpg",
      "/image/3.jpg",
      "/image/5.jpg",
      "/image/6.jpg",
      "/image/7.jpg",
      "/image/8.jpg",
      "/image/9.jpg",
      "/image/10.jpg",
      "/image/11.jpg",
      "/image/12.jpg",
      "/image/13.jpg",
    ],
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "email is required",
      (v) => (v && v.length <= 10) || "email must be less than 10 characters",
      (v) =>
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) ||
        "errror format",
    ],
    pwd: "",
    pwdRules: [(v) => !!v || "password is required"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    pc: {
      width: document.body.clientWidth + "px",
      height: document.body.clientHeight + "px",
    },
    fontregister: "注册",
    fontlogin: "登录",
    checkbox: false,
    
  }),
  methods: {
    renderlogin() {
      console.log(this.$data.login);
      this.$data.login = !this.$data.login;
      console.log(this.$data.login);
      this.$data.register = !this.$data.register;
      
    },
    openregister() {
      console.log(this.$store.state.getdialog);
      this.$store.state.getdialog = true;
      console.log(this.$store.state.getdialog);
    },
    Randommethod() {
      var getlength = this.$data.coursalarray.length;
      console.log(getlength);
      var num = Number(Math.random() * (getlength - 1)).toFixed(0);
      var path = this.$data.coursalarray[num];
      // console.log("getpath",num)
      return path;
    },
    MainCoursal() {
      var that = this;
      var mycoursal = setInterval(function () {
        that.$("#mytest").fadeOut(5000, function () {
          that.$data.coursral = that.Randommethod();
          that.$("#mytest").fadeIn(5000);
        });
        setTimeout(function () {
          that.$("#mytest").fadeOut(3000, function () {
            that.$data.coursral = that.Randommethod();
            that.$("#mytest").fadeIn(5000);
          });
          clearInterval(mycoursal);
          that.MainCoursal();
        }, 10000);
      }, 60000);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    home() {
      console.log("push");
      // this.$router.push('/homepage')'
      
      this.Login();
    },
    Login() {
      var that = this;
      // 先判断是否存在cookie
      // 一、cookie不存在 二、cookie过期
      console.log(this.$data.name, this.$data.pwd);
      this.$.ajax({
        type: "GET",
        url:
          "http://localhost:3000/user?email=" +
          this.$data.name +
          "&pwd=" +
          this.$data.pwd,
        data: "data",
        success: function (response) {
          // console.log(response)
          that.setcookie("user_id", response);
          // 判断权限
          
          console.log(response)
          // debugger
          that.getrole(response.data)
          
         
        },
        fail: function (err) {
          console.log(err);
        },
      });
    },
    setcookie(name, data) {
      let length;
      let cookie;
      var expiredate=new Date(data.exp*1000)
      var expires = "expires="+expiredate.toUTCString();
      console.log("setcookie++++", expiredate);
      cookie = name + "=" + escape(data.token) + ";"+expires;
      document.cookie = cookie;
    },
    getrole(data){
      console.log(data)
      switch(data.role){
            case 'user':
            // alert('user');
            this.$router.push('/homepage')
            break;
            case 'admin':
            // alert('admin');
            this.$router.push('/admin')
            break;
            default: alert('error')
          }
    },
    errortipanimation(){
    var that=this
    this.$data.errortipheihgt=0
    this.$store.state.navigationbar=false
    console.log(this.$data.errortipheihgt)
    setTimeout(function(){
       that.$data.errortipheihgt=-1000
    },2500)
  },
  },
  created(){
     window.onresize = () => {
      //  alert(1)
      this.$data.pc.width = document.body.clientWidth;
      this.$data.pc.height = document.body.clientHeight;
      console.log(this.$data.pc.width, document.body.clientHeight);
    };
  },
  mounted() {
    if(this.$store.state.isfirstlogin){
       alert(this.$store.state.isfirstlogin)
      this.$store.state.isfirstlogin=false
    }else{
       this.errortipanimation();
    }
    // console.log("startmounted",this.$store.state.navigationbar)
   
    //  this.$("#app")[0].clientHeight + "px";
    this.$data.coursral = this.Randommethod();
    console.log(this.$data.coursral);
    this.MainCoursal();
    this.$data.pc.height =this.$(document.documentElement.clientHeight)
   
  },
  watch: {

  },
  computed:{
    currentHeight:function(){
      // alert(1);
      console.log(this.$data.pc.height)
      return this.$data.pc.height
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("router leave~", to.path);
    window.onresize = "";
    // 清除window监听器
    next();
  },
  beforeRouteEnter(to, from, next) {
    alert('enter')
    next();
  },
  destroyed() {
    console.log("component destroyed!");
  },
};
</script>

<style scoped>
.mainimg {
  position: absolute;
  /* height:100%!important;
width: 100%!important; */
}
.myform {
  /* border-radius: 20px; */
  width: 20%;
  height: 400px;
  background-color: hsla(0, 0%, 100%, 0.92) !important;
  position: absolute !important;
  top: calc(50% - 25%);
  left: calc(50% - 10%);
  margin: 0 auto;
}
.v-card__title {
  display: block;
  text-align: center;
}
.loginbtn {
  /* justify-content: center; */
  margin: 0 auto;
  display: block;
  margin-top: 5px;
  border-radius: 20px;
}
.btn {
  border-radius: 20px;
  margin-bottom: 15px;
}
template {
  height: 100%;
  width: 100%;
}
.tip-1{
  position: fixed;
  width: 400px;
  right: calc(50% - 200px);
  z-index: 2;
  transition: all 3s ease;
  /* top: -1000px; */
}
body{
 height: 100%;
 overflow: hidden;
}
</style>