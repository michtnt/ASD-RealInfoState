// LOG MODEL
const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
   date: Date,
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   status: Number // 1 = success, 0 = unsuccessful
  });

logSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Log', logSchema)