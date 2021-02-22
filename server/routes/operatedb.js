const mongoose = require("mongoose")
// const async=require('async_hooks')
module.exports = ({
    async checkuser(jwt, model, email, userpwd) {
        const User = model
        var token
        var userdata = "usererr"
        var decodekey = 'secret'
        await User.findOne({ "useremail": email, "userpassword": userpwd }, function (err, doc) {
            console.log(doc)
            if (err) {
                console.log("err")
                return;
            }
            if (doc != null) {
                token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 999999,
                    data: doc
                }, decodekey)
                userdata = {
                    data: doc,
                    token: token,
                    exp: Math.floor(Date.now() / 1000) + 999999
                }
            } else {
                token = 0
            }

        })
        //   console.log('pending:???',await this.decoded(jwt,token))
        return userdata;
    },
    async getsonglist(model, page) {
        // var Songlistmodel = model;
        var result;
        await model.find(function (err, doc) {
            if (err) {
                result = "error"
            } else {
                result = doc
                console.log(doc.length)
            }
        })
        // limit优化带宽查找

        return result
    },
    async gethotlist(model, id) {
        // var Songlistmodel = model;
        var result;
        await model.findOne({ _id: id }, function (err, doc) {
            if (err) {
                result = "error"
            } else {
                result = doc
                console.log(doc)
            }
        })
        // limit优化带宽查找

        return result
    },
    async delsonglist(model, index) {
        var result;
        // Character.deleteOne({ name: 'Eddard Stark' }, function (err) {});
        await model.deleteOne({ "_id": index }, function (err, doc) {
            if (err) {
                console.log(err)
                result = "error"
            } else {
                console.log(doc)
                result = "ok"
            }
        })
        return result
    },
    async updatesonglist(model, index, data) {
        console.log("uptedated:", data.listauthorid = mongoose.Types.ObjectId(data.listauthorid))
        // User.updateOne({ _id: _id }, { $set: { email: 'AVENUE@Q.COM' } }); // update to 'avenue@q.com'
        var result;
        await model.updateOne({ "_id": index }, { $set: data }, function (err, doc) {
            if (err) {
                console.log(err)
                result = "error"
            } else {
                result = "ok"
            }
        })
        return result
    },
    async createsonglist(model, data) {
        var reslut = "error"
        try {
            const save = await new model(data).save();
            // 保存成功执行的操作
            reslut = "ok"
            return reslut
        } catch (err) {
            // 保存失败执行的操作
            console.log(err)
            return reslut
        }
    },
    // admin

    // user
    async checkregisted(model, email) {
        var result
        await model.findOne({ useremail: email }, function (err, doc) {
            if (err) {
                console.log(err)
                result = false
            } else {
                console.log(doc)
                if (doc == null) {
                    console.log("usercorrect")
                    result = true
                } else {

                    result = false
                }
            }
        })
        return result
    },
    async getusersonglist(model, index) {
        var result = {
            info: 'error'
        }
        await model.aggregate([
            {
                $lookup:
                {
                    from: 'songlist',
                    localField: '_id',
                    foreignField: 'listauthorid',
                    as: 'items'
                }
            }, {
                $match: { '_id': mongoose.Types.ObjectId(index) }
            }
        ], function (err, doc) {
            if (err) {
                console.log(err)
                return;
            }
            console.log(doc)
            result = {
                info: 'getdatasuccessfully',
                data: doc
            }
        })
        return result
    },
    async getlistcommiment(model, id) {
        var result = {
            info: "error",
            commentlist: []
        }

        await model.find({ songlistid: id }, async function (err, doc) {
            if (err) {
                console.log(err)
                return;
            }
            // console.log(doc)

            // console.log("getresult:", JSON.parse(JSON.stringify(result)))
        }).then(val => {
            // console.log("getval", val.length)
            var promises = val.map((id) => {
                // console.log("getid", id.parentid)
                return model.aggregate([
                    {
                        $lookup:
                        {
                            from: 'childcommentlist',
                            localField: 'parentid',
                            foreignField: 'parentid',
                            as: 'items'
                        }
                        // 定义的表与表之间的关联字段
                    }, {
                        // 限制的查询条件
                        $match: { 'parentid': mongoose.Types.ObjectId(id.parentid) }
                    }
                ], function (err, doc) {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    result.commentlist.push(doc[0])
                })
            })
            // console.log("Promiseall:  ")
            return Promise.all(promises)
        })

        return result

    },
    async modelfindone(model, fileds, id) {
        var filed = fileds
        var query = {}
        var result = [];
        var p = new Promise(async function (resolve, reject) {

            for (let i = 0; i < id.length; i++) {
                query[fileds] = id[i]
                await model.findOne(query, function (err, doc) {
                    if (err) {
                        console.log(err)
                        return
                    }
                    result.push(doc)
                    // console.log('reslut++++', doc,)
                })
            }
            resolve(result)
            // console.log(reslut)
        })
       return  p;
        // await id.forEach(async element => {
        //     query[fileds]=element
        //     await  model.findOne(query, function(err,doc){
        //         if(err){
        //             console.log(err)
        //             return
        //         }

        //         console.log('reslut++++',doc,'id',element,query)
        // }).then((val)=>{
        //     console.log('下次循环',val)
        //     result.push(val)
        // })
        // });
    }



})

// for (let i = 0; i < doc.length; i++) {
    // model.aggregate([
    //     {
    //         $lookup:
    //         {
    //             from: 'childcommentlist',
    //             localField: 'parentid',
    //             foreignField: 'parentid',
    //             as: 'items'
    //         }
    //         // 定义的表与表之间的关联字段
    //     }, {
    //         // 限制的查询条件
    //         $match: { 'parentid': mongoose.Types.ObjectId(doc[i].parentid) }
    //     }
    // ], function (err, doc) {
    //     if (err) {
    //         console.log(err)
    //         return;
    //     }
    //     console.log(i,"get",doc)
    //     result.commentlist.push(doc[0])
    // })
// }