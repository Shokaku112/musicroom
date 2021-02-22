<template>
  <div ref="bodyheight" style="height:auto" class="mainbody">
    <div class="fixedarea">
      <Hotsong v-bind:songlistdata="songlist"></Hotsong>
    </div>
  </div>
</template>

<script>
import Hotsong from "../component/songlist.vue";
export default {
  components: { Hotsong },
  data() {
    return {
      songlist: {},
    };
  },
  created() {
    this.hotlist();
    // this.getlist();
  },
  methods: {
    getlist(data) {
      console.log("gethotsonglist",data.label)
      var songlist = {};
      songlist.songtag = {
        listlogo:data.logo,
        listtitle: data.listtitle,
        listauthor: data.listauthor,
        authoricon:data.listauthoricon,
        createtime: data.createtime,
        labeltag: ['ACG','越共'],
        introduction:data.listintroduction,
      };
      songlist.collectlist = [
          {
              songtitle:"beyoung",
              singer:"Taylor Swift",
              timesamp:3900,
              alblum:"true",
              glutenfree: false,
          },
          {
              songtitle:"beyoung",
              singer:"Taylor Swift",
              timesamp:3900,
              alblum:"true",
              glutenfree: false,
          },
          {
              songtitle:"beyoung",
              singer:"Taylor Swift",
              timesamp:3900,
              alblum:"true",
              glutenfree: false,
          },
          {
              songtitle:"beyoung",
              singer:"Taylor Swift",
              timesamp:3900,
              alblum:"true",
              glutenfree: false,
          }
      ]
      songlist.commitment = {
          useritself:{
              userid:"300021",
              currentlistsong:"1",
              userimg:"https://p1.music.126.net/1EYTUkj4pp0LIz9hIVD7jQ==/109951165627862119.jpg?param=50y50"
          },
          currentcommitpart:[
              {
                  userimg:"https://p1.music.126.net/J6I77QwwxmsLMeo7dnSKPg==/109951164946773363.jpg?param=50y50",
                  usernickname:"Nihil-Obstat",
                  userid:"5399063354",
                  committime:"10:42",
                  committext:"东方官方包含了游戏，小说，漫画，音乐，而同人包含的范围就更广了，在这里一定能找到你喜欢的东西。如果有兴趣了解的话可以私信我，推荐给你一些东方有趣的作品",
                  responseid:{
                      userid:"1287370320",
                      username:"玄丹青鸟",
                      usercommittext:"很多动漫里的歌第一次听的话我不一定能喜欢，但听次数多了就不知道我到底喜不喜欢了，收藏吧[多多耍酷]",
                      usercommitid:"641245",
                  },
              },
               {
                  userimg:"https://p1.music.126.net/J6I77QwwxmsLMeo7dnSKPg==/109951164946773363.jpg?param=50y50",
                  usernickname:"Nihil-Obstat",
                  userid:"5399063354",
                  committime:"10:42",
                  committext:"东方官方包含了游戏，小说，漫画，音乐，而同人包含的范围就更广了，在这里一定能找到你喜欢的东西。如果有兴趣了解的话可以私信我，推荐给你一些东方有趣的作品",
                  responseid:{
                      userid:"1287370320",
                      username:"玄丹青鸟",
                      usercommittext:"很多动漫里的歌第一次听的话我不一定能喜欢，但听次数多了就不知道我到底喜不喜欢了，收藏吧[多多耍酷]",
                      usercommitid:"641245",
                  },
              },
               {
                  userimg:"https://p1.music.126.net/J6I77QwwxmsLMeo7dnSKPg==/109951164946773363.jpg?param=50y50",
                  usernickname:"Nihil-Obstat",
                  userid:"5399063354",
                  committime:"10:42",
                  committext:"东方官方包含了游戏，小说，漫画，音乐，而同人包含的范围就更广了，在这里一定能找到你喜欢的东西。如果有兴趣了解的话可以私信我，推荐给你一些东方有趣的作品",
                  responseid:{
                      userid:"1287370320",
                      username:"玄丹青鸟",
                      usercommittext:"很多动漫里的歌第一次听的话我不一定能喜欢，但听次数多了就不知道我到底喜不喜欢了，收藏吧[多多耍酷]",
                      usercommitid:"641245",
                  },
              }
          ],
      };
      this.$data.songlist = songlist;
    },
    hotlist() {
      var that = this;
      var userid = JSON.parse(localStorage.getItem("userinformation")).data._id;
      console.log(userid);
      if (userid != null) {
        this.$.ajax({
          type: "GET",
          url: "http://localhost:3000/gethotlist?id=" + that.$route.params.id,
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
  },
  mounted() {
    // this.$refs.bodyheight.style.height = 1000 + "px";
  },
};
</script>

<style scoped>
.fixedarea {
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  justify-content: left;
  max-width: 1000px;
  padding: 100px 32px 0px 32px;
  margin-left: calc(50% - 500px);
  margin-right: calc(50% - 500px);
  border: 1px solid gray;
}
</style>