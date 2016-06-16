
module.exports=function(router,app){
    var db=app.get('db');
    router.get('/', function(req, res, next) {

    	var async = require('async');
        async.parallel({
            daily:function(callback){
                db.collection('daily').find({}).toArray(function(err,ret){
                    db.collection('daily').find({}).sort({time:-1}).toArray(function(err,ret){
                        if(ret.length==0){
                            ret.push({title:'默认朝九晚五标题',content:'默认朝九晚五内容',_id:'0'});
                        }
                        callback(err,ret);
                    });
                });
            }
        },function(err,ret){
           // res.json(ret);
           res.render('index/daily',ret);
        });
	});

    router.get('/:id', function(req, res, next) {
        var async = require('async');
        async.parallel({
            article:function(callback){
                db.collection('daily').findOne({_id:req.params.id},function(err,ret){
                    // if(!ret.hasOwnProperty('imageUrl')){
                    //     ret.push({imgUrl:'/index/images/default.jpg',content:'默认文章内容'});
                    // }
                    // if(!ret.hasOwnProperty('imgUrl')){
                    //     ret.imgUrl='/index/images/default.jpg';
                    //     ret.content='默认文章内容';
                    // }

                    callback(err,ret);
                });
            },
            activities:function(callback){
                var date = new Date();
                var year = date.getFullYear();
                var month=String(date.getMonth()+1).length<2?'0'+(date.getMonth()+1):date.getMonth()+1;       //获取当前月份(0-11,0代表1月)
                // alert(month);
                var day=String(date.getDate()).length<2?'0'+(date.getDate()):date.getDate();
                var hours = String(date.getHours()).length<2?'0'+(date.getHours()):date.getHours();
                var minutes = String(date.getMinutes()).length<2?'0'+(date.getMinutes()):date.getMinutes();
                var time=year+'-'+month+'-'+day+' '+hours+':'+minutes;
                db.collection('activity').find({event_time:{$gt:time}},{limit:4}).sort({event_time:1}).toArray(function(err,ret){
                    callback(err,ret);
                });

            }
        },function(err,ret){
            ret.title =  '图文详情';
            // res.json(ret);
            res.render('index/funny-single', ret);

        });


    });

	router.put('/:id',function(req,res){
        if(req.params.id == "0"){
            
            db.collection('daily').insert(req.body,{w:1},function(err,ret){
                if(err==null){
                    res.json({success:true,daily:ret});
                }else{
                    res.json({errors:err.message});
                }
            });
        }else{
            db.collection('daily').update({_id:req.params.id},{$set:req.body},function(err,ret){
                if(err==null){
                    res.json({success:true});
                }else{
                    res.json({errors:err.message});
                }
            });
        }

    })
        .delete('/:id',function (req,res) {
            db.collection('daily').remove({_id:req.params.id},function (err,ret) {
                if(err){
                    res.json({success:false,errors:err.message});
                }else{
                    res.json({success:true});
                }
            });
        });

}