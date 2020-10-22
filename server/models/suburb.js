// SUBURB MODEL
const mongoose = require('mongoose')

const suburbSchema = new mongoose.Schema({
    crimeRate: { type: Number },
    atarAverage: { type: Number },
    averagePropertyCost: { type: Number },
    description: { type: String },
    transportRate: { type: Number },
    satisfactionRate: { type: Number },
    parkingRate: { type: Number },
    name: { type: String }
  });

suburbSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Suburb', suburbSchema)