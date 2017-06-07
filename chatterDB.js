var colors = require('colors');
var logger = require('tracer').colorConsole({
                    format : "{{timestamp.green}} <{{title.yellow}}> {{message.cyan}} (in {{file.red}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                })
var url = 'mongodb://192.168.0.87:27017/chatter';
var MongoClient = require('mongodb').MongoClient
var util = require('./util')
var Util = require('util')

function connectMongo(callback){
	MongoClient.connect(url, function(err, db) {

	 	if(util.handleError(err)){

	     	logger.log("We are connected to ".rainbow + db.databaseName)
	     	callback(db)
	     	// db.close();

		}
	 })

}

function connectionToMongoCollection(collectionName, callback){
	connectMongo(function(db){
		var col = db.collection(collectionName)
		callback(db, col)
	})
}

// findInMongo({}, 'chats', function(items){
// 	console.log(items)
// })

 function findInMongo(objToFind, collection, callback){
	connectionToMongoCollection(collection, function(db, col){
		col.find(objToFind).toArray(function(err, items){
			if(util.handleError(err)){
				logger.log('found items# '.rainbow+items.length)
				logger.log('object to find is  '.rainbow+Util.inspect(objToFind))
				callback(items)
				db.close()
			}

		})

	})
}



// insertOne({me:'you'}, 'chats',{}, function(item){
//  console.log(item.ops)
// })

function insertOne(data, collection, options, callback){
	if((typeof options==='Object')&&(!Array.isArray(options))){
		var options = options
	}else{
		options={}
	}
	connectionToMongoCollection(collection, function(db, col){
		col.insertOne(data, function(err, item){
			if(util.handleError(err)){
				logger.log('Data inserted'.rainbow)
				logger.log(item.result)
				callback(item)
				db.close()
			}
		})
		// db.close()
	})
}



function test(){
	console.log('test')
}

module.exports = 
	 {
	 	test:test,
	 	insertOne:insertOne,
	 	find:findInMongo,

// 		test: function(){
// 	console.log('test')
// }
	}

