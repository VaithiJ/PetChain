var MongoClient = require('mongodb').MongoClient;
const murl = "mongodb+srv://vaithi:vaithi@cluster0.8e3sifk.mongodb.net/PetChain?retryWrites=true&w=majority";

var MongoDbClient;
var db;

module.exports = {
	getDb: async function() {

		await new Promise((resolve, reject) => {
			if(!MongoDbClient)
			{
				MongoClient.connect(murl,{useNewUrlParser:true, useUnifiedTopology:true}, async function(error, client){
					if(error)
					{
						reject(error);
					}
					else{
						MongoDbClient=client;
						db = await client.db("PetChain");
						resolve();
					}
				});
			}
			else if(MongoDbClient.isConnected())
			{
				resolve();
			}
			else
			{
				MongoClient.connect(murl,{useNewUrlParser:true, useUnifiedTopology:true}, function(error, client){
					if(error)
					{
						reject(error);
					}
					else{
						db = client.db("PetChain");
						MongoDbClient=client;
						resolve();
					}
				});
			}
		});
		return db;
	}

};

