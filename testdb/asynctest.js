/**
 * Created by kinov on 2016/3/27.
 */
var DB = require('tingodb')().Db;
var async = require('async');
var db = new DB('public/data',{});

//var data = {"title":"王大中","content":"王大中（1935－），河北昌黎人，中国科学院院士，核反应堆工程与安全专家，1994－2003年担任清华大学校长。","url":"/index/images/t_01.jpg"};

//db.collection('maker').insert(data,function(err,ret){});
//var item ={};
//db.collection('page_data').findOne({page:'teacher'},function(err,ret){
//         var data={"photo":[
//                 {"downloadlink":"/download/FreaksCar.rar","downloadtit":"FreaksCar资料包"}
//         ]}
//         data.photo.forEach(function(e){
//                 console.log(e);
//                 db.collection('maker').update({_id:9},{$set:{"downloadlink":"/download/FreaksTimer.rar","downloadtit":"Bitkey 套件资料包"}}, function (err, ret) {
//                         ret.json({success: true});
//                 })
   //     })
        //db.collection('teacher').update(data,function(err,ret){})

    //if(err)console.log(err);
    //console.log(ret);
//});

// db.collection('videos').findOne({status:0,type:'transcoding'},function(err,ret) {
//
//     console.log(ret);
//     if (ret == null) {
//         console.log('123');
//     }else {
//         console.log('222');
//     }
//
// })
// db.collection('category').update({_id:4},{"tId":3,"child":[],"last_cid":0})
//db.collection('category').update({tId:2},{$set:{child:{"id":1,"name":"视频"}}})
// var data={name:"admin",pw:"admin@123",role:0,mail:"123@qq.com",icon:"/images/awards/award1.jpg",icon_store:null,"status":1}
// db.collection('user').update({name:"admin"},data,function(err){
//     if(err)console.log(err);
// })

// db.collection('visitor').find({day:'2016-5-3',newVisitor:true}).toArray(function(err,ret){
//
//     var list=[];
//     if(ret != null){
//         for(var i=0;i<ret.length;i++){
//             list.push(ret[i].ip);
//         }
//         var set=new Set(list);
//         console.log(set.size);
//     }
//     // var item=[[timeArr[count].day,timeArr[count].hour],counts];
//
//     //console.log(data);
//
// });
var timeArr=[1462526145571,1462439325342,1461920925342,1459933725342]
var  data=[],list=[];
var count = 1;
var collection=db.collection('visitor');
async.whilst(function() {
        return count < timeArr.length
    },
    function(cb){
       
            collection.find({timestamp:{$gt:timeArr[count]*1,$lt:timeArr[0]*1}}).toArray(function(err,ret){

                count++;

                if(ret != null){
                    for(var i=0;i<ret.length;i++){
                        list.push(ret[i].ip);
                    }
                    var set=new Set(list);
                }
                // var item=[[timeArr[count].day,timeArr[count].hour],counts];
                data.push(set.size);
                //console.log(data);
                setTimeout(cb, 10);
            });
        

    },
    function(err) {
        // 3s have passed
        //return data;
        console.log(data)
    });
