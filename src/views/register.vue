<template>
  <v-row justify="center">
    <v-dialog
      v-model="this.$store.state.getdialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template> </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closed">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn dark text :disabled="!iscorrect" @click="changed">
              提交
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-expand-transition>
            <v-text-field
              color="success"
              v-show="loading"
              loading
              disabled
            ></v-text-field>
          </v-expand-transition>
          <v-expand-transition>
            <v-alert dense text type="success" v-show="ifsuccess">
              你已经<strong>成功</strong>注册！
            </v-alert>
          </v-expand-transition>

          <v-list-item>
            <v-list-item-content>
              <v-col cols="12" md="6" class="mid">
                <v-list-item-title>您的性别</v-list-item-title>
                <v-container class="px-0" fluid>
                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      v-for="index in sex"
                      :key="index"
                      :label="`Radio ${index}`"
                      :value="index"
                      :disabled="summit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-form style="background: white" v-model="iscorrect" lazy-validation>
          <v-list three-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-col cols="12" md="6" class="mid">
                  <v-list-item-title>请输入你的用户名</v-list-item-title>
                  <v-text-field
                    v-model="user.nickname"
                    :rules="r1"
                    :counter="11"
                    label="Username"
                    required
                    :disabled="summit"
                  ></v-text-field>
                </v-col>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-col cols="12" md="6" class="mid">
                  <v-list-item-title>请输入你的账号密码</v-list-item-title>
                  <v-text-field
                    :counter="11"
                    v-model="user.password"
                    :rules="r2"
                    label="password"
                    required
                    :disabled="summit"
                  ></v-text-field>
                </v-col>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-col cols="12" md="6" class="mid">
                  <v-list-item-title>请输入你的邮箱</v-list-item-title>
                  <v-text-field
                    :counter="11"
                    v-model="user.email"
                    :rules="r3"
                    label="email"
                    required
                    :disabled="summit"
                  ></v-text-field>
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: this.$store.state.getdialog,
      notifications: false,
      radioGroup: 2,
      sex: ["男", "女"],
      user: {
        nickname: "",
        password: "",
        email: "",
      },
      loading: false,
      summit: false,
      ifsuccess: false,
      r1: [
        (v) => !!v || "昵称不能为空",
        (v) => v.length <= 8 || "昵称应该小于8个单位长度",
      ],
      r2: [
        (v) => !!v || "账号密码不能为空",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(v) ||
          "必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间",
          
      ],
      r3:[
         (v) => !!v || "邮箱不能为空",
         (v)=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)||'邮箱格式不对'
      ],
      
      iscorrect: true,
    };
  },
  methods: {
    closed() {
      this.$data.dialog = !this.$store.state.getdialog;
      this.$store.state.getdialog = this.$data.dialog;
    },
    changed() {
      // console.log(this.$data.r1,this.$data.r2)
      var that = this;
      that.$data.loading = !that.$data.loading;
      this.$.ajax({
        type: "GET",
        url:
          "http://localhost:3000/userregister?user=" +
          JSON.stringify(that.$data.user),
        dataType: "json",
        success: function (response) {
          console.log(response);
          if(response.result=="ok"){
          that.$data.loading = !that.$data.loading;
          that.$data.summit = !that.$data.summit;
          that.$data.summit = !that.$data.summit;
          that.ifsuccess = !that.ifsuccess;
          setTimeout(function () {
            that.ifsuccess = !that.ifsuccess;
          }, 5000);
          }else{
            alert("error")
            that.$data.loading = !that.$data.loading;
          }
          
        },
        error: function (err) {
          console.log(err);
        },
      });
      // console.log("enter",this.$data.dialog,this.$store.state.getdialog)

      // that.$data.loading=!that.$data.loading
      // setTimeout(function(){
      //    that.$data.summit=!that.$data.summit
      //    that.$data.loading=!that.$data.loading
      //    that.ifsuccess=!that.ifsuccess
      //    setTimeout(function(){
      // that.$data.dialog=!that.$store.state.getdialog
      // that.$store.state.getdialog=that.$data.dialog
      //    },1500)
      // },5000)
    },
    clear() {
      this.user = {
        nickname: "",
        password: "",
        email:"",
      };
      this.loading = false;
      this.summit = false;
      this.ifsuccess = false;
      // loading:false,
      // summit:false,
      // ifsuccess:false,
    },
  },
  computed: {},
  watch: {
    radioGroup() {
      console.log(this.$data.radioGroup);
    },
    dialog() {
      console.log(this.$data.getdialog);
      this.$store.state.getdialog = this.$data.dialog;
    },
  },
};
</script>

<style>
.mid {
  margin: 0 auto;
}
.v-subheader {
  justify-content: center;
}
</style>