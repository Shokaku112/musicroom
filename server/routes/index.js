var express = require('express');
var router = express.Router();
var Mongodb = require('./mongodb');
var User = Mongodb.User;
var mongoose = require('mongoose')
var Songlist = Mongodb.Songlist
var Commiment = Mongodb.Commitment
var Child = Mongodb.ChildCommitment
var Song=Mongodb.Song
var Lrc=Mongodb.Lrc
const jwt = require('jsonwebtoken')
const operator = require('./operatedb')
const path=require('path')
const fs=require('fs')
const fd=require('formidable')
const multiparty=require('multiparty')
console.log(operator)
/* GET home page. */
router.get('/user', async function (req, res, next) {
  // 2.token过期
  // 3.token登录
  // console.time('test')
  // 1.用户未登录
  var getemail = req.query.email
  var getpwd = req.query.pwd
  var token = req.query.token
  // console.log("getemail",typeof getemail,req.query.token)
  if (getemail != undefined) {
    // console.log("userlogin")
    token = await operator.checkuser(jwt, User, getemail, getpwd)
  } else {
    let result = await decoded(token)
    //  console.log("result:",result) 
    token = result
  }
  // console.log("getusertoken:+++",token)
  res.send(JSON.stringify(token))
  // console.timeEnd('test')
  // console.log("data:++++++",token)
});
router.get('/createlist', async function (req, res, next) {
  // 1.获取用户信息，获取该id，同时创建一个songlist数据并且把它的id记录再做一个
  var data = JSON.parse(req.query.data)
 
  var formatdata = {
    label: [],
    listsongid: [],
    logo: "https://p2.music.126.net/W3mxL5_3bsSDBjeMnHhXWA==/109951164216505402.jpg?param=200y200",
    listtitle: data.listtitle,
    listsubtitle: data.listtitle,
    listauthor: data.listauthor,
    listauthorid: mongoose.Types.ObjectId(data.listauthorid),
    listauthoricon: data.listauthoricon,
    createtime:Date.now(),
    listintroduction:"",
  }
  console.log("received:", data)
  var result = await operator.createsonglist(Songlist, formatdata);
  console.log("Songlist?????",result)
  res.send(result)
});
router.get('/getusersonglist', async function (req, res, next) {
  var id = req.query.id
  id = mongoose.Types.ObjectId(id);
  // console.log("received:",id)
  var result = await operator.getusersonglist(User, id);
  console.log("status?????", result)
  res.send(JSON.stringify(result))
})
router.get('/getcommiment', async function (req, res, next) {
  var id = req.query.id
  id = mongoose.Types.ObjectId(id);
  // console.log("getcommiment:",id)
  var result = await operator.getlistcommiment(Commiment, id);
  // console.log("status?????",result)
  res.send(JSON.stringify(result))
}),
  router.get('/createcommiment', async function (req, res, next) {
    var data = JSON.parse(req.query.data)
    console.log("create???", data)
    var formatdata = {
      parentid: mongoose.Types.ObjectId(),
      songlistid: mongoose.Types.ObjectId(data.songlistid),
      parentcontent: data.parentcontent,
      parentauthoricon: data.parentauthoricon,
      parentauthorname: data.parentauthorname,
      parentauthorid: mongoose.Types.ObjectId(data.parentauthorid)
    }
    var result = await operator.createsonglist(Commiment, formatdata);
    // console.log("formatdata",formatdata)
    res.send(JSON.stringify({ "result": "ok" }))
  })
router.get('/getchildcommitment', async function (req, res, next) {
  var data = JSON.parse(req.query.data)
  // console.log(data)
  var formatdata = {
    parentid: mongoose.Types.ObjectId(data.parentid),
    childauthorid: mongoose.Types.ObjectId(data.childauthorid),
    childcontent: data.childcontent,
    childauthorname: data.childauthorname
  }
  var result = await operator.createsonglist(Child, formatdata);
  // console.log("formatdata",formatdata)
  res.send(JSON.stringify({ "result": "ok" }))
}),
  router.get('/gethotlist', async function (req, res, next) {
    var id = req.query.id
    // console.log(id)
    var result = await operator.gethotlist(Songlist, id);
    // console.log("formatdata",result)
    res.send(result)
  })
