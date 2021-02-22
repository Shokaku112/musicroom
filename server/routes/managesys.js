var express = require('express');
var mongodb=require('./mongodb')
var app=express();
const operator=require('./operatedb')
var router = express.Router();
var Songlist=mongodb.Songlist;
/* GET users listing. */
router.get('/songlist',async function(req, res, next) {

 var result=await operator.getsonglist(Songlist)

//  console.log(Array.prototype.slice.call(result))
 res.send(result)

});
//  $set: { email: 'AVENUE@Q.COM' } update格式
// update
router.get('/updatelist',async function(req, res, next) {
    var data=JSON.parse(req.query.data);
    var index=data._id
    console.log(data,index)
    var result=await operator.updatesonglist(Songlist,index,data);
    res.send(result)
   
   });
// del
router.get('/dellist',async function(req, res, next) {
   var index=req.query.index;
   var result=await operator.delsonglist(Songlist,index);
   console.log("index",index)
   res.send(result)
   });
// create
router.get('/createlist',async function(req, res, next) {
    var data=JSON.parse(req.query.data)
    console.log("received:",data)
    var result=await operator.createsonglist(Songlist,data);
    console.log("status?????",result)
    res.send(result)
   });
module.exports = router;
