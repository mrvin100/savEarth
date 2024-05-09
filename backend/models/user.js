const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    } 
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', schema)