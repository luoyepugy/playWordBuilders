
module.exports=function(router,app){
    var db=app.get('db');
    router.get('/', function(req, res, next) {

    	var async = require('async');
        async.parallel({
            entertainment:function(callback){
                db.collection('entertainment').find({}).toArray(function(err,ret){
                    db.collection('entertainment').find({}).sort({time:-1}).toArray(function(err,ret){
                        if(ret.length==0){
                            ret.push({title:'默认雕刻时光标题',content:'默认雕刻时光内容',_id:'0'});
                        }
                        callback(err,ret);
                    });
                });
            }
        },function(err,ret){
           // res.json(ret);
           res.render('index/entertainment',ret);
        });
	});


    router.get('/:id', function(req, res, next) {
        db.collection('entertainment').findOne({_id:req.params.id},function(err,ret){
            res.render('index/list-single', {'article':ret, 'type':'entertainment'});
                
        });
    });


	router.put('/:id',function(req,res){
        if(req.params.id == "0"){
            
            db.collection('entertainment').insert(req.body,{w:1},function(err,ret){
                if(err==null){
                    res.json({success:true,entertainment:ret});
                }else{
                    res.json({errors:err.message});
                }
            });
        }else{
            db.collection('entertainment').update({_id:req.params.id},{$set:req.body},function(err,ret){
                if(err==null){
                    res.json({success:true});
                }else{
                    res.json({errors:err.message});
                }
            });
        }

    })
        .delete('/:id',function (req,res) {
            db.collection('entertainment').remove({_id:req.params.id},function (err,ret) {
                if(err){
                    res.json({success:false,errors:err.message});
                }else{
                    res.json({success:true});
                }
            });
        });

}


    
