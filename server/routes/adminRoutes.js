const User = require('../models/user')
const Log = require('../models/log');
const adminRouter = require('express').Router()

// GET: get all users as an Admin
adminRouter.get('/users', async (req, res) => {
    const users = await User.find({}) // find all user objects
    res.status(200).json(users) // return all users
})

// GET: get specific user as an Admin
adminRouter.get('/users/:id', async (req, res) => {
    const user = await User.find({_id: req.params.id}) // find specific user with id field

    if (user) { // if user found return that
    res.status(200).json(user)
    } else { // else return user feedback 
        res.status(404).json({
            error: 'User not found!'
        })
    }
})

// PUT: edit specific user details as an Admin
adminRouter.put('/users/:id', async (req, res) => {
    // update user who has the matching id with the field that wants to be updated on req.body.user
    User.findByIdAndUpdate( req.params.id, { $set: req.body.user }, { new: true })
    .then( updatedUser => {
        res.status(200).json(updatedUser.toJSON())
    })
    .catch(error => { // return user feedback if operation does not suceed
        console.log(error)
        res.status(500).json({
            error: 'Something Wrong'
        })
    })
})

// DELETE: delete user as an Admin
adminRouter.delete('/users/:id', async (req, res) => {
    try {
        // delete user who has the matching id
        await User.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch(error){ // return user feedback if operation does not suceed
        console.log(error)
        res.status(500).json({
            error: 'Something Wrong'
        })
    }
})

// GET: get all registered user logs as an Admin
adminRouter.route('/logs').get(async (req, res, next) => {
    const logs = await Log.find({}).populate('user').exec() // find all log objects
    res.status(200).json(logs); // return all logs
  });

module.exports = adminRouter