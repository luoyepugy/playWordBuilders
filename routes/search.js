
module.exports=function(router,app){
    var db=app.get('db');

    var datas = {};

    router.get('/', function(req, res, next) {
        res.render('index/search', {'datas': datas});
    });

    router.post('/', function(req, res, next) {
        var async = require('async');
        async.parallel({
            funny:function(callback){
                db.collection('funny').find({'title': {$regex:req.body.q, $options:'i'}}).sort({time:-1}).toArray(function(err,ret){
                    datas.funny = ret;
                    callback(err,ret);
                });
            },
            daily:function(callback){
                db.collection('daily').find({'title': {$regex:req.body.q, $options:'i'}}).sort({time:-1}).toArray(function(err,ret){
                    datas.daily = ret;
                    callback(err,ret);
                });
            },
            world:function(callback){
                db.collection('world').find({'title': {$regex:req.body.q, $options:'i'}}).sort({time:-1}).toArray(function(err,ret){
                    datas.world = ret;
                    callback(err,ret);
                });
            },
            entertainment:function(callback){
                db.collection('entertainment').find({'title': {$regex:req.body.q, $options:'i'}}).sort({time:-1}).toArray(function(err,ret){
                    datas.entertainment = ret;
                    callback(err,ret);
                });
            }
        },function(err,ret){
           if(err==null){
                res.json({success:true, 'data': ret});
            }else{
                res.json({success:false, message:err.message});
            }
        });
        
	});

}