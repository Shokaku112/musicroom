<template>
  <v-card width="100%" height="100%">
    <v-alert
  :style="{top:success?'0px':'-1000px'}"
  class="success"
  type="success"
>文件已经成功上传</v-alert>
 <v-alert
  :style="{top:failed?'0px':'-1000px'}"
  class="error"
  type="error"
>上传失败 <strong>错误代码:</strong>{{code}}</v-alert>
    <v-card class="uploadpart">
      <v-file-input
        @change="loadfile(file)"
        v-model="file"
        prepend-icon="mdi-file"
        accept=".flac,.mp3"
        label="支持mp3,flac等音频格式"
      ></v-file-input>
      <div style="padding-left: 32px">
        <v-text-field v-model="filename" label="文件名"></v-text-field>
        <v-text-field v-model="author" label="作者"></v-text-field>
        <v-text-field
        :rules="r1"
        required
        label="大小" v-model="size"></v-text-field>
        <v-file-input
        v-model="lrc"
        prepend-icon="mdi-file"
        accept=".lrc"
        label="(可选)上传对应歌词，支持lrc格式"

      ></v-file-input>
      </div>
      <div class="c-1">
         <v-btn 
         elevation="0"
         @click="upload(file)">确认</v-btn>
         <span style="margin:0px 10px 0px 10px"></span>
         <v-btn
         elevation="0" 
         @click="clear()">清空</v-btn>
      </div>
      <v-progress-linear

      v-if="activite"
      :value="progress"
      color="cyan"
    ></v-progress-linear>
    </v-card>
  </v-card>
</template>

<script>
/* eslint-disable*/
import axios from "axios";

export default {
  data() {
    return {
      code:'',
      success:false,
      file: null,
      author: null,
      filename: null,
      size: null,
      activite:false,
      progress:0,
      failed:false,
      lrc:null,
      r1:[
        (v)=> v<20||'规定最大上传文件大小不得超过20MB'
      ]
    };
  },
  methods: {
    uploadlrc(){
      var that=this;
      var form=new FormData();
      form.set('getfile',this.lrc);
      form.set('name',String(this.filename))
      axios({
        method:'post',
        url:'http://192.168.88.109:3000/uploadlrc',
        data:form,
      })
    },
    clear(){
      this.file=null;
      this.author=null;
      this.filename=null
      this.size=null
      this.activite=false
      this.progress=0
      this.lrc=null
    },
    upload(file) {
      var that=this
      var form = new FormData();
      form.append("getfile", file);
      form.append('singer',String(this.author));
      form.append('name',String(this.filename));
      if(this.lrc!=null){
        this.uploadlrc()
      }
      if(file!=null){
         axios({
        method:'post',
        url:'http://192.168.88.109:3000/upload',
        data:form,
         onUploadProgress(progressEvent){
                    if (progressEvent.lengthComputable) {
                      let val = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(0));
                      // that.formData.showProgress = true;
                      // that.formData.startValue = parseInt(val)
                      that.activite=true
                      that.progress=val;
                      console.log(val)
                      if(val==100){
                        that.clear();
                      }
                    }
                  },
      }).then(function(res){
        var result=res.data
        if(res.data.status==200){
          that.success=true;
          setTimeout(function(){ 
           that.success=false
        },5000)
        }else{
           that.failed=true;
           that.code=res.data.status
          setTimeout(function(){ 
           that.failed=false
        },5000)
        }
        console.log(res)
      })
      }else{
        that.failed=true
        that.code=500;
        setTimeout(function(){ 
           that.failed=false
        },5000)
      }
    },
    // showTags(url){
    //    var tags = ID3.getAllTags(url);
    //    console.log(tags)

    // },
    loadfile(file) {
      var that = this;
      var jsmediatags = window.jsmediatags;
      jsmediatags.read(file, {
        onSuccess: function (tag) {
          console.log(tag.tags);
          that.author = tag.tags.artist;
          that.filename =file.name;
          that.size = (parseInt(file.size)/1000000).toFixed(2);
        },
        onError: function (error) {
          console.log(error);
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.uploadpart {
  width: 50%;
  height: auto;
  background: gold;
  position: relative;
  left: calc(50% - 25%);
}
.c-1{
  position: relative;
  left: 0;
  text-align: center;
}
.success{
z-index: 20;
width: 100%;
position: absolute;
transition:all 2s ease-in-out;
}
.error{
z-index: 20;
width: 100%;
position: absolute;
transition:all 2s ease-in-out;
}
// @keyframes success {
//   from{top: 0px;}
//   to{}
// }
</style>