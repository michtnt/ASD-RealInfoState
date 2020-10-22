const Suburb = require('../models/suburb');
const suburbRouter = require('express').Router();

// GET: get all suburbs
suburbRouter.route('/').get(async (req, res, next) => {
    const suburbs = await Suburb.find({}) // find all suburb objects
    res.status(200).json(suburbs); // return all suburbs
  });

  module.exports = suburbRouter;