router.get("/userregister", async function (req, res, next) {
  var getregisterid = JSON.parse(req.query.user);
  var formatdata = {
    nickname: getregisterid.nickname,
    userit: '请介绍下你自己吧~',
    collectlistsong: [],
    icon: "https://p2.music.126.net/W3mxL5_3bsSDBjeMnHhXWA==/109951164216505402.jpg?param=50y50",
    useremail: getregisterid.email,
    userpassword: getregisterid.password,
    role: 'user'
  }
  var checkuser = await operator.checkregisted(User, formatdata.useremail)
  if (checkuser) {
    var result = await operator.createsonglist(User, formatdata)
    console.log(getregisterid)
    res.send({ result: "ok" })
  } else {
    res.send({ result: "error" })
  }

})
router.get("/media",async function (req,res,next) { 
  // 歌词part
  let requestfielname=req.query.filename
  let PUBLIC_PATH = path.resolve(__dirname, '../public/media');
  console.log(requestfielname)
  console.log("currentpath:",PUBLIC_PATH)
  var filename=req.query.filename;
  fs.readFile(PUBLIC_PATH+'/'+requestfielname,function(err,data){
   if(err){
     console.log("文件不存在！",err)
     res.send("error")
     return;
   }
    res.send(data)
  })
 })
 router.get("/getmusic",async function(req,res,next){
   let getfilename=req.query.filename;
   console.log("filename:+++",getfilename)
   let PUBLIC_PATH = path.resolve(__dirname, '../public/audio');
   fs.readFile(PUBLIC_PATH+'/'+getfilename,function(err,data){
    if(err){
      console.log("文件不存在！",err)
      res.send("error")
      return;
    }
     console.log("type:+++",typeof data)
     
     res.send({
       music:data
     })
   })

 })
 router.get('/getsonginfo',async function(req,res,next){
  var jsmediatags = require("jsmediatags");
  jsmediatags.read("../server/public/audio/新時あさ美 - SUITE LIFE.mp3", {
      onSuccess: function(tag) {
        console.log(tag.tags.picture.data);
        var data=tag.tags.picture
        var base64String="";
        var image=tag.tags.picture
        console.log(image)
        for(let i=0;i<image.data.length;i++){
          base64String+=String.fromCharCode(image.data[i])
        }
        var base64 = "data:" + image.format + ";base64,"
        console.log(base64)
        
        base64+=Buffer.from(base64String).toString('base64')
        // base64+=btoa(base64String)
        console.log(base64.length,image.data.length,base64String.length)
        res.set('Content-Type', 'text/html');
        res.send(tag.tags.picture);
        // res.send("<img src='"+base64+"'>")
        // 201627 151203
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
        res.send("error")
      }
    });
 })
 router.post('/upload',function(req,res){

   console.log(req.body)
   console.log(__dirname);
  var form = new multiparty.Form();
  var uploadpath="C:\\Users\\LENOVOV\\Desktop\\毕业设计\\YukinochatRoom\\yukinoroom-testver\\server\\public\\audio\\"
  // var uploadpath=__dirname+"\\upload"
  form.uploadDir=uploadpath
 //上传完成后处理
 form.parse(req,async function(err, fields, files) {
  var obj ={};
   console.log("+++++++++++++",fields.singer[0],fields.name[0])
   var filesTmp = JSON.stringify(files,null,2);
  if(err){
       console.log('parse error: ' + err);
    }
    else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.getfile[0];
      var uploadedPath = inputFile.path;
      var songid=mongoose.Types.ObjectId()
      var dstPath = songid +'.mp3';
    //重命名为真实文件名
    // 使用唯一的songid命名避免歌名有重复的现象，同时查找类似歌曲的时候使用name进行模糊查找
    fs.rename(uploadedPath,uploadpath+dstPath, async function(err) {
      if(err){
    console.log('rename error: ' + err);
    res.send({'status':400, 'message': '上传失败！'});
      } else {
        console.log(uploadpath+dstPath)
        console.log('rename ok');
        var song={
          songid:songid,
          singer:fields.singer[0],
          filepath:dstPath,
          name:fields.name[0],
          label:['123','456']
        };
        console.log(song)
        var result=await operator.createsonglist(Song,song)                
    res.send({'status':200, 'message': '上传成功！'});
      }
    });
    }
  });
})
router.post('/uploadlrc',function(req,res){
 var form = new multiparty.Form();
 var uploadpath="C:\\Users\\LENOVOV\\Desktop\\毕业设计\\YukinochatRoom\\yukinoroom-testver\\server\\public\\media\\"
 // var uploadpath=__dirname+"\\upload"
 form.uploadDir=uploadpath
//上传完成后处理
form.parse(req,async function(err, fields, files) {
 var obj ={};
  console.log("+++++++++++++",fields)
  var filesTmp = JSON.stringify(files,null,2);
 if(err){
      console.log('parse error: ' + err);
   }
   else {
     console.log('parse files: ' + filesTmp);
     var inputFile = files.getfile[0];
     var uploadedPath = inputFile.path;
     var lrcid=mongoose.Types.ObjectId()
     var dstPath = lrcid +'.lrc';
   //重命名为真实文件名
   // 使用唯一的songid命名避免歌名有重复的现象，同时查找类似歌曲的时候使用name进行模糊查找
   fs.rename(uploadedPath,uploadpath+dstPath, async function(err) {
     if(err){
   console.log('rename error: ' + err);
   res.send({'status':400, 'message': '上传失败！'});
     } else {   
       var lrc={
         lrcid:lrcid,
         name:fields.name[0],
         path:dstPath
       }
       var result=await operator.createsonglist(Lrc,lrc)            
   res.send({'status':200, 'message': '上传成功！'});
     }
   });
   }
 });
})
router.get('/getsong',async function(req,res,next){
  var songid=req.query.songid;
  var array=songid.split(',')
  if(array.indexOf('')>=0){
    array=[];
    res.send({info:'no song data!'})
  }else{
  var reslut=await operator.modelfindone(Song,'songid',array);
  console.log("songid+++++",reslut)
  res.send(reslut)
  }
  
})







async function decoded(token) {
  var decodekey = 'secret'
  var decodedata
  var decodetoken = await jwt.verify(token, decodekey, (err, decode) => {
    if (err) {
      console.log("error:", err)
      decodedata = {
        exp: 0
      }
    } else {
      // console.log('decodedkey: ', decode)
      decodedata = decode
      // console.log("dwadawa", decodedata)

    }

  })
  return decodedata;

}

module.exports = router;
