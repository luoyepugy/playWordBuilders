
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
        db.collection('daily').findOne({_id:req.params.id},function(err,ret){
            res.render('index/list-single', {'article':ret, 'type':'daily'});
                
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


    // 分页功能
    router.get('/pages/:num', function(req, res) {
        var len = 0;
        var num = Number(req.params.num);

        db.collection('daily').find({}).toArray(function(err,ret){
            len = Math.ceil(ret.length/15);
        });
        db.collection('daily').find({}).limit(15).skip((num-1)*15).sort({time:-1}).toArray(function(err,ret){
            res.render('index/daily',{'daily':ret, 'curPage': num, 'totalPages': len, 'type': 'daily'});
        });
    });


}