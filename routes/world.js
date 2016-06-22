
module.exports=function(router,app){
    var db=app.get('db');
    router.get('/', function(req, res, next) {

    	var async = require('async');
        async.parallel({
            world:function(callback){
                db.collection('world').find({}).toArray(function(err,ret){
                    db.collection('world').find({}).sort({time:-1}).toArray(function(err,ret){
                        if(ret.length==0){
                            ret.push({title:'默认世间词话标题',content:'默认世间词话内容',_id:'0'});
                        }
                        callback(err,ret);
                    });
                });
            }
        },function(err,ret){
           res.render('index/world',ret);
        });
	});


    router.get('/:id', function(req, res, next) {
        db.collection('world').findOne({_id:req.params.id},function(err,ret){
            res.render('index/list-single', {'article':ret, 'type':'world'});
                
        });
    });


	router.put('/:id',function(req,res){
        if(req.params.id == "0"){
            
            db.collection('world').insert(req.body,{w:1},function(err,ret){
                if(err==null){
                    res.json({success:true,world:ret});
                }else{
                    res.json({errors:err.message});
                }
            });
        }else{
            db.collection('world').update({_id:req.params.id},{$set:req.body},function(err,ret){
                if(err==null){
                    res.json({success:true});
                }else{
                    res.json({errors:err.message});
                }
            });
        }

    })
        .delete('/:id',function (req,res) {
            db.collection('world').remove({_id:req.params.id},function (err,ret) {
                if(err){
                    res.json({success:false,errors:err.message});
                }else{
                    res.json({success:true});
                }
            });
        });

}