<template>
   
<div class="musicfixed">
   <v-card
    dark
    tile
    elevation="5">
    
    <v-slider
  id="myplayer"  
  hint="Im a hint"
  v-bind:max="musicprogress.totaltime"
  min="0"
  v-model="musicprogress.start"
  light
  @change="changed" 
>
      
</v-slider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{tagsinger}}</v-list-item-title>
              <v-list-item-subtitle>{{tagsong}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>
        
            <v-list-item-icon >
              <v-btn @click="presong" icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon  :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn  @click="play" icon>
                <v-icon v-show="!musicprogress.isplay">mdi-pause</v-icon>
                <v-icon  v-show="musicprogress.isplay">mdi-play</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn @click="nextsong" icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon>
               <!-- <v-btn
               icon
               @click="openlist">
          
                  <svg-icon :svg-name="'icon-list'" :class-name="'svg-env'" />
               </v-btn> -->
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>

       <div class="lrc">
         <div class="songlist">
           <ul class="listpart">
             <li v-for="(i,index) in songlist" @click="playcurrent(index)"  v-bind:key="index">
              <div class="col-md-1 col-12">

                   <svg-icon v-show="songlist[index].isshow"  :svg-name="'icon-play'" :class-name="'svg-env'" />
                
              </div>
              <!-- play识 -->
               <div class="col-md-6 col-12 songpartname">
                  <p>{{songlist[index].name}}</p>
               </div>
               <!-- 歌曲名 -->
                <div class="col-md-2 col-12">
                
                </div>
                <!-- 歌手 -->
                 <div class="col-md-3 col-12"></div>
                 <!-- 来源和时长 -->
             </li>
             
           </ul>
         </div>
         <div class="songlrc">
           <div class="songtitle">
             <h4>播放列表</h4>
           </div>
           <div class="songpart">
             <ul id="lrclist" style="translateY(112.5px)" >
            <!-- 保证歌词在正中间 -->
        </ul>
        </div>
         </div>
      <!-- 列表 -->
    </div>
      </div>
      
</template>

<script>
// import music from '../../assets/audio/新時あさ美 - SUITE LIFE.mp3'
  /* eslint-disable */
export default {
 
data:()=>({
    tagsinger:'',
    tagsong:'',
    ifopenlist:false,
    songlist:[
      {
        singer:'新時あさ美',
        filepath:'新時あさ美 - SUITE LIFE.mp3',
        name:'SUITE LIFE',
        lrc:'',
        isshow:false
      },
      {
        singer:'Luna Safari',
        filepath:'Luna Safari - Rainbow Adventure.mp3',
        name:'Rainbow Adventure',
        lrc:'rainbow.lrc',
        isshow:false
      },
       {
        singer:'田井中彩智',
        filepath:'田井中彩智 - 最高の片想い (最美的单思).mp3',
        name:'最高の片想い',
        lrc:'田井中彩智 - 最高の片想い (最美的单思).lrc',
        isshow:false
      },{
        singer:'supercell ',
        filepath:'supercell - 君の知らない物語 (你所不知道的故事).mp3',
        name:'supercell - 君の知らない物語 (你所不知道的故事)',
        lrc:'supercell - 君の知らない物語 (你所不知道的故事).lrc',
        isshow:false
      },{
        singer:'Ed - 在盛夏等待',
        filepath:'Ed - 在盛夏等待.flac',
        name:'Ed - 在盛夏等待',
        lrc:'Ed - 在盛夏等待.lrc',
        isshow:false
      }
    ],
    musicprogress:{
        music:null,
        totaltime:200,
        start:0,
        ishold:false, 
        isplay:true,
        isready:false,
        currentsong:0,
    },
   
}),
methods:{
    resetlistsong(){
      for(let data in this.$data.songlist){
        this.$data.songlist[data].isshow=false
      }
    },
    playcurrent(e){
      if(this.$data.musicprogress.music!=null){
        this.$data.musicprogress.music.pause()
      }
      
      this.$data.musicprogress.currentsong=e
      this.getmusic(this.$data.musicprogress.currentsong,0)
      this.resetlistsong();

      console.log(this.$data.songlist)
    },
    presong(){
      
      console.log(this.musicprogress.music)
      this.musicprogress.music.pause();
      //  this.musicprogress.music=null;
      
      if(this.$data.musicprogress.currentsong>=0){
          this.$data.musicprogress.currentsong--;
          this.resetlistsong(); 
          console.log("第",this.$data.musicprogress.currentsong+1,'首')
          this.getmusic(this.$data.musicprogress.currentsong,0)
      }else{
         alert('小于0')
         this.$data.musicprogress.currentsong++;
      }
    },
    nextsong(){
      
     
      this.musicprogress.music.pause();
      //  this.musicprogress.music=null;
      this.$data.musicprogress.currentsong++;
      if(this.$data.musicprogress.currentsong<this.$data.songlist.length){
          this.resetlistsong(); 
          // console.log("第",this.$data.musicprogress.currentsong+1,'首','current:',this.$data.musicprogress.currentsong,'listlength',this.$data.songlist.length)
          this.getmusic(this.$data.musicprogress.currentsong,0)
      }else{
        alert('超出列表长度')
         this.$data.musicprogress.currentsong--;
      }
    },
    resetmusicstatus(){
     this.$data.musicprogress.start=0
    },
  async requestfile(file){
      var result="Ed - 在盛夏等待.flac"
   await this.$.ajax({
        type: "GET",
        url: "http://localhost:3000/getfile?filename="+file,
        success: function (response) {
          console.log(response)
          // alert()
          result=response
        },
        error:(err)=>{
          console.log(err)
        }
      });
    },
  async  getmusic(i,isajax,lrclist){
   if(isajax){
        var that=this
        var audio=new Audio();
        var $=this.$;
        $("#lrclist").html('')
        let b=lrclist
        var lrcJSON = lrclist
        var lrcTime = [];//歌词对应的时间数组
        var ul = $("#lrclist")[0];//获取ul
        var k = 0;
        $.each(lrcJSON, function (key, value) {//遍历lrc
            console.log(key)
            lrcTime[k++] = parseFloat(key.substr(1, 3)) * 60 + parseFloat(key.substring(4, 10));//00:00.000转化为00.000格式
            ul.innerHTML += "<li><p>" + lrcJSON[key] + "</p></li>";//ul里填充歌词
        });
        lrcTime[lrcTime.length] = lrcTime[lrcTime.length - 1] + 3;//如不另加一个结束时间，到最后歌词滚动不到最后一句
        var $li = $("#lrclist>li");//获取所有li
        var currentLine = 0;//当前播放到哪一句了
        var currentTime;//当前播放的时间
        var ppxx;//保存ul的translateY值
        audio.src="http://192.168.88.109:3000/audio/"+this.$data.songlist[i].filepath
        // audio.src=await this.requestfile(this.$data.songlist[i].filepath)
        audio.setAttribute('id','audio')
        audio.addEventListener('loadedmetadata',function(){
            // 加载时长
            // alert("loadeddata")
            that.musicprogress.isplay=false
            that.$data.songlist[i].isshow=true
            audio.play()
            that.$data.tagsinger=that.$data.songlist[i].singer
            that.$data.tagsong=that.$data.songlist[i].name
            that.$data.musicprogress.totaltime=audio.duration
            that.$data.musicprogress.start=0
            ul.style.transform = "translateY(0px)";
            // console.log(audio)
        })
        audio.addEventListener('canplay',function(){
            // alert('duration'+audio.duration)
            that.$data.musicprogress.music=audio;
            that.$data.musicprogress.isready=true;
            //  alert("canplay")
        })
        audio.addEventListener('ended',function(){
          console.log("end")
          ul.style.transform = "translateY(0px)";
          that.nextsong();
        })
        audio.addEventListener('timeupdate',function(){
         
             that.$data.musicprogress.start=audio.currentTime
             currentTime = audio.currentTime;
            for (let j = currentLine, len = lrcTime.length; j < len; j++) {
                if (currentTime < lrcTime[j + 1] && currentTime > lrcTime[j]) {
                    currentLine = j;
                    ppxx = 112.5-(currentLine * 35);
                    ul.style.transform = "translateY(" + ppxx + "px)";
                    $li.get(currentLine-1).style.color="white"
                    // 去除标记
                    console.log("on" + currentLine);
                    $li.get(currentLine).style.color="red"
                    // 标记新的当前歌词句子
                    break;
                    // 找到之后没必要继续查找了
                }
            }
         
        })
        audio.addEventListener('seeked',function(){
         console.log("seekedtime",audio.currentTime)
         currentTime = audio.currentTime;
            console.log("  off" + currentLine);
           
           
            for (let k = 0, len = lrcTime.length; k < len; k++) {
                if (currentTime < lrcTime[k + 1] && currentTime < lrcTime[k]) {
                    currentLine = k;
                    break;
                }else{
                     $li.get(k).style.color="white"
                    //  跳转的时候将前面已经标记的歌词变回原色
                }
            }
         
        })
   }else{
     this.getLRC(i,this.$data.songlist[i].lrc,this.getmusic)
   }
    },
  async getLRC(index,lrcname,callback) {
     var lrc=""
     let songmap={}
     var lrcJSON = {
           "[00:00.00]":"暂无相关内容歌曲",
        };
    console.log(lrcname)
    var $=this.$   
  await $.ajax({
      type: "GET",
      url: "http://localhost:3000/media/?filename="+lrcname,
      dataType:'text',
      success: function (response) {
        if(response=="error"){
          // alert("无该文件名")
          lrc=lrcJSON
        }else{
          lrc = response;
        }
            
            lrc=lrc.toString();
            lrc=lrc.split('\n');
         
           lrc=lrc.filter(function(item){
               return item=!(item.indexOf('ar:')>0||item.indexOf('ti:')>0)
           })
          //  console.log(lrc)
           var timeline=[]
           var timelinesong=[]
           for(let i in lrc){
               if(lrc[i].length!=0){
                   timeline.push(lrc[i].slice(0,10))
                   timelinesong.push(lrc[i].slice(10,lrc[i].length))
               }
           }

          
           $.each(timeline,function(index,value){
              songmap[value]=timelinesong[index]
           })
           console.log(songmap)
          callback(index,1,songmap)
          return songmap
        
      },
      error:function(err){
        console.log(err.responseText)
      }
    });
   
},
    
    play(){
      if(this.$data.musicprogress.isready==true&&this.$data.musicprogress.music!=null){
         this.$data.musicprogress.isplay=!this.$data.musicprogress.isplay
      if(this.$data.musicprogress.isplay==true)
      {
        console.log("pause")
        this.$data.musicprogress.music.pause();
      }else{
        console.log("play")
        this.$data.musicprogress.music.play();
      }
      }
     
    },
    changed(e){
      if(this.$data.musicprogress.isready==true){
      console.log("changed",e)
      this.$data.musicprogress.music.currentTime=e
      }
     
    },
    start(){
      console.log(this.$data.musicprogress.music)
      var music= this.$data.musicprogress.music
      music.play();
      
    }
},
mounted(){
  //  this.getmusic(0,0)
    
},
created(){

},
watch:{
  "musicprogress.start":function(){
    //  console.log(this.$data.musicprogress.start)
   },
   "$store.state.playlistdata":function(){
     var ifsame=0;
     console.log("newsongdata:++++",this.$store.state.playlistdata)
     for(let i of this.songlist){
       if(i.songid==this.$store.state.playlistdata.songid){
         console.log(i)
         ifsame=1;
         break;
       }
     }
     if(ifsame){
       alert('重复');
     }else{
         var newsong= {
        singer:this.$store.state.playlistdata.singer,
        filepath:this.$store.state.playlistdata.filepath,
        name:this.$store.state.playlistdata.songtitle,
        songid:this.$store.state.playlistdata.songid,
        lrc:'',
        isshow:false
      }
      this.songlist.push(newsong)
     }
   
     
   }
}

}
</script>

<style scoped>
.listpart{
    position: absolute;
    left: 0px;
    top: 40px;
    width: 546px;
    height: 28px;
    background: green;
}
.listpart li{
  display: flex;
  width: 100%;
  height: 28px;
  background: #1f1f1f;
}
.listpart li:hover{
  background-color: black;
}
.listpart li div:nth-child(1){
  display: flex;
  justify-content: center;
  background-color: red;
  padding: 0;
}
.listpart li div:nth-child(2){
  background-color: blue;
}
.listpart li div:nth-child(3){
  background-color: green;
}
.listpart li div:nth-child(4){
  background-color: gold;
}
.songpartname{
  padding: 0;
}
.songpartname p{
  color: white;
  height: 28px!important;
  display: block!important;
  margin: 0!important;
  line-height: 28px!important;
}
.songtitle{
  color: white;
  position: absolute;
  top:0px;
  left: 0px;
  width: 1000px;
  height: 40px;
  padding: 10px;
  display: flex;
  /* background: gold; */
  background-image: linear-gradient(to right, #111111,#1f1f1f,#111111,#1b1b1b,#1f1f1f,#1f1f1f,#111111,#151515 , #181818 );
}
.songtitle h4{
  position: absolute;
  left: 25px;
}
.musicfixed{
    width: 1000px;
    position: fixed;
    left:calc(50% - 500px);
    /* bottom:-430px; */
     bottom:0px;
    transition: bottom 0.4s ease-in-out;
}
.musicfixed:hover{
 /* bottom:0px; */
 /* bottom:-430px; */
}
#li.test{
color: green!important;
}
.lrc{
            display: flex;
            position: absolute;
            bottom: 138px;
            width: auto;
            height: 300px;
            border-radius: 20px 20px 0 0;
            margin: 0 auto;
            overflow: hidden;
            background-color: green;
            /* overflow-y: auto; */
        }
.songlist{
  width: 550px;
  height: 300px;
  background-color: #1f1f1f;
  border-right: 4px solid black;
}
.songlrc{
  display: flex;
  justify-content: center;
  width: 450px;
  height: 300px;
  background-color: #1f1f1f;
  align-items: center;
  overflow: hidden;
}
.songpart{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
  background: #1f1f1f;
  overflow: hidden;
  color: white;
  padding: 12px;
}
.lrc ul {
            transition-duration: 600ms;
        }

.lrc ul,
.lrc li {
            list-style: none;
            padding: 0;
            margin: 0;
        }



.lrc  p {
            overflow: hidden;
            text-overflow: ellipsis;
            height: 16px;
            line-height: 16px;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            text-align: center;
            margin-top: 0;
            margin-bottom: 16px;
        }

.lrc  audio {
            margin-top: 10px;
        }
</style>
