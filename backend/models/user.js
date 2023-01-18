const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        minLength: 3
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

const User = mongoose.model('User', userSchema)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash  // delete the password
    }
  })

module.exports = User