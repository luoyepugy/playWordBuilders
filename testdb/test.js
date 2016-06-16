/**
 * Created by paki on 2016/3/11.
 */
var Engine = require('tingodb')(),
    assert = require('assert');

var db = new Engine.Db('./', {});
//var collection = db.collection("batch_document_insert_collection_safe");
////collection.insert([{hello:'world_safe1',name:'paki'}
////    , {kkk:'array(0=>2,1=>3)'}], {w:1}, function(err, result) {
////    assert.equal(null, err);
////    collection.findOne({hello:'world_safe2'}, function(err, item) {
////        assert.equal(null, err);
////        assert.equal('world_safe2', item.hello);
////    })
////});
// collection.update({name:'paki'},{hello:'kitty'},function(err, item) {
//        assert.equal(null, err);
//
//    });
