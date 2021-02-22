<template>
  <div class="mymusic">
    <!-- leftbar -->
    <!-- <button @click="test">test{{currentdata}}</button> -->
    <div class="fixedarea">
      <div class="listbar">
        <v-card class="mx-auto" width="300" style="height: 100%">
          <v-list>
            <v-btn color="primary"
            class="bt-1" x-small @click="show = true"
                      >新建歌单</v-btn
                    >
            <v-list-group :value="true">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>创建歌单</v-list-item-title>
                  <v-col style="position: relative; right: 11px" cols="auto">

                    <v-dialog
                      transition="dialog-bottom-transition"
                      max-width="600"
                      v-model="show"
                      persistent
                    >
                      <v-card>
                        <v-toolbar height="40" dark>新建歌单</v-toolbar>
                        <v-card-text>
                          <div style="padding-top: 15px">
                            <v-text-field
                              v-model="newsonglistname"
                              label="请输入歌单名"
                            ></v-text-field>
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn dark @click="createlist">确认</v-btn>
                          <v-btn dark @click="show = false">取消</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-list-item-content>
              </template>
              <!-- 列表组创建音乐 -->
              <v-list-item
                v-for="i in collectlist"
                :key="i.listid"
                @click="songlist = i"
                :to="{ name: 'playlist', params: { id: i.listid } }"
              >
                <v-list-item-icon>
                  <img
                    style="max-width: 40px; max-height: 40px"
                    :src="i.songtag.listlogo"
                    alt=""
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="i.listtitle"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="i.subtitle"
                  ></v-list-item-subtitle>
                  <div class="currentplay">
                    <v-btn
                      icon
                      x-small
                      :to="{ name: 'editlist', params: { id: i.listid } }"
                      elevation="0"
                      @click="edit(i)"
                    >
                      <v-icon title="编辑" style="z-index: 4">
                        mdi-playlist-edit
                      </v-icon>
                    </v-btn>
                    <v-btn icon x-small elevation="0">
                      <v-icon title="删除" style="z-index: 4">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
          <!-- 列表组收藏音乐 -->
          <!-- <v-list>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>收藏歌单</v-list-item-title>
                </v-list-item-content>
              </template>
             
              <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                <v-list-item-icon>
                 <img src="https://p1.music.126.net/W3mxL5_3bsSDBjeMnHhXWA==/109951164216505402.jpg?param=40y40" alt="">
                </v-list-item-icon>
                 <v-list-item-content>
          <v-list-item-title v-text="12345"></v-list-item-title>

          <v-list-item-subtitle v-text="233"></v-list-item-subtitle>
        </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list> -->
        </v-card>
      </div>
      <!-- rightcontent -->

      <div ref="getheight" class="listcontent">
        <v-container
          id="scroll-target"
          style="max-height: 400px; overflow-x: hidden"
          class="overflow-y-auto"
          ref="containerh"
        >
          <!-- <Songlist :key="currentdata" v-bind:songlistdata="reslist"></Songlist> -->
          <router-view
            :key="String($route.fullPath)"
          ></router-view>
          {{currentdata}}
        </v-container>
      </div>
    </div>

    <div class="getid">
      {{ (currentid = $route.params.id) }}
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Songlist from "../component/songlist";
export default {
  components: { Songlist },
  data() {
    return {
      test:0,
      songlist: {},
      urlid: "",
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
      search: "",
      rules: [(v) => v.length <= 25 || "Max 25 characters"],
      value: "",
      reslist: 1,
      mylist: [1, 2, 3],
      collectlist: [],
      currentindex: 0,
      newsonglistname: "请输入歌单名",
      show: false,
    };
  },
  computed: {
    currentdata: function () {
      console.log("add");
      this.$store.state.songlist=this.$data.songlist
      console.log("store+++++++++",this.$store.state.songlist)
      return this.test++;
    },
  },
  created() {
    //  alert("created");
    // alert()
    console.log("currentid: +++", this.$route.params.id);
    this.requirelist();
    //  this.getlist();
  },
  mounted() {
    let height = this.$refs.getheight.offsetHeight;
    console.log(height);
    this.$refs.containerh.style.maxHeight = height + "px";
    console.log(this.$data.contentheight);
  },
  methods: {
    // changesonglist(e){
    //   console.log(e)
    //   this.$data.urlid=e
    //   console.log("jjjjjjjj",this.$data.urlid)
    //   // location.href="http://localhost:8080/#/mymusic/"+e
    // }
    currnetchange(e) {},
    edit(e){
      console.log(e)
    },
    createlist() {
      var that = this;
      var userinfo = JSON.parse(localStorage.getItem("userinformation"));
      var data = {};

      console.log(data);
      if (userinfo != null) {
        data.listtitle = this.$data.newsonglistname;
        data.listauthorid = userinfo.data._id;
        data.listauthor = userinfo.data.nickname;
        data.listauthoricon = userinfo.data.icon;
        this.$.ajax({
          type: "GET",
          url: "http://localhost:3000/createlist?data=" + JSON.stringify(data),
          dataType: "text",
          success: function (response) {
            console.log(response);
            that.$data.show = false;
            that.requirelist();
          },
          error: function (err) {
            console.log(err);
          },
        });
      } else {
        console.log("error");
        this.$data.show = false;
      }
    },
    requirelist() {
      var that = this;
      var userid = JSON.parse(localStorage.getItem("userinformation")).data._id;
      console.log(userid);
      if (userid != null) {
        this.$.ajax({
          type: "GET",
          url: "http://localhost:3000/getusersonglist?id=" + userid,
          dataType: "json",
          success: function (response) {
            console.log(response);
            that.getlist(response);
          },
          error: function (err) {
            console.log(err);
          },
        });
      } else {
        console.log("can not get list!");
      }
    },
    getlist(data) {
      console.log("getlist", data);
      this.$data.collectlist=[]
      var user=data.data[0]
      var items=data.data[0].items
      var collectlist = [];
      for (let i = 0; i < items.length; i++) {
        var songlist = {};
        songlist.songtag = {
          listid: items[i]._id,
          listlogo:items[i].logo,
          listtitle: items[i].listtitle,
          listauthor: items[i].listauthor,
          authoricon:items[i].listauthoricon,
          createtime: items[i].createtime,
          labeltag: ["ACG", "越共"],
          introduction:items[i].listintroduction,
        };
        songlist.collectlist =items[i].listsongid;
        songlist.commitment = {
          useritself: {
            userid: user._id,
            currentlistsong: items[i]._id,
            userimg:user.icon,
          },
          currentcommitpart: [
            {
              userimg:
                "https://p1.music.126.net/J6I77QwwxmsLMeo7dnSKPg==/109951164946773363.jpg?param=50y50",
              usernickname: "Nihil-Obstat",
              userid: "5399063354",
              committime: "10:42",
              committext:
                "东方官方包含了游戏，小说，漫画，音乐，而同人包含的范围就更广了，在这里一定能找到你喜欢的东西。如果有兴趣了解的话可以私信我，推荐给你一些东方有趣的作品",
              responseid: {
                userid: "1287370320",
                username: "玄丹青鸟",
                usercommittext:
                  "很多动漫里的歌第一次听的话我不一定能喜欢，但听次数多了就不知道我到底喜不喜欢了，收藏吧[多多耍酷]",
                usercommitid: "641245",
              },
            },
          ],
        };
        songlist.subtitle = items[i].listtitle;
        songlist.title = items[i].listtitle;
        songlist.imgurl = songlist.songtag.listlogo;
        songlist.listid = songlist.songtag.listid;
        //  if(id==songlist.listid){
        //  console.log(songlist)
        //  this.$data.songlist = songlist;
        // }

        this.$data.collectlist.push(songlist);
      }
      console.log(this.$route.params.id);
      // this.$router.push({ name: 'playlist', params: { id: this.$data.collectlist[0].listid } })
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm.$data);
    });
  },
};
</script>

<style lang="less" scoped>
.bt-1{
    position: absolute;
    top: 50px;
    z-index: 999999;
    left: 10px;
}
.currentplay {
  position: relative;
  left: 70%;
  display: flex;
}
.createtime {
  width: auto;
  height: auto;
  // position: relative;
  // top: 15px;
}
.userrestag {
  position: relative;
  top: -20px;
  left: 0px;
  margin-bottom: 20px;
}
.userres::before {
  content: "";
  position: relative;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-bottom-color: #dedede;
  left: 2%;
  top: -43%;
  margin-left: -4px;
  bottom: -8px;
}
.userres {
  width: 100%;
  height: 50px;
  background: white;
  border: 1px solid #dedede;
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
  margin-bottom: 5px;
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
  padding-top: 12px;
}
.committag {
  width: 100%;
  height: 160px;
  background: white;
  padding: 0px 32px 0 32px;
}
.commitpart {
  width: 100%;
  height: 300px;
  background: gray;
}
.submibtn {
  position: absolute;
  bottom: 0px;
  right: 25px;
}
.commitarea {
  width: 100%;
  height: 500px;
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
