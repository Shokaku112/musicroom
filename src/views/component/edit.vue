<template>
  <div class="mainbody">
      <div class="currentstep">
        <a href="#">listname+listid</a>
        <span class="bt-1">></span>
        <span>编辑歌单</span>
      </div>
      <div class="d-1">
        <div class="tag-1">
         <v-text-field
         style="width:50%"
         label="歌单名"
         v-model="songname"
         >
        </v-text-field>
        <div class="logoedit">
          <img src="https://p2.music.126.net/W3mxL5_3bsSDBjeMnHhXWA==/109951164216505402.jpg?param=200y200" alt="">
           <span><a href="">编辑封面</a></span>
        </div>
        <div class="selecttag">
          <span>标签:</span>
          <a href="">选择标签</a>
        </div>
        <div class="editic">
          <p>介绍:</p>
          <textarea  cols="30" rows="10"></textarea>
        </div>
        
        </div>
      </div>
      edit part {{this.$route.params.id}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      // tagdata:this.tagdata
      songname:'TouhouProject',
    }
  },
  props:['tagdata'],
created(){
// alert(this.$props.tagdata)
console.log(this.$props)
}
}
</script>

<style lang="less" scoped>
@widthvar:100px;
.selecttag{
  display: flex;
  margin-bottom: 20px;
  span{
    margin-right: 10px;
  }
}
.editic{
  p{
    margin-bottom: 10px;
  }
textarea{
  width: 50%;
  max-height: 200px;
  height:200px;
  list-style: none;
  border: 1px solid gray;
}
}
.logoedit{
  width: 200px;
  height: 200px;
  background: green;
  float: right;
  span{
    display: flex;
    text-align: center;
    position: relative;
    background: gray;
    height: 30px;
    top: -34px;
    align-items: center;
    justify-content: center;
    background-color:rgba(105, 105, 105, 0.8) ;
    a{
      color: white;
    }
  }
}
.tag-1{
  // display: inline-block;
  padding-top: 20px;
}
.bt-1{
  margin: 0px 10px;
}
.mainbody{
  padding:50px 25px;
  background: white;
  width: 100%;
  height: 15*@widthvar;
}
.currentstep{
  padding: 12px;
  width: 100%;
  height: auto;
  border-bottom: 1px dotted gray;
  display: inline-block;
  // margin-bottom: 20px;
}
.d-1{
  width: 100%;
  height: 500px;
  background: white;
}
</style>>

