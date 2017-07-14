'use strict';
 const http= require('http');
 const url= require('url');
 const fs= require('fs');
 
 let store = {
	members: {},
	set: function(item){
		this.members[item.id] = item; 
	},
	get: function(itemID){
		return this.members[itemID];
	},
	remove: function(itemID){
		delete this.members[itemID];
	},
};

 const httpserver= http.createServer(function (req,response){
	const parsedUrl = url.parse(req.url);
	const method = req.method;
	const uri = req.url.slice(1);

	if(uri === 'users') {
		if(method === 'POST') {
			let body = '';
			req.on('data', function (data) {
				body += data;
			});
			req.on('end', function () {
				const data = JSON.parse(body);
				data.id=Math.floor(Math.random()*100) + '';
				console.log(data.id)
				store.set(data);
				console.log("it is here");
				console.log(body);
				console.log(store.members);
				response.end(JSON.stringify(data));
			});
			return;
		}	
		if(method === 'PUT'){
			let body = '';
			req.on('data', function (data) {
				body += data;
			});
			req.on('end', function () {
				const data = JSON.parse(body);
				if(store.get(data.id)){
					store.set(data);
					console.log("UPDATE _ DONE");
					console.log(body);
				}
				console.log(store.members);
				response.end();
			});
			return;
		}
		if(method === 'GET'){
			response.end(JSON.stringify(store.members));
			return;
		}
	}
	if(parsedUrl.pathname.indexOf('/users') === 0 && parsedUrl.pathname.length > 7){
		if(method === 'GET') {
				const itemid = parsedUrl.pathname.slice(7);
				console.log(itemid);
				const found = store.get(itemid);
				console.log(found);
				response.end(JSON.stringify(found));
				return;	
		};
		if(method === 'DELETE') {
			const itemid = parsedUrl.pathname.slice(7);
			console.log(itemid);
			store.remove(itemid);
			console.log(store.members);
			response.end();
			return;
		}
	}
	fs.readFile(uri, function(err,data){
		if(err){
			response.statusCode = 404;
			response.end("Something is Wrong")
		}  
		response.statusCode = 200;
		response.end(data);
	});
});
 httpserver.listen(3000);
 console.log("Server is listening");
 
 
 
 
 
 
 
 
 
 