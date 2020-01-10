const mongoose = require('mongoose')

  const measureSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 3
    },
    graph: [
      {
        datee: Date,
        point: String
      }
    ]
  })

  measureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Measure', measureSchema)