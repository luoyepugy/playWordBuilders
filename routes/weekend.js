
module.exports=function(router,app){
    var db=app.get('db');
    router.get('/', function(req, res, next) {

    	var async = require('async');
        async.parallel({
            weekend:function(callback){
                db.collection('weekend').find({}).toArray(function(err,ret){
                    db.collection('weekend').find({}).sort({time:-1}).toArray(function(err,ret){
                        if(ret.length==0){
                            ret.push({title:'默认周末剧场标题',content:'默认周末剧场内容',_id:'0'});
                        }
                        callback(err,ret);
                    });
                });
            }
        },function(err,ret){
           // res.json(ret);
           res.render('index/weekend',ret);
        });
	});


    router.get('/:id', function(req, res, next) {
        db.collection('weekend').findOne({_id:req.params.id},function(err,ret){
            res.render('index/list-single', {'article':ret, 'type':'weekend'});
                
        });
    });

	router.put('/:id',function(req,res){
        if(req.params.id == "0"){
            
            db.collection('weekend').insert(req.body,{w:1},function(err,ret){
                if(err==null){
                    res.json({success:true,weekend:ret});
                }else{
                    res.json({errors:err.message});
                }
            });
        }else{
            db.collection('weekend').update({_id:req.params.id},{$set:req.body},function(err,ret){
                if(err==null){
                    res.json({success:true});
                }else{
                    res.json({errors:err.message});
                }
            });
        }

    })
        .delete('/:id',function (req,res) {
            db.collection('weekend').remove({_id:req.params.id},function (err,ret) {
                if(err){
                    res.json({success:false,errors:err.message});
                }else{
                    res.json({success:true});
                }
            });
        });

}