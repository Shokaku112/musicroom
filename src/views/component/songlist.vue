<template>
  <div class="maincontent" style="width:100%">
    <v-row style="height: auto; width: 100%; margin: 0">
      <div class="songlisttag">
        <div class="songimg">
          <a href="#">
            <img :src="songlist.songtag.listlogo" alt="" />
          </a>
        </div>

        <div class="listdetail">
          <div class="listdetailtag">
            <v-icon class="icontag" style="margin-right: 10px" size="24"
              >mdi-label-outline
            </v-icon>
            <h2>{{ songlist.songtag.listtitle }}</h2>
          </div>
          <div class="userpart">
            <a class="userimg">
              <img :src="songlist.songtag.authoricon" alt="" />
            </a>
            <a class="username" href="#">{{ songlist.songtag.listauthor }}</a>
            <span class="createtime"
              >{{ songlist.songtag.createtime }} &nbsp; 创建</span
            >
          </div>

          <div class="btnside">
            <v-btn
              :width="n.width"
              :height="n.height"
              v-for="(n,index) in btnside"
              v-bind:key="index"
              @click="playcurrent(n.action)"
              class="ma-2"
              grey
              lighten-4
            >
              <v-icon :style="{ margin: n.margin }" dark right
                >{{ n.icon }}
              </v-icon>
              {{ n.tagname }}
            </v-btn>
          </div>
          <div class="tagtype">
            <div class="tp-1">标题:</div>
            <v-chip-group>
              <v-chip :key="index" v-for="(n,index) in songlist.songtag.labeltag">{{
                n
              }}</v-chip>
            </v-chip-group>
          </div>
          <div class="tagcontent">
            <p class="tp-3">
              <b>介绍:</b>
              &nbsp;
              {{ songlist.songtag.introduction }}
            </p>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="listpart">
        <div class="titletag">
          <h2>歌曲列表</h2>
          <span>???首歌</span>
          <div class="totalplay">
            播放: <b style="color: red">123</b>&nbsp;次
          </div>
        </div>
        <div class="tabletag">
          <v-card elevation="0">
            <v-card-title elevation="0">
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :loading="loadingsong" :headers="headers" :items="desserts" :search="search">
              <template v-slot:item.glutenfree="{ item }">
                <v-btn @click="test(item)" icon
                  ><v-icon>mdi-play</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </v-card>
        </div>
        <div class="commitarea">
          <div class="titletag">
            <h2>评论区</h2>
            <span>共{{ 1 }}条评论</span>
          </div>
          <div class="usercommit">
            <div class="userimg">
              <img :src="songlist.commitment.useritself.userimg" alt="" />
            </div>
            <div class="userinputtext">
              <v-container fluid>
                <v-textarea
                  style="width: 95%"
                  rows="3"
                  counter
                  :rules="rules"
                  v-model="usertext"
                  placeholder="say something....."
                  prepend-icon="mdi-comment"
                ></v-textarea>
              </v-container>
              <v-btn
                @click="usercommit"
                class="submibtn"
                width="46"
                height="25"
                elevation="0"
                >提交</v-btn
              >
            </div>
            <!-- 用户评论模块 -->
          </div>
          <div class="commitpart">
            <div
              class="committag"
              v-for="(n,index) in songlist.commitment.currentcommitpart"
              v-bind:key="index"
            >
              <div class="committext">
                <div class="userimg">
                  <a href="#">
                    <img :src="n.userimg" alt="" />
                  </a>
                </div>
                <div class="commitcontent">
                  <div class="useridnametext">
                    <span
                      ><a :href="'http://localhost/user/' + n.userid">{{
                        n.usernickname
                      }}</a></span
                    >
                    <span>：</span>
                    {{ n.committext }}
                  </div>
                  <div
                    class="userres"
                    v-if="n.responseid.hasOwnProperty('userid')"
                  >
                    <div class="userrestag">
                      <div class="useridnametext">
                        <span
                          ><a
                            :href="
                              'http://localhost/user/' +
                              n.responseid.usercommitid
                            "
                            >{{ n.responseid.username }}</a
                          ></span
                        >
                        <span>：</span>
                        {{ n.responseid.usercommittext }}
                        <!-- {{}} -->
                      </div>
                    </div>
                  </div>
                  <div class="createtime">2020年9月18日</div>
                  <a
                    @click="
                      childdialog = true;
                      parentid = n.parentid;
                    "
                    class="rs"
                    href="javascript:void(0);"
                    >回复</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="childdialog"
      persistent
    >
      <v-card>
        <v-toolbar height="40" dark>新建歌单</v-toolbar>
        <v-card-text>
          <div style="padding-top: 15px">
            <v-text-field
              v-model="childtext"
              label="请输入评论内容"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn dark @click="childcommit">确认</v-btn>
          <v-btn dark @click="childdialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
      loadingsong:true,
      usertext: "",
      offsetTop: 0,
      contentheight: 0,
      currentid: "",
      content:
        "从那个称作“幻想乡”的世界里，也许唯有歌声能将那里的一切真挚地传递给我们.....\n感受来自那个世界的天籁之音，让歌声静静的贯彻幻想乡吧....\n封面画师:鳥居すみ",
      drawer: true,
      listarray: [],
      btnside: [
        {
          tagname: "播放",
          icon: "mdi-play",
          action: 1,
          width: 54,
          height: 31,
          margin: "5px",
        },
        {
          tagname: "下载",
          icon: "mdi-download",
          action: 2,
          width: 54,
          height: 31,
          margin: "5px",
        },
        {
          tagname: "列表",
          icon: "mdi-format-list-bulleted",
          action: 3,
          width: 54,
          height: 31,
          margin: "5px",
        },
        {
          tagname: "25",
          icon: "mdi-comment",
          action: 4,
          width: 54,
          height: 31,
          margin: "10px",
        },
      ],
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
      listitem: [
        {
          id: 1,
          name: "收藏歌单",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          name: "创建的歌单",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: "material2 :",
              children: [
                {
                  id: 11,
                  name: "src :",
                  children: [
                    { id: 12, name: "v-btn : ts" },
                    { id: 13, name: "v-card : ts" },
                    { id: 14, name: "v-window : ts" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      search: "",
      headers: [
        {
          text: "歌曲标题",
          align: "start",
          sortable: false,
          value: "songtitle",
        },
        { text: "时长", value: "timesamp" },
        { text: "歌手", value: "singer" },
        { text: "专辑", value: "alblum" },
        { text: "Gluten-Free", value: "glutenfree" },
      ],
      desserts:[],
      rules: [(v) => v.length <= 25 || "Max 25 characters"],
      // value: "",
      reslist: 1,
      songlist: {},
      childdialog: false,
      childtext: "",
      parentid: "",
    };
  },
  created() {
    // console.log("created",this.$route.params.id);
    // 这里mymusic组件下的playlist获取params的id值
    // console.log("created: ",this.$props.songlistdata)
    // alert();
    console.log("data",  this.$store.state.songlist);
    this.$data.songlist =  this.$store.state.songlist;
    this.getsonglist(this.$data.songlist.collectlist);
   
  },
  
  // watch: {
  //   songlistdata: function (newval, oldval) {
  //     console.log("new: ", newval, "old:", oldval);
  //     this.$data.songlist = newval;
  //   },
  //   // 监听从父组件传过的数据及时刷新
  // },
  methods: {
    test(e) {
      console.log(e);
      this.$store.state.playlistdata=e;
    },
    getsonglist(array){
      var that=this
      this.$.ajax({
        type: "GET",
        url: "http://localhost:3000/getsong?songid="+array,
        dataType: "json",
        success: function (response) {
          console.log("+++++++++",response)
          if(response.info){
            alert('no data')
             that.loadingsong=false
          }else{
             for(let i=0;i<response.length;i++){
            var formatdata={
              singer:response[i].singer,
              songtitle:response[i].name,
              filepath:response[i].filepath,
              songid:response[i].songid
            }
            that.$data.desserts.push(formatdata)
          }
          that.loadingsong=false
          }
         
        }
      });
    },
    childcommit() {
      var getuserinfo = JSON.parse(localStorage.getItem("userinformation"));
      var that=this
      let formatdata = {
        parentid: this.$data.parentid,
        childauthorid:getuserinfo.data._id ,
        childcontent:this.$data.childtext,
        childauthorname:getuserinfo.data.nickname,
      };
      if (getuserinfo == null) {
        alert("no data");
      } else {
        this.$.ajax({
          type: "GET",
          url: "http://localhost:3000/getchildcommitment?data=" + JSON.stringify(formatdata),
          dataType: "json",
          success: function (response) {
            console.log(response)
            that.$data.childtext=''
            that.childdialog = false
            that.getcommiment();
          },
          error: function(err){
            console.log(err)
          }
        });
      }
    },
    playcurrent(e) {
      switch (e) {
        case 1: {
          console.log(1, this.$props);
          break;
        }
        case 2: {
          console.log(2);
          break;
        }
        case 3: {
          console.log(3);
          break;
        }
        case 4: {
          console.log(4);
          break;
        }
      }
    },
    getcommiment() {
      var that = this;
      var commimentid = this.$route.params.id;
      // alert(commimentid)
      this.$.ajax({
        type: "GET",
        url: "http://localhost:3000/getcommiment?id=" + commimentid,
        dataType: "json",
        success: function (response) {
          // console.log(response)
          // console.log(that.$data.songlist)
          that.rendercommiment(response);
        },

        error: function (err) {
          console.log(err);
        },
      });
    },
    rendercommiment(data) {
      // console.log("commimentdata:","songlist",this.$data.songlist.commitment.currentcommitpart)
      this.$data.songlist.commitment.currentcommitpart = [];
      var array = data.commentlist;
      array.reverse()
      for (let i = 0; i < array.length; i++) {
        var json = {
          parentid: array[i].parentid,
          userimg: array[i].parentauthoricon,
          usernickname: array[i].parentauthorname,
          userid: array[i].parentauthorid,
          committime: "10:42",
          committext: array[i].parentcontent,
          responseid: {},
        };
        array[i].items.reverse();
        for (let k = 0; k < array[i].items.length; k++) {
          if (k <= 0) {
            json.responseid = {
              userid: array[i].items[k].childauthorid,
              username: array[i].items[k].childauthorname,
              usercommittext: array[i].items[k].childcontent,
              usercommitid: array[i].items[k].childauthorid,
            };
          } else {
            continue;
          }
        }
        this.$data.songlist.commitment.currentcommitpart.push(json);
      }
      
    },
    usercommit() {
      var that=this
      var getuserinfo = JSON.parse(localStorage.getItem("userinformation"));
      if (getuserinfo == null) {
        alert("user not found!");
      } else {
        var user = {
          songlistid: this.$route.params.id,
          parentcontent: this.$data.usertext.toString(),
          parentauthoricon: getuserinfo.data.icon,
          parentauthorname: getuserinfo.data.nickname,
          parentauthorid: getuserinfo.data._id,
        };
        console.log(user)
        // debugger
        this.$.ajax({
          type: "GET",
          url:
            "http://localhost:3000/createcommiment?data=" +
            JSON.stringify(user),
          dataType: "json",
          success: function (response) {
            console.log(response);
            that.getcommiment();
            that.$data.usertext=''
          },
          error: function (err) {
            console.log(err);
          },
        });
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    console.log("Enter:", from);
    next((vm) => {
      vm.$store.state.navigationbar = true;
    });
  },
  mounted() {
    this.getcommiment();
  },
};
</script>

<style lang="less" scoped>
.rs {
  float: right;
  margin-top: 5px;
}
.createtime {
  width: auto;
  height: auto;
  // position: relative;
  // top: 15px;
}
.userrestag {
  position: relative;
  top: -23px;
  left: 0px;
  margin-bottom: 20px;
}
.userrestag .useridnametext {
  margin-left: 5px;
  top: 9px;
}
.userres::before {
  content: "";
  position: relative;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-bottom-color: #dedede;
  left: 2%;
  top: -79%;
  margin-left: -4px;
  bottom: -8px;
}
.userres {
  width: 100%;
  height: 30px;
  background: white;
  border: 1px solid #dedede;
  margin-bottom: 50px;
}
.useridnametext {
  width: auto;
  height: auto;
  overflow: hidden;
  background: white;
  position: relative;
  top: 1px;
  left: 0px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  margin-bottom: 10px;
}
.useridnametext span:nth-child(1) {
  margin-right: 6px;
}
.commitcontent {
  width: calc(100% - 50px);
  height: auto;
  background: white;
  padding-left: 12px;
}
.committext {
  width: 100%;
  height: auto;
  /* background: red; */
  display: flex;
  border-top: 1px dotted gray;
  padding: 15px 0;
}
.committag {
  width: 100%;
  height: auto;
  background: white;
  padding: 0px 32px 0 32px;
}
.commitpart {
  width: 100%;
  height: auto;
  background: gray;
}
.submibtn {
  position: absolute;
  bottom: 0px;
  right: 25px;
}
.commitarea {
  width: 100%;
  height: auto;
  background: white;
}
@fontsize: 12px;
.tabletag {
  width: 100%;
  height: auto;
  // background: gold;
}
.titletag {
  width: 100%;
  height: auto;
  margin: 0px 12px 12px 0px;
  border-bottom: 2px solid red;
}
.titletag span {
  margin-left: 20px;
}
.totalplay {
  float: right;
  margin: 12px 20px 12px 12px;
  // margin-right: 20px;
}
.titletag h2 {
  font-weight: normal;
  margin-left: 32px;
}
.listpart {
  position: relative;
  top: 80px;
  // padding: 12px 12px 12px 16px;
  // padding-left: 32px;
  margin-top: 40px;
  width: 100%;
  height: auto;
  background: white;
}
.tp-3 {
  display: inline-block;
  white-space: pre;
}
// .tp-2{
//   display: inline-block;
//   font-weight: bold;
//   margin-right: 2px;
// }
.tp-1 {
  margin-right: 2px;
}
.tagtype {
  padding-left: 16px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  // background-color: greenyellow;
  margin-bottom: 5px;
}
.tagcontent {
  padding-left: 16px;
  width: 100%;
  height: 72px;
  // background-color: blue;
}
.btnside {
  display: flex;
  width: 100%;
  height: auto;
  // background: red;
  margin-bottom: 20px;
}
body {
  // overflow-x: hidden;
  // overflow-y: hidden;
}
.mymusic {
  width: 100%;
  height: 100%;
  // background: green;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.leftbar {
  position: fixed;
  top: 0px;
  left: 0px;
}
.getid {
  display: none;
}

@media screen and (max-width: 1000px) {
  .fixedarea {
    width: 1000px !important;
    margin: 0;
  }
}
.rowarea {
  margin: 0;
  width: 100%;
  height: 100%;
  // background: green;
}
.fixedarea {
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  justify-content: left;
  max-width: 1000px;
  margin-left: calc(50% - 500px);
  margin-right: calc(50% - 500px);
}
.listbar {
  padding-top: 12px;
  width: 25%;
  height: 100%;
  // background: red;
  border: 1px solid grey;
}
.listcontent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 75%;
  height: 100%;
  background: white;
  // padding: 40px;
}
.songlisttag {
  width: calc(100%);
  height: auto;
  // background: green;
  display: flex;
}
.songimg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: white;
  border: 1px solid gray;
}
.songimg img {
  max-width: 195px;
  max-height: 195px;
}
.songimg a {
  max-width: 195px;
  max-height: 195px;
}
.listdetail {
  padding: 0 12px 12px 12px;
  width: 100%;
  height: 200px;
  background: white;
}
.listdetailtag {
  padding-left: 16px;
  width: auto;
  height: auto;
  background: white;
  margin-bottom: 12px;
}
.icontag {
  position: relative;
  top: -2px;
  // color: red;
}
.listdetailtag span {
  font-size: 16px;
}
.userpart {
  padding-left: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

// .userimg {
//   width: 36px;
//   height: 36px;
// }
// .userimg img {
//   max-width: 35px;
//   max-height: 35px;
// }
.username {
  margin-left: 12px;
  margin-right: 12px;
}
// i::after{
//   content: "12";
// }
h2 {
  display: inline-block;
}
.createtime {
  color: #999;
}
#scroll-target::-webkit-scrollbar {
  // background-color: gold;
}
.usercommit {
  padding: 20px 32px 0 32px;
  width: 100%;
  height: 150px;
  // margin-bottom: 20px;
  background-color: white;
}
.userimg {
  width: 50px;
  height: 50px;
}
.userimg img {
  max-width: 50px;
  max-height: 50px;
}
.userinputtext {
  position: relative;
  top: -70px;
  left: 50px;
  width: auto;
  height: auto;
  background: white;
}
</style>
