<template>
  <div>
    <div style="height: 290px; background: green">
      <!-- navigation bar -->

      <!-- extra bar -->
      <v-row align="center" style="height: 300px; background-color: red">
        <v-col style="padding: 0">
          <v-carousel
            cycle
            height="300"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item v-for="(carousel, i) in carousels" :key="i">
              <v-sheet height="100%">
                <div style="display: flex; height: 300px">
                  <img
                    class="hslatest col-sm-0 col-md-2 col-lg-2 col-12"
                    :src="carousel"
                  />
                  <img
                    :src="carousel"
                    class="col-sm-12 col-md-8 col-lg-7 col-12"
                    style="padding: 0"
                  />
                  <img
                    class="hslatest col-sm-0 col-md-2 col-lg-3 col-12"
                    :src="carousel"
                  />
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
    <!-- top -->
    <!-- <v-responsive :aspect-ratio="16/9">
        <v-card-text>
          This card will always be 16:9 (unless you put more stuff in it)
        </v-card-text>
      </v-responsive> -->
    <v-row style="height: auto; display: flex; width: 100%">
      <v-col cols="12" md="0" sm="0" lg="2"> 1 </v-col>
      <v-col
        cols="12"
        md="8"
        sm="12"
        lg="7"
        style="
          box-shadow: 6px 0 5px -5px rgba(0, 0, 0, 0.6),
            -6px 0 5px -5px rgba(0, 0, 0, 0.6);
          height: auto;
          flex-shrink: 0;
        "
      >
        <v-row align="center" style="width: 100%; height: auto; margin: 0">
          <v-col cols="12" lg="9" sm="3" style="height: auto; flex-shrink: 0">
            <!-- 热门推荐 -->
            <div style="width: 100%; height: auto">
              <div class="hottitle">
                <span>热门推荐</span>
                <div class="itembar">
                  <a href="#">欧美</a>
                  <span>|</span>
                  <a href="#">日韩</a>
                  <span>|</span>
                  <a href="#">流行</a>
                  <span>|</span>
                  <a href="#">摇滚</a>
                  <span>|</span>
                  <a href="#">ACG</a>
                </div>
                <div class="more"><a href="#">更多>></a></div>
              </div>
              <div class="line"></div>
              <div class="recommendlist">
                <v-row>
                  <v-col
                    v-for="n in 8"
                    :key="n"
                    class="d-flex"
                    cols="3"
                    style="flex-direction: column; overflow: hidden"
                  >
                    <a href="#">
                      <v-img
                        @click="selecttag(n)"
                        title="2020最后一个月，希望一切都能好起来"
                        :src="`https://picsum.photos/500/300?image=${
                          n * 5 + 10
                        }`"
                        :lazy-src="`https://picsum.photos/10/6?image=${
                          n * 5 + 10
                        }`"
                        aspect-ratio="1"
                        width="142"
                        height="142"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </a>
                    <a
                      title="2020最后一个月，希望一切都能好起来xxxxxxx"
                      style="width: 130px; padding-top: 12px"
                      >2020最后一个月，希望一切都能好起来</a
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
            <!-- 热门推荐 -->
            <div style="width: 100%; height: auto">
              <div class="hottitle" style="padding: 12px">
                <span>个性化推荐</span>
              </div>
              <div class="line"></div>
              <div class="recommendlist">
                <v-row>
                  <v-col class="d-flex" cols="3" style="flex-direction: column">
                    <div class="personal">
                      <!-- date -->
                      <span>星期日</span>
                      <span class="line date"></span>
                      <span>13</span>
                    </div>
                  </v-col>
                  <v-col
                    v-for="n in 3"
                    :key="n"
                    class="d-flex"
                    cols="3"
                    style="flex-direction: column; overflow: hidden"
                  >
                    <a href="#">
                      <v-img
                        title="2020最后一个月，希望一切都能好起来"
                        :src="`https://picsum.photos/500/300?image=${
                          n * 5 + 10
                        }`"
                        :lazy-src="`https://picsum.photos/10/6?image=${
                          n * 5 + 10
                        }`"
                        aspect-ratio="1"
                        width="142"
                        height="142"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </a>
                    <a
                      title="2020最后一个月，希望一切都能好起来xxxxxxx"
                      style="width: 142px; padding-top: 12px"
                      >2020最后一个月，希望一切都能好起来</a
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
            <!-- 个性化推荐 -->
            <div style="width: 100%; height: auto">
              <div class="hottitle" style="padding: 12px">
                <span>新歌上架</span>
                <div class="more"><a href="#">更多>></a></div>
              </div>
              <div class="line"></div>
              <div class="recommendlist">
                <v-carousel v-model="model" height="200" hide-delimiters>
                  <v-carousel-item v-for="n in 3" :key="n">
                    <v-sheet height="100%" :title="n" light tile>
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <ul>
                          <li
                            v-for="(i, index) in 4"
                            :title="i"
                            v-bind:key="index"
                          >
                            <a href="#">
                              <img
                                :src="`https://picsum.photos/500/300?image=${
                                  i * 5 + 10
                                }`"
                              />
                              <span class="newsongtag songtag">everyone</span>
                              <a href="#/homepage">
                                <span class="newsongtag">CNBLUE</span></a
                              >
                            </a>
                          </li>
                        </ul>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </div>
            <!-- 新歌上架 -->
            <div style="width: 100%; height: auto">
              <div class="hottitle" style="padding: 12px">
                <span>榜单</span>
              </div>
              <div class="line"></div>
              <div class="recommendlist">
                <div class="hotlist" v-for="n in 3" v-bind:key="n">
                  <ul>
                    <li>
                      <a href=""><img src="http://localhost:8080/image/list.jpg" alt="" /></a>
                      <div style="padding-left: 11px;top:-80px">
                        <a href=""><span>云音乐飙升榜</span></a>
                      </div>
                       <div>
                         <v-btn
                         width="30"
                         height="30" 
                         class="mx-2" fab dark  color="blue">
                         <svg-icon :svg-name="'icon-play'" :class-name="'svg-env'" />
                        </v-btn>
                         <v-btn 
                         width="30"
                         height="30" 
                         class="mx-2" fab dark x-small color="blue">
                         <svg-icon :svg-name="'icon-plus'" :class-name="'svg-env'" />
                        </v-btn>
                      </div>
                    </li>
                    <!-- topitem -->
                    <li v-for="k in 10" v-bind:key="k"> <span>{{k}}</span><span><a href="">自洽</a></span></li>
                    <!-- more -->
                    <li><span class="formore"><a href="">更多>></a></span></li>
                  </ul>
                </div>
                
              </div>
            </div>
            <!-- 榜单 -->
          </v-col>
          <!-- playlist -->
          <v-col
            lg="3"
            sm="3"
            style="background: red; height: auto; flex-shrink: 0"
          ></v-col>
          <!-- userlist -->
        </v-row>
      </v-col>
      <v-col cols="12" md="0" sm="0" lg="2"> 3 </v-col>
    </v-row>

    <!-- middle -->
    <div style="height: auto">
      <v-row style="background: grey">
        <v-col style="padding: 0">
          <v-footer dark :padless="true">
            <v-card flat tile class="indigo lighten-1 white--text text-center">
              <v-card-text>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 white--text"
                  icon
                >
                  <v-icon size="24px">
                    {{ icon }}
                  </v-icon>
                </v-btn>
              </v-card-text>

              <v-card-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
                amet. Mauris cursus commodo interdum. Praesent ut risus eget
                metus luctus accumsan id ultrices nunc. Sed at orci sed massa
                consectetur dignissim a sit amet dui. Duis commodo vitae velit
                et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat
                augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
                Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
              </v-card-text>
            </v-card>
          </v-footer>
        </v-col>
      </v-row>
      <!-- bottom -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    svgpath:"http://localhost:8080/image/plus.svg",
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
  }),
  mounted() {
    this.$store.state.navigationbar = true;
    console.log("mounted!", this.$store.state.navigationbar);
    this.$data.carousels = [
      "http://localhost:8080/image/1.jpg",
      "http://localhost:8080/image/2.jpg",
      "http://localhost:8080/image/3.jpg",
      "http://localhost:8080/image/4.jpg",
      "http://localhost:8080/image/5.jpg",
      "http://localhost:8080/image/6.jpg",
      "http://localhost:8080/image/7.jpg",
      "http://localhost:8080/image/15.jpg",
    ];
  },
  methods:{
    selecttag(e){
      console.log(e)
      this.$router.push({name:'hotlist',params:{id:"6013d42ce193752b6cba8c58"}});
    },
  },
  // created(){
  //   this.$.ajax({
  //     type: "POST",
  //     url: "http://localhost:3000/upload",
  //     data: {data:"data"},
  //     dataType: "json",
  //     success: function (response) {
  //       response
  //     }
  //   });
  // },
  beforeRouteEnter(to, from, next) {
    /* eslint-disable */
    next(vm =>{
      vm.$store.state.navigationbar=true
    });
  },

  beforeRouteLeave(to, from, next) {
    /* eslint-disable */
    console.log("homepage leave", this.$store.state.navigationbar);
    if(to.path=='/login'){
       this.$store.state.navigationbar = false;
    }
    console.log(to.path)
    next();
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
  color: black!important;
}
a:hover{
  text-decoration: underline;
}
.hotlist {
  /* display: flex;
  flex-direction: column; */
   width: 33.3%;
   float: left;
}
.clear {
  display: none;
  clear: both;
}
.hotlist div {
  /* flex-shrink:0; */
  /* float: left; */
 
  width: auto;
  height: auto;
}
.hotlist ul li {
  display: flex;
  margin: 0;
  width: 100%;
  height: 30px;
  background: #f4f4f4;
  border:1px solid #d2d2d2;
  align-items: center;
  justify-content: left;
  padding-left: 12px;
}
.formore{
  font-size: 12px!important;
    position: relative;
    left: 75%;
}
.hotlist ul li:nth-child(n+2) span:first-child{
font-size: 16px;
}
.hotlist ul li:nth-child(n+2) span:last-child{
margin-left: 12px;
}
.hotlist ul li:nth-child(n+2):nth-child(-n+4) span:first-child{
 color: red;
}
.hotlist ul li:nth-child(odd){
  background-color: #f4f4f4;
}
.hotlist ul li:nth-child(even){
  background-color: #e8e8e8;
}
.hotlist ul li:first-child {
  height: 120px;
  display: block;
  padding: 12px;
}
.hotlist ul li:first-child img {
  width: 80px;
  height: 80px;
  max-width: 80px;
  /* margin-right: 15px; */
}

.hotlist ul li:first-child div {
  display: block;
  position: relative;
  bottom: 75%;
  left: 78px;
}
.newsongtag {
  display: block;
}
.songtag {
  margin-bottom: 5px;
}
ul {
  padding: 0 !important;
  list-style: none;
}
li {
  display: flex;
  width: 120px;
  height: auto;
  /* background-color: green; */
  float: left;
  color: black;
  margin-left: 20px;
  /* align-items: center; */
  justify-content: center;
}

li img {
  width: 120px;
  height: 100px;
  max-width: 120px;
  background-color: aquamarine;
}
/* a {
  width: 142px;
} */
.line {
  display: block;
  width: 100%;
  height: 2px;
  border: 1px solid red;
}
.personal {
  /* margin-right: 12px; */
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  text-align: center;
  background: green;
  border-radius: 10px;
}
.personal span:first-child {
  /* display: block; */
  align-items: center;
  justify-content: center;
  display: flex;
  height: 35px;
  color: #fed9d9;
  background: #962626;
  text-shadow: 0 -1px #962626;
  border: 1px solid gray;
  border-radius: 10px 10px 0 0;
}
.date {
  /* float: right; */
  top: 56px;
  position: relative;
  border: 0.5px solid gray;
  opacity: 0.5;
}
.personal span:last-child {
  display: block;
  height: 112px;
  background-image: linear-gradient(white 20%, #626262, #626262, white);
  line-height: 112px;
  font-size: 75px;
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  border: 1px solid gray;
}

/* .col-md-8 {
    flex: 0 0 66.6666666667%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 66.6667%;
    max-width: 66.6666666667%;} */
.hslatest {
  /* flex: 0 0 20%; */
  filter: blur(10px);
  padding: 0 !important;
  /* max-width: 20%; */
}
.hottitle {
  width: 100%;
  height: auto;
  display: flex;
  background-color: white;
  /* font-size: 24px; */
  /* padding: 12px; */
}
.hottitle span:nth-child(1) {
  font-size: 24px;
}
.itembar {
  padding: 12px;
  display: inline-block;
  width: auto;
  height: auto;
  text-align: center;
  /* background-color: gray; */
}
.itembar a {
  width: auto;
  color: black;
  display: inline-block;
  margin-left: 10px;
  /* border: 1px solid red; */
}
.itembar a:first-child {
  margin-left: 0px;
}
.more {
  margin-left: auto;
  padding: 12px;
}
.itembar span {
  margin-left: 15px;
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
.recommendlist {
  width: 100%;
  height: auto;
  /* background-color: gold; */
  padding: 12px;
}
.contentpart {
  height: 100%;
  background-color: #242424;
  align-items: center;
  padding: 0 !important;
}
.content {
  height: 100%;
  padding: 0;
  background-color: #242424;
  border: 1px solid red;
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
  @media screen and (max-width: 965px) {
    * {
      filter: blur(0px) !important;
    }
  }
  @media screen and (max-width: 1500px) {
    li {
      margin-left: 10px;
    }
  }
  .middlestyle {
    box-shadow: 6px 0 5px -5px rgba(0, 0, 0, 0.6),
      -6px 0 5px -5px rgba(0, 0, 0, 0.6);
  }
  .hotcontent {
    width: 100%;
    height: 100px;
    background-color: white;
  }

  .recommandlist {
    width: auto;
    display: inline-block;
    padding: 12px;
  }
}
</style>