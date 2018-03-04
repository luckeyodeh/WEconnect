const express = require('express');
const _ = require('lodash');

const router = express.Router();
var businesses = [];

var reviews = [];

var id = 0;

var updateId = function (req, res, next) {
	if (!req.body.id) {
	  id++;
	  req.body.id = id + '';
	}
	next();
 };

 router.param('id', function (req, res, next, id) {
	var business = _.find(businesses, {id: id})
 
	if (business) {
	  req.business = business;
	  next();
	} else {
	  res.send();
	}
 });
 
 router.get('/', function (req, res){
	res.json(businesses);
 });
 
 router.get('/:id', function (req, res){
	var business = req.business;
	res.json(business || {});
 });
 
 router.post('/', updateId, function (req, res) {
	var business = req.body;
 
	businesses.push(business);
 
	res.json(business);
 });
 
 router.delete('/:id', function (req, res) {
	var business = _.findIndex(businesses, {id: req.params.id});
	businesses.splice(business, 1);
 
	res.json(req.business);
 });
 
 router.put('/:id', function (req, res) {
	var update = req.body;
	if (update.id) {
	  delete update.id
	}
 
	var business = _.findIndex(businesses, {id: req.params.id});
	if (!businesses[business]) {
	  res.send();
	} else {
	  var updatedBusiness = _.assign(businesses[business], update);
	  res.json(updatedBusiness);
	}
 });

 router.get('/reviews', function (req, res){
	res.json(reviews);
 });

 router.post('/reviews', updateId, function (req, res) {
	var review = req.body;
 
	reviews.push(review);
 
	res.json(review);
 });
 
 

module.exports = router;