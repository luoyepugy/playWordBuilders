
module.exports=function(router,app){
    var db=app.get('db');

    router.get('/', function(req, res, next) {
    	var async = require('async');
        async.parallel({
            funny:function(callback){
                db.collection('funny').find({}).toArray(function(err,ret){
                    db.collection('funny').find({}).sort({time:-1}).toArray(function(err,ret){
                        if(ret.length==0){
                            ret.push({title:'默认囧途标题',content:'默认囧途内容',_id:'0'});
                        }
                        callback(err,ret);
                    });
                });
            }
        },function(err,ret){
           // res.json(ret);
           res.render('index/funny',ret);
        });
	});


    router.get('/:id', function(req, res, next) {
        db.collection('funny').findOne({_id:req.params.id},function(err,ret){
            res.render('index/list-single', {'article':ret, 'type':'funny'});
                
        });
    });

	router.put('/:id',function(req,res){
        if(req.params.id == "0"){
            
            db.collection('funny').insert(req.body,{w:1},function(err,ret){
                if(err==null){
                    res.json({success:true,funny:ret});
                }else{
                    res.json({errors:err.message});
                }
            });
        }else{
            db.collection('funny').update({_id:req.params.id},{$set:req.body},function(err,ret){
                if(err==null){
                    res.json({success:true});
                }else{
                    res.json({errors:err.message});
                }
            });
        }

    })
        .delete('/:id',function (req,res) {
            db.collection('funny').remove({_id:req.params.id},function (err,ret) {
                if(err){
                    res.json({success:false,errors:err.message});
                }else{
                    res.json({success:true});
                }
            });
        });


    // 分页功能测试
    router.get('/pages/:num', function(req, res) {
        var len = 0;
        var num = Number(req.params.num);

        db.collection('funny').find({}).toArray(function(err,ret){
            len = Math.ceil(ret.length/2);
        });
        db.collection('funny').find({}).limit(2).skip((num-1)*2).sort({time:-1}).toArray(function(err,ret){
            res.render('index/funny',{'funny':ret, 'cur': num, 'totalNum': len, 'type': 'funny'});
        });
    });

}