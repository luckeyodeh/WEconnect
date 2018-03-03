//import { Z_DEFAULT_COMPRESSION } from 'zlib';

var express = require('express');
var router = express.Router();

	
global.businesses = [
	{
		id: 1,
		name: 'ABC Ltd',
		location: 'Lagos'
	},
	{
		id: 2,
		name: '123 Ltd',
		location: 'Abuja'
	},
	{
		id: 3,
		name: 'XYZ Ltd',
		location: 'Lagos'
	}
];

global.reviews = [
	{
		name: 'James',
		post: 'thumbs up'
	},
	{
		name: 'Collins',
		post: 'thumbs down'
	}
];

router.get('/', function(req, res){
	return res.json({
		business: global.businesses,
		error: false
	});
});

router.post('/', function(req, res){
	if (!req.body.name){
		return res.json({
			message: 'business name missing',
			error: true
		});
	}
	global.businesses.push(req.body);
	return res.json({
		message: 'success',
		error: false
	});
});

router.put('/:businessid', function(req, res){
	for(let i=0; i<global.businesses.length; i++){
		if(global.businesses[i].id === parseInt(req.params.businessid, 10)){
			global.businesses[i].name = req.body.name;
			global.businesses[i].hobby = req.body.hobby;
			return res.json({
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'business not found',
		error: true
	});
});

router.delete('/:businessid', function(req, res){
	for(let i=0; i<global.businesses.length; i++){
		if(global.businesses[i].id === parseInt(req.params.businessid, 10)){
			global.businesses.splice(i,1);
			return res.json({
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'business not found',
		error: true
	})
});

router.get('/:businessid', function(req, res){
	for(let i = 0; i < global.businesses.length; i++){
		if(global.businesses[i].id === parseInt(req.params.businessid, 10)){
			return res.json({
				businesses: global.businesses[i],
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'business not found',
		error: true
	})
});

router.get('/reviews', function(req, res){
	return res.json({
		reviews: global.reviews,
		error: false
	});
});

router.post('/reviews', function(req, res){
	if (!req.body.name){
		return res.json({
			message: 'review not posted',
			error: true
		});
	}
	global.reviews.push(req.body);
	return res.json({
		message: 'success',
		error: false
	});
});

router.get('/', function(req, res){
	var location = req.query.location;
});

/*router.get('/', function(req, res) {
	res.json({'users':'ALL'}); 
});

router.get('/:id', function(req, res) {
	res.json({'user_id':req.params.id}); 
});*/

module.exports = router;