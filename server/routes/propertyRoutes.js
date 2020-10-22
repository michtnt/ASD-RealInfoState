const Property = require('../models/property');
const propertyRouter = require('express').Router();

// GET: get all properties
propertyRouter.route('/').get(async (req, res, next) => {
    const properties = await Property.find({}) // find all property objects
    res.status(200).json(properties); // return all properties
  });
  
  module.exports = propertyRouter;
