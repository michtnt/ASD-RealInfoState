const jwt = require('jsonwebtoken') // token
const bcrypt = require('bcrypt') // encryption
const config = require('../utils/config') // jwt token encoded HS256

const User = require('../models/user')
const Admin = require('../models/admin')
const Log = require('../models/log')
const authRouter = require('express').Router()

// POST: login as an Admin or User
authRouter.post('/login', async (req,res) => {
    const body = req.body

    // User login
    if (body.type == 'user') {
    const user = await User.findOne({ username: body.username}) // find user with the corresponding username
    const passwordCorrect = user === null ? false 
    : await bcrypt.compare(body.password, user.password); // check if password is correct

    if(!(user && passwordCorrect)){ // if user not found and password is incorrect return user feedback
        if(user) { 
            try { 
              await Log.create({ user: user , date: new Date(), status: 0}) // if user account exist put in unsuccessful logs
              await User.findByIdAndUpdate(user._id, { $set: { loginAttempts: user.loginAttempts+1 } }) // increment unsuccesful login attempts
            } catch(error) {
                return res.status(500).json({
                    message: 'Something wrong'
                });
            }
            if(user.loginAttempts > 5){ // if login attempts > 5
                return res.status(200).json({ loginAttempts: user.loginAttempts})
            }
        } 
        return res.status(401).json({
            message: 'invalid username and password'
        });
    }

    // put it in success logs
    const log = await Log.create({ user: user, date: new Date(), status: 1})

    // set to 0 if the user login is successful
    try {
        await User.findByIdAndUpdate(user._id, { $set: { loginAttempts: 0 } }) // increment unsuccesful login attempts
    } catch(error){
        return res.status(500).json({
            message: 'Something wrong'
        });
    }

    // if success
    if(log){

    // token for website
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // use jwt to sign the token with the HS256 encoded token
    const token = jwt.sign(userForToken, config.TOKEN)
    res.status(200).send({
        token, 
        username: user.username, 
        id: user._id,
        user: user
    })
} else{
    res.status(500).send({
        message: 'Something wrong'
    })
}
    // Admin login 
} else if(body.type == 'admin') {
    const body = req.body

    const admin = await Admin.findOne({ username: body.username}) // find admin with the corresponding username
    const passwordCorrect = admin === null ? false 
    : await bcrypt.compare(body.password, admin.password); // check if password is correct

    if(!(admin && passwordCorrect)){ // if admin not found and password is incorrect return user feedback
        return res.status(401).json({
            error: 'invalid username and password'
        });
    }

    // token for website
    const adminForToken = {
        username: admin.username,
        id: admin._id
    }

    // use jwt to sign the token with the HS256 encoded token
    const token = jwt.sign(adminForToken, config.TOKEN)
    res.status(200).send({
        token, 
        username: admin.username, 
        id: admin._id,
        user: admin
    })
} else {
    // if user type is not included
    res.status(401).send({ message: "Something wrong"})
}
})

module.exports = authRouter
