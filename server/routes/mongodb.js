const mongoose=require('mongoose')
var jsmediatags = require("jsmediatags");
 

console.log('mongoose hello')
mongoose.connect('mongodb://127.0.0.1:27017/user',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

// User
// 定义结构
var Toplist=mongoose.Schema({

})

var LabelSchema=mongoose.Schema({
    tagid:{
        type:mongoose.Types.ObjectId,
        default:mongoose.Types.ObjectId()
    },
    tagcontent:{
        type:String,
    },
})
var LrcSchema=mongoose.Schema({
    lrcid:mongoose.Types.ObjectId,
    name:String,
    path:String,
})
var SongSchema=mongoose.Schema({
    songid:{
        type:mongoose.Types.ObjectId
    },
    singer:{
        type:String,
        defalut:'singername',
        trim:true
    },
    filepath:{
        type:String,
        default:'filepath',
        trim:true
    },
    name:{
        type:String,
        defalut:'name',
    },
    label:{
        type:Array,
        defalut:[],
    },
})

var UserSchema=mongoose.Schema({
    nickname:{
        type:String,
        trim:true,
    },
    userit:String,
    icon:String,
    collectlistsong:{
        type:Array,
        set(params){
            if(!params){
                console.log("用户并未添加对应数据")
            }else{
                console.log("已经创建了歌单！")
            }
        }
    },
    useremail:String,
    userpassword:String,
    role:{
        type:String,
        default:'user'
    }
})
var SonglistSchem=mongoose.Schema({
    logo:{
        type:String,
        defalut:'./1.jpg'
    },
    listtitle:{
        type:String,
        defalut:'./1.jpg'
    },
    listsubtitle:{
        type:String,
        defalut:'./1.jpg'
    },
    listauthor:{
        type:String,
        defalut:'./1.jpg'
    },
    listauthorid:mongoose.Types.ObjectId,
    listauthoricon:{
        type:String,
        defalut:'./1.jpg'
    },
    createtime:Date,
    label:{
        type:Array,
        defalut:[111]
    },
    listintroduction:{
        type:String,
        defalut:'请介绍一下你吧'
    },
    listsongid:{
        type:Array,
        defalut:[]
    }
})
var CommitmentSchem=mongoose.Schema({
    parentid:mongoose.Types.ObjectId,
    songlistid:{
        type:mongoose.Types.ObjectId,
        index:true
    },
    parentauthorid:mongoose.Types.ObjectId,
    parentcontent:String,
    parentauthoricon:String,
    parentauthorname:String
})
var ChildCommitmentSchem=mongoose.Schema({
    parentid:{
        type:mongoose.Types.ObjectId,
        index:true
    },
    childauthorid:mongoose.Types.ObjectId,
    childcontent:String,
    childauthoricon:String,
    childauthorname:String

})
// 评论表
// 操作数据库集合（将数据结构映射到已经定义的数据库表当中）
var User=mongoose.model('User',UserSchema,'users')
var Songlist=mongoose.model('Songlist',SonglistSchem,'songlist')
var Commitment=mongoose.model('Commitment',CommitmentSchem,'commentlist')
var ChildCommitment=mongoose.model('ChildCommitment',ChildCommitmentSchem,'childcommentlist')
var Song=mongoose.model('Song',SongSchema,'song')
var Lrc=mongoose.model('Lrc',LrcSchema,'lrc')
// 模拟上传歌曲时候的新建歌曲操作
// step1 获取上传文件内容

// var u3=new Song({
//     songid:mongoose.Types.ObjectId(),
// })
// var u=new Commitment({
//     parentid:mongoose.Types.ObjectId(),
//     songlistid:mongoose.Types.ObjectId("6013d42ce193752b6cba8c58"),
//     parentauthorid:mongoose.Types.ObjectId("600a9ab37f892fee0c13f777"),
//     parentcontent:'wdnmd'
// })
// u.save(function(err,doc){
//     if(err){
//         console,log(err)
//         return
//     }
//     console.log(doc)
// })
// Commitment.aggregate([
//     {
//         $lookup:
//         {
//             from:'childcommentlist',
//             localField:'parentid',
//             foreignField:'parentid',
//             as:'items'
//         }
//         // 定义的表与表之间的关联字段
//     },{
//         // 限制的查询条件
//         $match:{'parentid':mongoose.Types.ObjectId("601a1168ea2bca36b06ac4fc")}
//     }
// ],function(err,doc){
//     if(err){
//         console.log(err)
//         return;
//     }
//     console.log(JSON.stringify(doc))
// })
// for(let i=0;i<4;i++){
//     var u2=new ChildCommitment({
//         parentid:mongoose.Types.ObjectId("601a1168ea2bca36b06ac4fc"),
//         childauthorid:mongoose.Types.ObjectId("600a9ab37f892fee0c13f767"),
//         childcontent:'wdnmd'+i
//     })
//     u2.save(function(err,doc){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(doc)
//         }
//     });
// }
// jsmediatags demo
// var jsmediatags = require("jsmediatags");
// jsmediatags.read("../public/audio/新時あさ美 - SUITE LIFE.mp3", {
//     onSuccess: function(tag) {
//       console.log(tag.tags);
//     },
//     onError: function(error) {
//       console.log(':(', error.type, error.info);
//     }
//   });
module.exports.User=User;
module.exports.Songlist=Songlist;
module.exports.Commitment=Commitment
module.exports.ChildCommitment=ChildCommitment
module.exports.Song=Song;
module.exports.Lrc=Lrc