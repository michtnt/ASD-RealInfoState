// PROPERTY MODEL
const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: { type: String },
    coordinate: { type: String },
    description: { type: String },
    address: { type: String },
    size: { type: Number },
    price: { type: Number },
    type: { type: String },
    url: { type: String }
  });

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Property', propertySchema)