/**
 * Created by kinov on 2016/3/28.
 */
module.exports=function(router,app){
    var db = app.get('db');
    router.get('/category/:type',function(req,res){
        db.collection('category').findOne({tId:req.params.type*1},function(err,ret){
           res.json({categorys:ret.child||[]});
        });
    });

    router.put('/category/:type',function(req,res){
        /*
        db.collection('category').update({id:req.body.id},{$set:req.body},function(req,ret){
            res.json({success:true});
        });*/
        db.collection('category').findOne({tId:req.params.type},function(err,ret){
            for(var i=0;i<ret.child.length;i++){
                if(ret.child[i].id==req.body.id) {
                    for(var s in req.body){
                        ret.child[i][s]= req.body[s];
                    }
                }
            }
            db.collection('category').update({tId:req.params.type},{$set:ret},function(err,result){
                res.json({success:true});
            });
        })
    });

    router.get('/:type/:category',function(req,res){
       var compareId =  req.query.compareId||0;
        var type = req.params.type;
        console.log('compare id:'+compareId);
        var findParams = {category:req.params.category,_id:{$gt:compareId}};
        if(type=='videos') findParams['status']=1;
        db.collection(type).find(findParams).sort({_id:1}).limit(compareId>0?10:20).toArray(function(err,ret){
            if(ret)     res.json({images:ret});
            else res.json({images:[]});
            console.log(err);
        });
    });
    
    
    
    router.delete('/images/:id',function(req,res){
       db.collection('images').remove({_id:req.params.id},function(req,ret){
           res.json({sucecss:true});
       })
    });
};